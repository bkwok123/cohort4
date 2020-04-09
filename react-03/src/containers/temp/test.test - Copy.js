import { minmax, returnResult } from './test';

// Reference: https://jestjs.io/docs/en/using-matchers
test('Check the returnResult function', () => {
    let squares = ["O",  "X", "X", 
                   "X", null, "X", 
                   "O",  "O", "O"];

    expect(returnResult(squares,false)).toEqual(-1);
    expect(returnResult(squares,true)).toEqual(1);
  
    squares = ["O",  "O", "X", 
                "X",  "X", "X", 
                null, "O", "O"];  

    expect(returnResult(squares,false)).toEqual(1);
    expect(returnResult(squares,true)).toEqual(-1);

    squares = ["X", "O", "X", 
               "X", "X", "O", 
               "O", "X", "O"];  

    expect(returnResult(squares,false)).toEqual(0);
    expect(returnResult(squares,true)).toEqual(0);
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
               null,  "O", "O"];  

    expect(minmax(squares,0,true,false,0)).toEqual(0);
});