import { getavailableMove, calculateWinner } from './Game';

// Generate best move based on remaining available move on the board
  function minmax(squares, depth, isPlayerX, isNextMax) {
    const availableMove = getavailableMove(squares);
    const numMove = availableMove.length;    

    // Check the result of the game
    const score = returnResult(squares, isPlayerX);

    // Either player wins, return the score (player = -1, AI = +1)
    if (Math.abs(score) === 1) {
        return score;
    }

    // Exit when there is no more move, return a draw score
    if (numMove < 1) {
        return 0;
    }

    // Simulate the game by looping through (recursivly calling) all possible moves by both players
    // AI is the maximizer and Player is the minimizer
    if (isNextMax) {       // Maximizer's (AI) move
        let best = -Infinity;
        
        // Go through all available square
        for (let i=0; i<numMove; i++) {
            const sim_squares = squares.slice();

            // Make a move in the next available square
            sim_squares[availableMove[i]] = (isPlayerX) ? "O" : "X";
            console.log("AI i: ", i);
            console.log("AI depth: ", depth);
            console.log(sim_squares);            

            // call yourself to loop the next level      
            best = Math.max(best, minmax(sim_squares, depth+1, isPlayerX, !isNextMax));
        }

        return best;
    }
    else {
        let best = Infinity;
        
        // Go through all available square
        for (let i=0; i<numMove; i++) {
            const sim_squares = squares.slice();

            // Make a move in the next available square
            sim_squares[availableMove[i]] = (isPlayerX) ? "X" : "O";
            console.log("Player i: ", i);
            console.log("Player depth: ", depth);
            console.log(sim_squares);

            // call yourself to loop the next level    
            best = Math.min(best, minmax(sim_squares, depth+1, isPlayerX, !isNextMax));
        }

        console.log("totalscore: ", totalscore);
        return best;        
    }

    return null;
  }


  function returnResult(squares, isPlayerX) {

    const player = (isPlayerX ? "X" : "O");
    const AI = (isPlayerX ? "O" : "X");

    // AI: win = +1, draw = 0, loss = -1
    switch (calculateWinner(squares)){
        case player:
            return -1            

        case AI:
            return 1            
            
        default:                            
            return 0
    }
  }  

  export {minmax, returnResult};