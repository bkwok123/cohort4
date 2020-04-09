import { getavailableMove, calculateWinner } from './Game';

// Generate best move based on remaining available move on the board
// Important condition: The next move must by by AI when this function is first called
  function minmax(squares, depth, isPlayerX, isNextMax, currentMove, result) {
    const availableMove = getavailableMove(squares);
    const numMove = availableMove.length;    
    let nextMove = (currentMove < 0) ? availableMove[0] : currentMove;
    let updatedresult = result.slice();

    // Check the result of the game
    const score = returnScore(squares, isPlayerX);

    // Either player wins, return the score (player = -1, AI = +1)
    if (Math.abs(score) === 1) {
        let objIndex = updatedresult.findIndex((obj => obj.move == nextMove));
        updatedresult[objIndex].score = score;

console.log("result (end game): ", result);
        return updatedresult;
    }

    // Exit when there is no more move, return a draw score
    // Important condition: the first call to minmax has at least 1 remaining move
    if (numMove < 1) {
        let objIndex = updatedresult.findIndex((obj => obj.move == nextMove));
        updatedresult[objIndex].score = 0;

// console.log("result (no move): ", result);
        return updatedresult;
    }

    // Simulate the game by looping through (recursivly calling) all possible moves by both players
    // AI is the maximizer and Player is the minimizer
    if (isNextMax) {       // Maximizer's (AI) move
        let best = -Infinity;
        // let updatedresult = result.slice();
        
        // Go through all available square
        for (let i=0; i<numMove; i++) {
            const sim_squares = squares.slice();            
            updatedresult = result.slice();

            // Track the move position only at depth level zero (root level)
            if (depth === 0) {
                // updatedresult = result.slice();
                nextMove = availableMove[i];
console.log("nextMove (max): ", nextMove);
console.log("result: ",updatedresult);                                
                updatedresult.push({move: nextMove, score: 0, totalscore: 0});               
console.log("updatedresult: ",updatedresult);                
            }
                        
            // Make a move in the next available square
            sim_squares[availableMove[i]] = (isPlayerX) ? "O" : "X";
// console.log("AI i: ", i);
// console.log("AI depth: ", depth);
// console.log(sim_squares);            

            // Call yourself to loop the next level            
            updatedresult = minmax(sim_squares, depth+1, isPlayerX, !isNextMax, nextMove, updatedresult);

            // Process result from previous call
            updatedresult = processResult(result, nextMove);
console.log("updatedresult (max): ", updatedresult);
            
            // let objIndex = updatedresult.findIndex((obj => obj.move == nextMove));

            // best = Math.max(best, updatedresult[objIndex].totalscore);
            // updatedresult[objIndex].totalscore = best;
        }

        return updatedresult;
    }
    else {
        let best = Infinity;
        // let updatedresult = result.slice();
        
        // Go through all available square
        for (let i=0; i<numMove; i++) {
            const sim_squares = squares.slice();            
            updatedresult = result.slice();
            
            // Track the move position only at depth level zero (root level)
            if (depth === 0) {
                nextMove = availableMove[i];
console.log("nextMove (min): ", nextMove);           
                updatedresult.push({move: nextMove, score: 0, totalscore: 0});               
            }

            // Make a move in the next available square
            sim_squares[availableMove[i]] = (isPlayerX) ? "X" : "O";
// console.log("Player i: ", i);
// console.log("Player depth: ", depth);
// console.log(sim_squares);

            // Call yourself to loop the next level            
            updatedresult = minmax(sim_squares, depth+1, isPlayerX, !isNextMax, nextMove, updatedresult);

            // Process result from previous call
            updatedresult = processResult(result, nextMove);
// console.log("updatedresult (min): ", updatedresult);
            
            // let objIndex = updatedresult.findIndex((obj => obj.move == nextMove));

            // best = Math.min(best, updatedresult[objIndex].totalscore);
            // updatedresult[objIndex].totalscore = best;
        }

        return updatedresult;        
    }

    return null;
  }

  function processResult(result, depth0move) {
    let updatedresult = result.slice();
console.log("In Process:", updatedresult);
    if (updatedresult.length === 0) {  // Initialize the result in the first call

        // updatedresult.push({move: depth0move, score: 0, totalscore: 0})

        return updatedresult;
    }
    else {                      // Check if the current move object is pushed already        
        // Find index of specific object using findIndex method.        
        let objIndex = updatedresult.findIndex((obj => obj.move == depth0move));

        if (objIndex > -1) {
            updatedresult[objIndex].totalscore = updatedresult[objIndex].totalscore + updatedresult[objIndex].score
            
            // Reset game score for next simulated game
            updatedresult[objIndex].score = 0;
        }
console.log("Process: ",updatedresult);
        return updatedresult;
    }

  }


  function returnScore(squares, isPlayerX) {

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

  export {minmax, returnScore, processResult};