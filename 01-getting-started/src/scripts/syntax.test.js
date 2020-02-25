import syntaxfunctions from './syntax'

test('Check the multiply', () => {
    expect(syntaxfunctions.multiply(2,3)).toBe(6);
    expect(syntaxfunctions.multiply(10,3)).toBe(30);
});

test('Check the concatenate', () => {
    expect(syntaxfunctions.concatenate("ABC","DEF")).toBe("ABCDEF");
    expect(syntaxfunctions.concatenate("Test"," Script")).toBe("Test Script");
});

test('Check the findmax', () => {
    expect(syntaxfunctions.findmax([1,2,3,9,8,7])).toBe(9);
    expect(syntaxfunctions.findmax([10,2,35,134,8,634])).toBe(634);
});