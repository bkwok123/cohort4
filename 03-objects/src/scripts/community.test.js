import City from './city.js'
import Community from './community.js'

// Reference: https://jestjs.io/docs/en/using-matchers
test('Check the community class instantiation', () => {

    const community = new Community ("Community 1");
    const obj = {"name": "Community 1", "citys": []};

    expect(community.name).toBe("Community 1");
    expect(community.citys).toEqual([]);
    expect(community).toEqual(obj);        
});

test('Check the community class createCity method', () => {

    const community = new Community ("Community 1");    
    let citys = [];

    citys.push(new City("Calgary",51.0447,-114.0719,1336000));
    expect(community.createCity("Calgary",51.0447,-114.0719,1336000)).toEqual(citys);

    citys.push(new City("Emonton",53.5461,-113.4938,981280));
    expect(community.createCity("Emonton",53.5461,-113.4938,981280)).toEqual(citys);

    citys.push(new City("Banff",51.1784,-115.5708,7847));
    expect(community.createCity("Banff",51.1784,-115.5708,7847)).toEqual(citys);
});

test('Check the community class deleteCity method', () => {

    const community = new Community ("Community 1");        
    let citys = [];

    community.createCity("Calgary",51.0447,-114.0719,1336000);
    community.createCity("Emonton",53.5461,-113.4938,981280);
    community.createCity("Banff",51.1784,-115.5708,7847);
    
    citys = [new City("Calgary",51.0447,-114.0719,1336000), new City("Banff",51.1784,-115.5708,7847)];
    expect(community.deleteCity("Emonton")).toEqual(citys);
    
    citys = [new City("Banff",51.1784,-115.5708,7847)];
    expect(community.deleteCity("Calgary")).toEqual(citys);

    citys = [];
    expect(community.deleteCity("Banff")).toEqual(citys);
});

test('Check the community class whichSphere method', () => {

    const community = new Community ("Community 1");
    community.createCity("Calgary",51.0447,-114.0719,1336000);
    community.createCity("Lima",-12.0464,-77.0428,268352);
    community.createCity("Sydney",-33.8688,151.2093,5.23*1000000);
    community.createCity("Hong Kong",22.3193,114.1694,7.392*1000000);
    community.createCity("Island",0,0,7.392*1000000);

    expect(community.whichSphere("Calgary")).toBe("Northern Hemisphere");
    console.log(community.whichSphere("Calgary"));
    expect(community.whichSphere("Lima")).toBe("Southern Hemisphere");
    expect(community.whichSphere("Sydney")).toBe("Southern Hemisphere");
    expect(community.whichSphere("Hong Kong")).toBe("Northern Hemisphere");
    expect(community.whichSphere("Island")).toBe("Equator");

});

test('Check the community class getMostNorthern method', () => {

    const community = new Community ("Community 1");
    community.createCity("Calgary",51.0447,-114.0719,1336000);
    community.createCity("Lima",-12.0464,-77.0428,268352);
    community.createCity("Sydney",-33.8688,151.2093,5.23*1000000);
    community.createCity("Hong Kong",22.3193,114.1694,7.392*1000000);

    expect(community.getMostNorthern()).toBe("Calgary");

    community.createCity("KKK",82,114.1694,7.392*1000000);
    expect(community.getMostNorthern()).toBe("KKK");

    community.createCity("ABC",90,114.1694,7.392*1000000);
    expect(community.getMostNorthern()).toBe("ABC");
});

test('Check the community class getMostSouthern method', () => {

    const community = new Community ("Community 1");
    community.createCity("Calgary",51.0447,-114.0719,1336000);
    community.createCity("Lima",-12.0464,-77.0428,268352);
    community.createCity("Sydney",-33.8688,151.2093,5.23*1000000);
    community.createCity("Hong Kong",22.3193,114.1694,7.392*1000000);

    expect(community.getMostSouthern()).toBe("Sydney");

    community.createCity("ABC",-90,114.1694,7.392*1000000);
    expect(community.getMostSouthern()).toBe("ABC");
});

test('Check the community class getPopulation method', () => {

    const community = new Community ("Community 1");
    community.createCity("Calgary",51.0447,-114.0719,100);
    community.createCity("Lima",-12.0464,-77.0428,200);
    community.createCity("Sydney",-33.8688,151.2093,300);
    community.createCity("Hong Kong",22.3193,114.1694,400);

    expect(community.getPopulation()).toBe(1000);

    community.createCity("ABC",-90,114.1694,500);
    expect(community.getPopulation()).toBe(1500);

    community.createCity("KKK",-90,114.1694,2000);
    expect(community.getPopulation()).toBe(3500); 
});

test('Check the community class return_index method', () => {

    const community = new Community ("Community 1");

    expect(community.return_index("Calgary")).toBe(null);

    community.createCity("Calgary",51.0447,-114.0719,100);
    community.createCity("Lima",-12.0464,-77.0428,200);
    community.createCity("Sydney",-33.8688,151.2093,300);

    expect(community.return_index("Calgary")).toBe(0);
    expect(community.return_index("Lima")).toBe(1);
    expect(community.return_index("Sydney")).toBe(2);

    expect(community.return_index("Test")).toBe(null);  
});

test('Check the community class isNameExisting method', () => {

    const community = new Community ("Community 1");

    expect(community.isNameExisting("Calgary")).toBe(false);

    community.createCity("Calgary",51.0447,-114.0719,100);
    community.createCity("Lima",-12.0464,-77.0428,200);
    community.createCity("Sydney",-33.8688,151.2093,300);

    expect(community.isNameExisting("Calgary")).toBe(true);
    expect(community.isNameExisting("Lima")).toBe(true);
    expect(community.isNameExisting("Sydney")).toBe(true);
});