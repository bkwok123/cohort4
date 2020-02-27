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

test('Check the appendarray', () => {
    expect(syntaxfunctions.appendarray(["dog","cat"],"panda")).toEqual(["tiger","dog","cat","panda"]);
    expect(syntaxfunctions.appendarray(["dog","cat"],"panda")).toContain("panda");
    expect(syntaxfunctions.appendarray(["dog","cat"],"panda")).toContain("tiger");
});

test('Check the car', () => {
    expect(syntaxfunctions.car.model).toEqual("Forester");
    expect(syntaxfunctions.car.year_made).toEqual("2000");
});

test('Check the appendproperties', () => {
    expect(syntaxfunctions.appendproperties({menu1:"shrimp", menu2:"chicken"})).toEqual("shrimpchicken");
    expect(syntaxfunctions.appendproperties({car1:"Honda", car2:"GM", car3:"Ford"})).toEqual("HondaGMFord");
});

test('Check the appendvalues', () => {
    expect(syntaxfunctions.appendvalues({menu1:"shrimp", menu2:"chicken"})).toEqual("shrimp, chicken");
    expect(syntaxfunctions.appendvalues({subject1:"Math", subject2:"English", subject3:"Bio"})).toEqual("Math, English, Bio");
});

test('Check the getKeyByValue', () => {
    expect(syntaxfunctions.getKeyByValue({menu1:"shrimp", menu2:"chicken"}, "shrimp")).toEqual("menu1");
    expect(syntaxfunctions.getKeyByValue({subject1:"Math", subject2:"English", subject3:"Bio"}, "English")).toEqual("subject2");
});

test('Check the getValueByKey', () => {
    expect(syntaxfunctions.getValueByKey({menu1:"shrimp", menu2:"chicken"}, "menu1")).toEqual("shrimp");
    expect(syntaxfunctions.getValueByKey({subject1:"Math", subject2:"English", subject3:"Bio"}, "subject2")).toEqual("English");
});

test('Check the findmin', () => {
    expect(syntaxfunctions.findmin([1,2,3,9,8,7])).toBe(1);
    expect(syntaxfunctions.findmin([10,2,35,134,8,634])).toBe(2);
});

test('Check the findmin2', () => {
    expect(syntaxfunctions.findmin2([1,2,3,9,8,7])).toBe(1);
    expect(syntaxfunctions.findmin2([10,2,35,134,8,634])).toBe(2);
});