import React from 'react';
import Board from '../components/Board';

class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        AIon: false,
      };
    }  

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);      
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      let nextPlayer = this.state.xIsNext;
      let newhistory;
      let newstepNum;

      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';

      if (this.state.AIon) {  // AI On    
        let AImove = applyAI(squares, true);
        if (AImove.length < 1) { // No more move available for AI
          newhistory = history.concat([{squares: squares}]);          
          newstepNum = history.length;
        }
        else {                   // 1 or more move available for AI
          newhistory = history.concat([{squares: squares}], [{squares: AImove}]);
          newstepNum = history.length + 1;
        }          
      }
      else {                  // AI Off
        newhistory = history.concat([{squares: squares}]);          
        newstepNum = history.length;
        nextPlayer = !this.state.xIsNext;
      }

      this.setState({        
        history: newhistory,        
        stepNumber: newstepNum,       
        xIsNext: nextPlayer,}
      );       
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    turnAIswitch() {
      this.setState({
        AIon: !this.state.AIon
      });      
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];    
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
    const switchAI = <button onClick={() => this.turnAIswitch()}>AI {this.state.AIon ? 'On': 'Off'}</button>;

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{switchAI} {status}</div>
            <ol>{moves}</ol>            
          </div>
        </div>
      );
    }
  }

  // Return an array of available moves within the tic-tac-toe board of which
  // each squared is represented in integer as below:
  //  0 1 2
  //  3 4 5
  //  6 7 8
  function getavailableMove(squares) {
    let availableMove = [];

    for (let i=0; i<squares.length; i++) {
      if (squares[i] === null) {
        availableMove.push(i);
      }
    }

    return availableMove;
  }

  // Return the next move as an array to contains the entire board current state
  function applyAI (squares, isPlayerX) {
    let AImove = [];
    let AImoveIndex = null;

    // get move from AI as i
    AImoveIndex = (Math.random() < 0.2) ? produceRandomMove(squares) : produceBestMove(squares, isPlayerX);
    if (AImoveIndex != null) {
      AImove = squares.slice();

      AImove[AImoveIndex] = 'O';
    }              

    return AImove;
  }

  // Generate best move based on remaining available move on the board
  function produceBestMove(squares, isPlayerX) {    
    let bestscore = -Infinity;
    let move = null;

    squares.forEach((square, i) => {
      if (square === null) {        
        // Make a copy of the board states and reset for each first move
        const sim_squares = squares.slice();    
        // AI makes a move in the next available square        
        sim_squares[i] = (isPlayerX) ? "O" : "X"; 
        let score = Math.max(bestscore, minmax(sim_squares, false, isPlayerX));
        
        if(score > bestscore) {
          bestscore = score;
          move = i;
        }        
      }
    });

    return move;
  }

  // Generate the best score of the current board states for the maximizer (AI)
  function minmax(squares, isNextMax, isPlayerX) {

    // Check the result of the game
    const score = returnResult(squares, isPlayerX);

    // Either player wins, return the score (player = -1, AI = +1, draw = 0)
    if (score !== null) {      
        return score;
    }

    // Simulate the game by looping through (recursivly calling) all possible moves by both players
    // AI is the maximizer and Player is the minimizer
    if (isNextMax) {       // Maximizer's (AI) move
        let best = -Infinity;        

        squares.forEach((square, i) => {
            if (square === null) {
                // Make a copy of the board states and reset for each first move
                const sim_squares = squares.slice();

                // Make a move in the next available square
                sim_squares[i] = (isPlayerX) ? "O" : "X";          
    
                // call yourself to loop the next depth      
                best = Math.max(best, minmax(sim_squares, !isNextMax, isPlayerX));            
            }
        });

        return best;
    }
    else {
        let best = Infinity;

        squares.forEach((square, i) => {
            if (square === null) {
                // Make a copy of the board states and reset for each first move
                const sim_squares = squares.slice();

                // Make a move in the next available square
                sim_squares[i] = (isPlayerX) ? "X" : "O";          
    
                // call yourself to loop the next depth      
                best = Math.min(best, minmax(sim_squares, !isNextMax, isPlayerX));            
            }
        });        

        return best;        
    }
  }

  // Map symbol represented each player to assinged score
  function returnResult(squares, isPlayerX) {

    // AI: win = +1, draw = 0, loss = -1
    const scores = isPlayerX ? { X: -1, O: +1, Draw: 0} : { X: 1, O: -1, Draw: 0}
    const score = calculateWinner(squares);
    return score === null ? null : scores[score];
  }

  // Generate random move based on remaining available move on the board
  function produceRandomMove (squares) {      
    const availableMove = getavailableMove(squares);
    const prob = Math.random();
    let move = null;

    // Assign a random move as an integer of which each number has equal probability to be picked
    for (let i=0; i<availableMove.length; i++) {
      if ((prob >= i/availableMove.length) && (prob < (i+1)/availableMove.length)) {
        move = availableMove[i];
      }
    }
    
    return move;
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return !squares.includes(null) ? "Draw" : null;
  }
    
  export default Game;
  export {getavailableMove, applyAI, produceRandomMove, calculateWinner, minmax, returnResult, produceBestMove};