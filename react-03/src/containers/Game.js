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

      if (this.state.AIon) {    
        let AImove = applyAI(squares);
        if (AImove.length < 1) {
          newhistory = history.concat([{squares: squares}]);          
          newstepNum = history.length;
        }
        else {
          newhistory = history.concat([{squares: squares}], [{squares: AImove}]);
          newstepNum = history.length + 1;
        }          
      }
      else {       
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
  function applyAI (squares) {
    let AImove = [];

    // get move from AI as i                
    if (getMove(squares) != null) {
      AImove = squares.slice();

      AImove[getMove(squares)] = 'O';
    }              

    return AImove;
  }

  // Return the next move as an integer which represents a single square in the board
  // => Need to change algorithm for best move
  function getMove (squares) {      
    const availableMove = getavailableMove(squares);
    const prob = Math.random();
    let move = null;

    // Assign a random move as integer
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
    return null;
  }
    
  export default Game;