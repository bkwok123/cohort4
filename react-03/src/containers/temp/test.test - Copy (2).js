import { minmax, returnScore, processResult } from './test';

// Reference: https://jestjs.io/docs/en/using-matchers
test('Check the returnScore function', () => {
    let squares = ["O",  "X", "X", 
                   "X", null, "X", 
                   "O",  "O", "O"];

    expect(returnScore(squares,false)).toEqual(-1);
    expect(returnScore(squares,true)).toEqual(1);
  
    squares = ["O",  "O", "X", 
                "X",  "X", "X", 
                null, "O", "O"];  

    expect(returnScore(squares,false)).toEqual(1);
    expect(returnScore(squares,true)).toEqual(-1);

    squares = ["X", "O", "X", 
               "X", "X", "O", 
               "O", "X", "O"];  

    expect(returnScore(squares,false)).toEqual(0);
    expect(returnScore(squares,true)).toEqual(0);
  });

test('Check the minmax function', () => {
    let squares = ["O", null, "X", 
                   "X",  "O", "X", 
                   "X",  "O", "O"];

    // expect(minmax(squares,0,true)).toEqual(1);

    // squares = ["O",  "O", "X", 
    //             "X",  "X", "X", 
    //             null, "O", "O"];  

    // expect(minmax(squares,0,true)).toEqual(-1);

    // squares = ["X", "O", "X", 
    //            "X", "X", "O", 
    //            "O", "X", "O"];  

    // expect(minmax(squares,0,false)).toEqual(0);
    // expect(minmax(squares,0,true)).toEqual(0);    

    squares = [ "O", null, "X", 
                "X", null, "X", 
               null, null, "O"];  

    expect(minmax(squares,0,true,true,-1,[])).toEqual(0);
});

test('Check the processResult function', () => {

  let result = [];
  let updatedresult = processResult(result,0);
  expect(updatedresult).toEqual([{move: 0, score: 0, totalscore: 0}]);

  result = [{move: 0, score: 1, totalscore: 0}];
  updatedresult = processResult(result,0);
  expect(updatedresult).toEqual([{move: 0, score: 0, totalscore: 1}]);  

  result.push({move: 1, score: 1, totalscore: 0});
  updatedresult = processResult(result,1);
  expect(updatedresult).toEqual([{move: 0, score: 0, totalscore: 1}, {move: 1, score: 0, totalscore: 1}]);

  result[1].score = 1;
  updatedresult = processResult(result,1);
  expect(updatedresult).toEqual([{move: 0, score: 0, totalscore: 1}, {move: 1, score: 0, totalscore: 2}]);  

});