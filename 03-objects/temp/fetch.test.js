import API from './fetch.js'

const data = [
    {"name":"Kayla","surname":"Moth","gender":"female","region":"New Zealand"},
    {"name":"Elvira","surname":"Manoilă","gender":"female","region":"Romania"},
    {"name":"Fevzi","surname":"Yüksel","gender":"male","region":"Turkey"},
    {"name":"Radoslav","surname":"Michálech","gender":"male","region":"Slovakia"},
    {"name":"Miriama","surname":"Šimek","gender":"female","region":"Slovakia"},
    {"name":"Dorli","surname":"Bălceanu","gender":"female","region":"Romania"},
    {"name":"Lia","surname":"Negoiță","gender":"female","region":"Romania"},
    {"name":"Λουΐζα","surname":"Αλεβιζόπουλος","gender":"female","region":"Greece"},
    {"name":"Teohari","surname":"Crețu","gender":"male","region":"Romania"},
    {"name":"Varvara","surname":"Braghiș","gender":"female","region":"Romania"}];


const me = { 
    "name": "Boris", 
    "surname": "Kwok", 
    "gender": "male", 
    "region": "Canada" 
};
    

test('Check the getFirstName method', () => {

    expect(API.getFirstName(data,0)).toBe("Kayla");
});

test('Check the getAllFirstNames method', () => {

    expect(API.getAllFirstNames(data)).toEqual(["Kayla","Elvira","Fevzi","Radoslav","Miriama","Dorli","Lia","Λουΐζα","Teohari","Varvara"]);
});

test('Check the getUsers method', () => {

    let apidata = API.getUsers();
    
    console.log(apidata);

});

test('Check the fetch method', () => {
    
    const sMe = JSON.stringify(me);
    console.log(sMe);

});