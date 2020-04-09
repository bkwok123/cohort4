import { getavailableMove, calculateWinner } from './Game';

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

  function returnResult(squares, isPlayerX) {

    // AI: win = +1, draw = 0, loss = -1
    const scores = isPlayerX ? { X: -1, O: +1, Draw: 0} : { X: 1, O: -1, Draw: 0}
    const score = calculateWinner(squares);
    return score === null ? null : scores[score];
  }

  export {minmax, returnResult};