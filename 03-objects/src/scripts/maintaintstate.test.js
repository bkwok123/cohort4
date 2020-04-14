import State from './maintaintstate.js'

global.fetch = require('node-fetch');

// Reference: https://jestjs.io/docs/en/using-matchers
test('Check the getData method', async () => {

    const url = 'https://api.myjson.com/bins/k3k4w';
    const page_state = {
        currentAccount: "None",
        currentCity: "None",
        currentPage: "None"
    };
    const jsondata = JSON.stringify(page_state);
    const parsedata = JSON.parse(jsondata);
    console.log(jsondata);
    console.log(parsedata);
      
    let webdata = await State.getData(url);

    expect(webdata.currentAccount).toBe("None");
    expect(webdata.currentCity).toBe("None");
    expect(webdata.currentPage).toBe("None");
    expect(webdata).toEqual(page_state);
});

test('Check the postData method', async () => {

    const url = 'https://api.myjson.com/bins/';
    const clients = [
        {key:1, name:"Larry"},
        {key:2, name:"Lorraine"},
    ]
    
    // Check that the server is running and clear any data
    let webdata = await State.postData(url,clients);
    expect(webdata.status).toEqual(201);
    
    let newurl = webdata.uri;
    console.log(newurl);

    webdata = await State.getData(newurl);
    expect(webdata).toEqual(clients);
    expect(webdata.length).toEqual(2);
});

test('Check the putData method', async () => {

    const url = 'https://api.myjson.com/bins/14akz4';    
    let clients = [
        {key:1, name:"Barry"},
        {key:2, name:"Bard"},
        {key:3, name:"Ben"},
        {key:4, name:"Bush"},
    ]
    
    // Check that the server is running and clear any data
    let webdata = await State.putData(url,clients);
    expect(webdata[0]).toEqual({key:1, name:"Barry"});
    expect(webdata[1]).toEqual({key:2, name:"Bard"});
    expect(webdata[2]).toEqual({key:3, name:"Ben"});
    expect(webdata[3]).toEqual({key:4, name:"Bush"});
    expect(webdata.status).toEqual(200);
    expect(webdata.statusText).toEqual("OK");
    expect(webdata.length).toEqual(4);

    clients = [
        {key:1, name:"ABC"},
        {key:2, name:"DEF"},
    ]    

    webdata = await State.putData(url,clients);
    expect(webdata[0]).toEqual({key:1, name:"ABC"});
    expect(webdata[1]).toEqual({key:2, name:"DEF"});
    expect(webdata.status).toEqual(200);
    expect(webdata.statusText).toEqual("OK");
    expect(webdata.length).toEqual(2);    
});