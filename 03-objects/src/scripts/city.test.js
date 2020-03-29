import City from './city.js'

// Reference: https://jestjs.io/docs/en/using-matchers
test('Check the city class instantiation', () => {

    const city = new City ("Calgary",51.0447,-114.0719,1336000)

    expect(city.name).toBe("Calgary");
    expect(city.latitude).toBe(51.0447);
    expect(city.longitude).toBe(-114.0719);
    expect(city.population).toBe(1336000);

    const city2 = new City ("Emonton",53.5461,-113.4938,981280)

    expect(city2.name).toBe("Emonton");
    expect(city2.latitude).toBe(53.5461);
    expect(city2.longitude).toBe(-113.4938);
    expect(city2.population).toBe(981280);    
});

test('Check the city class show method', () => {

    const city = new City ("Calgary",51.0447,-114.0719,1336000)
    expect(city.show()).toBe("Calgary, 51.0447, -114.0719, 1336000");

    const city2 = new City ("Emonton",53.5461,-113.4938,981280)
    expect(city2.show()).toBe("Emonton, 53.5461, -113.4938, 981280");
});

test('Check the city class movedIn method', () => {

    const city = new City ("Calgary",51.0447,-114.0719,1336000)
    expect(city.movedIn(1000)).toBe(1336000 + 1000);
    expect(city.movedIn(40000)).toBe(1336000  + 1000 + 40000);
});

test('Check the city class movedOut method', () => {

    const city = new City ("Calgary",51.0447,-114.0719,1336000)
    expect(city.movedOut(1000)).toBe(1336000 - 1000);
    expect(city.movedOut(40000)).toBe(1336000 - 1000 - 40000);
});

test('Check the city class howBig method', () => {

    const city = new City ("Calgary",51.0447,-114.0719,1336000)
    expect(city.howBig()).toBe("City");

    city.population = 100000;
    expect(city.howBig()).toBe("Large town");

    city.population = 20000;
    expect(city.howBig()).toBe("Town");

    city.population = 1000;
    expect(city.howBig()).toBe("Village");

    city.population = 100;
    expect(city.howBig()).toBe("Hamlet");    
});

test('Check the Object Reference Exercise', () => {

    const myCity = new City ("Calgary",51.0447,-114.0719,1336000);
    let myFav = myCity;

    expect(myCity.population).toBe(1336000);
    expect(myFav.population).toBe(1336000);

    myCity.movedIn(100);
    expect(myCity.population).toBe(1336100);
    expect(myFav.population).toBe(1336100);

    myCity.movedOut(500);
    expect(myCity.population).toBe(1335600);
    expect(myFav.population).toBe(1335600);    

    myFav = new City ("Edmonton",51.0447,-114.0719,1336000);
    myFav.movedIn(200);
    expect(myCity.population).toBe(1335600);
    expect(myFav.population).toBe(1336200);    

    myFav.movedOut(6200);
    expect(myCity.population).toBe(1335600);
    expect(myFav.population).toBe(1330000);        
});