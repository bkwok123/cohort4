import { minmax, minimax, returnResult } from './test';

// Reference: https://jestjs.io/docs/en/using-matchers
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

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

    squares = ["X",  "O", "X", 
               "X", null, "O", 
               "O",  "X", "O"];  

    expect(returnResult(squares,false)).toEqual(null);
    expect(returnResult(squares,true)).toEqual(null);    
  });

test('Check the minmax function', () => {
    let squares = ["O", null, "X", 
                   "X",  "O", "X", 
                   "X",  "O", "O"];
    expect(minmax(squares,true,true)).toBeWithinRange(-1,1);
    expect(minmax(squares,true,true)).toBe(1);
    expect(minmax(squares,false,false)).toBe(-1);

    squares = ["O",  "O", "X", 
                "X",  "X", "X", 
                null, "O", "O"];  
    expect(minmax(squares,true,true)).toBeWithinRange(-1,1);
    expect(minmax(squares,true,true)).toBe(-1);
    expect(minmax(squares,false,false)).toBe(1);

    squares = ["X", "O", "X", 
               "X", "X", "O", 
               "O", "X", "O"];  
    expect(minmax(squares,true,true)).toBeWithinRange(-1,1);
    expect(minmax(squares,true,true)).toBe(0);
    expect(minmax(squares,false,false)).toBe(0);  

    squares = [ "O", null, "X", 
                "X", null, "X", 
               null, null, "O"];  
    expect(minmax(squares,true,true)).toBeWithinRange(-1,1);
});