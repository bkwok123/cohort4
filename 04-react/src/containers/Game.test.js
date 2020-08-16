import React from 'react';
import { render } from '@testing-library/react';
import Game, { getavailableMove, produceRandomMove, minmax, returnResult, produceBestMove } from './Game';

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

test('Check the produceRandomMove function', () => {
  let squares = [null, null, null, null, null, null, null, null, null];
  expect(produceRandomMove(squares)).toBeGreaterThanOrEqual(0);
  expect(produceRandomMove(squares)).toBeLessThanOrEqual(8);  

  squares = [null, "X", null, null, null, null, null, null, null];
  expect(produceRandomMove(squares)).toBeGreaterThanOrEqual(0);
  expect(produceRandomMove(squares)).toBeLessThanOrEqual(8);  
  expect(produceRandomMove(squares)).not.toBe(1);

  squares = [null, "X", null, "O", null, null, null, null, null];
  expect(produceRandomMove(squares)).toBeGreaterThanOrEqual(0);
  expect(produceRandomMove(squares)).toBeLessThanOrEqual(8);  
  expect(produceRandomMove(squares)).not.toBe(1);  
  expect(produceRandomMove(squares)).not.toBe(3);

  squares = [null, "X", null, "O", "X", null, null, null, null];
  expect(produceRandomMove(squares)).toBeGreaterThanOrEqual(0);
  expect(produceRandomMove(squares)).toBeLessThanOrEqual(8);  
  expect(produceRandomMove(squares)).not.toBe(1);  
  expect(produceRandomMove(squares)).not.toBe(3);  
  expect(produceRandomMove(squares)).not.toBe(4);

  squares = ["X", "X", "X", "O", "X", "O", "O", "X", null];
  expect(produceRandomMove(squares)).toBe(8);

  squares = ["X", "X", "X", null, "X", "O", "O", "X", "O"];
  expect(produceRandomMove(squares)).toBe(3);  

  squares = ["X", "X", "X", "X", "X", "O", "O", "X", "O"];
  expect(produceRandomMove(squares)).toBe(-1);    
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

test('Check the produceBestMove function', () => {

  let squares = [ "O", null, "X", 
                  "X", null, "X", 
                 null, null, "O"];  
  expect(produceBestMove(squares)).toBe(4);  

  squares = [ "O",  "X",  "X", 
             null,  "X", null, 
              "O", null, null];  
  expect(produceBestMove(squares)).toBe(3);  

  squares = [ "O",  "X",  "X", 
             null,  "O",  "X", 
             null, null, null];  
  expect(produceBestMove(squares)).toBe(8);    

});