import functions from './functions'

test('Check the sizes', () => {
    expect(functions.size(-1)).toBe("small"); // Consider the edge cases
    expect(functions.size(0)).toBe("small");
    expect(functions.size(10)).toBe("medium");
    expect(functions.size(15)).toBe("medium");
    expect(functions.size(20)).toBe("large");
    expect(functions.size(2000000)).toBe("large");
});

test('Does that add function work?', () => {
    expect(functions.add(1,2)).toBe(3);
    expect(functions.add(101,202)).toBe(303);
});

test('Does that subtract function work?', () => {
    expect(functions.subtract(10,2)).toBe(8);
    expect(functions.subtract(333,202)).toBe(131);
});

test('Does that multiply function work?', () => {
    expect(functions.multiply(10,2)).toBe(20);
    expect(functions.multiply(4,6)).toBe(24);
});

test('Does that divide function work?', () => {
    expect(functions.divide(10,2)).toBe(5);
    expect(functions.divide(45,4)).toBe(11.25);
});

test('Does that convertpercentage function work?', () => {
    expect(functions.convertpercentage(100)).toBe(1);
    expect(functions.convertpercentage(57.5)).toBe(0.575);
});

test('Does that calculate function work?', () => {
    expect(functions.calculate(10,20,"+")).toBe(30);
    expect(functions.calculate(10,20,"-")).toBe(-10);
    expect(functions.calculate(10,20,"x")).toBe(200);
    expect(functions.calculate(10,20,"/")).toBe(0.5);
});

test('Does that calculate_taxamt function work?', () => {
    expect(functions.calculate_taxamt(1)).toBe(0.15);
    expect(functions.calculate_taxamt(2)).toBe(0.3);
    expect(functions.calculate_taxamt(50000)).toBe(7580.325);
    expect(functions.calculate_taxamt(100000)).toBe(17992.06);
    expect(functions.calculate_taxamt(150000)).toBe(30992.06);
    expect(functions.calculate_taxamt(250000)).toBe(61403.56);
});

test('Does that calculate_taxrate function work?', () => {
    expect(functions.calculate_taxrate(1)).toBe(0.15);
    expect(functions.calculate_taxrate(100000)).toBe(0.1799206);
});

// test('Does that isEven function work?', () => {
//     expect(functions.isEven(2)).toBe(true);
// });