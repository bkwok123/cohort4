import calculate from './closures.js'

test('Check the calculate closure', () => {
    let display="";
    display = calculate("1")["display"];
    expect(display).toBe("1");
    display = calculate("2")["display"];
    expect(display).toBe("12");
    display = calculate("+")["display"];
    expect(display).toBe("12");
    display = calculate("3")["display"];
    expect(display).toBe("3");
    display = calculate("=")["display"];
    expect(display).toBe("15");
    display = calculate("3")["display"];
    expect(display).toBe("153");
    display = calculate("-")["display"];
    expect(display).toBe("153");
    display = calculate("3")["display"];
    expect(display).toBe("3");
    display = calculate("/")["display"];
    expect(display).toBe("150");    
});