import DOM from './domelement.js'
import City from './city.js'
import Account, {AccountController} from './account.js'

// Reference: https://jestjs.io/docs/en/using-matchers
test('Check the AppElement class instantiation1', () => {

    const el = new DOM.AppElement ("k1");
    expect(el.key).toBe("k1");
    expect(el.element).toBe(null);
});

test('Check the AppElement class getElement1 method', () => {
    
    const el = new DOM.AppElement ("k1");
    const el1 = el.getElement("div");
    const el2 = document.createElement("div");
    expect(el1).toEqual(el2);

    const el3 = new DOM.AppElement ("k2");
    const el4 = el.getElement("button");
    const el5 = document.createElement("button");    
    expect(el4).toEqual(el5);
});

test('Check the DisplayPanel class instantiation2', () => {

    const el = new DOM.DisplayPanel ("k1");
    expect(el.key).toBe("k1");
    expect(el.element).toBe(null);
    expect(el.updateObj).toBe(null);
});

test('Check the createDisplayPanel function', () => {
    
    let obj = document.createElement("div");
    let panel = DOM.htmlEl.createDisplayPanel(obj);
    expect(obj.children.length).toEqual(2); 
    expect(panel).toEqual(obj);   
    expect(panel.nodeName).toEqual("DIV");      
    expect(panel.children[0].nodeName).toEqual("LABEL");
    expect(panel.children[1].nodeName).toEqual("UL");
});

// test('Check the DisplayPanel class getElement2 method', () => {

//     const el = new DOM.DisplayPanel ("k1");
//     const panel = el.getElement();
//     expect(panel.nodeName).toEqual("DIV");
//     expect(el.updateObj["label"].nodeName).toEqual("LABEL");
//     expect(el.updateObj["list"].nodeName).toEqual("UL");
// });

// test('Check the ControlPanel class instantiation3', () => {

//     const el = new DOM.ControlPanel ("k1");
//     expect(el.key).toBe("k1");
//     expect(el.element).toBe(null);
//     expect(el.updateObj).toBe(null);
// });

// test('Check the ControlPanel class getElement3 method', () => {

//     const el = new DOM.ControlPanel ("k1");
//     const panel = el.getElement();
//     expect(panel.nodeName).toEqual("DIV");
//     expect(el.updateObj["label"].nodeName).toEqual("DIV");
//     expect(el.updateObj["bpanel1"].nodeName).toEqual("DIV");
//     expect(el.updateObj["bpanel2"].nodeName).toEqual("DIV");
//     expect(el.updateObj["ipanel1"].nodeName).toEqual("DIV");
//     expect(el.updateObj["bpanel3"].nodeName).toEqual("DIV");
// });

// test('Check the Cards class instantiation4', () => {

//     const el = new DOM.Cards ("k1");
//     expect(el.key).toBe("k1");
//     expect(el.element).toBe(null);
// });

// test('Check the Cards class getElement4 method', () => {

//     let array = [];
//     let myAccount = new Account("Checking",20);
//     array.push(myAccount);
//     myAccount = new Account("Saving",20);
//     array.push(myAccount);
//     myAccount = new Account("Investment", 40);
//     array.push(myAccount);

//     const el = new DOM.Cards ("k1");
//     const panel = el.getElement(array,true);
//     expect(panel.nodeName).toEqual("DIV");
//     expect(panel.children.length).toEqual(3);
// });

// test('Check the Cards class removeAll method', () => {

//     let array = [];
//     let myAccount = new Account("Checking",20);
//     array.push(myAccount);
//     myAccount = new Account("Saving",20);
//     array.push(myAccount);
//     myAccount = new Account("Investment", 40);
//     array.push(myAccount);

//     const el = new DOM.Cards ("k1");
//     const panel = el.getElement(array,true);
//     el.removeAll();
//     expect(panel.nodeName).toEqual("DIV");
//     expect(panel.children.length).toEqual(0);
// });

// test('Check the eraseitems function', () => {

//     let array = [];
//     let panel = document.createElement("div");
//     panel.append(document.createElement("div"));
//     panel.append(document.createElement("div"));
//     panel.append(document.createElement("div"));
//     DOM.eraseitems(panel);
//     expect(panel.children.length).toEqual(0);
// });

// test('Check the createControlPanel function', () => {
    
//     let obj = document.createElement("div");
//     let array = DOM.createControlPanel(obj);
//     expect(array.length).toEqual(4);    
// });


// test('Check the createButton function', () => {
    
//     let panel = document.createElement("div");
//     let subpanel = DOM.createButton(panel,[{"id": "createclassBtn", "class": "acctbtn"}, 
//                                              {"id": "removeclassBtn", "class": "acctbtn"}, 
//                                              {"id": "nameclassBtn", "class": "acctbtn"}]);

//     expect(subpanel.children.length).toEqual(3);     
//     expect(subpanel.children[0].nodeName).toEqual("BUTTON");
//     expect(subpanel.children[0].id).toEqual("createclassBtn");
//     expect(subpanel.children[0].getAttribute("class")).toEqual("acctbtn");
//     expect(subpanel.children[1].nodeName).toEqual("BUTTON");
//     expect(subpanel.children[1].id).toEqual("removeclassBtn");
//     expect(subpanel.children[1].getAttribute("class")).toEqual("acctbtn");
//     expect(subpanel.children[2].nodeName).toEqual("BUTTON");
//     expect(subpanel.children[2].id).toEqual("nameclassBtn");
//     expect(subpanel.children[2].getAttribute("class")).toEqual("acctbtn");        
// });

// test('Check the createSubPanel function', () => {
    
//     let panel = document.createElement("div");
//     let subpanel = DOM.createSubPanel(panel,{"class": "subpanel"},
//                                 [{"id": "createclassBtn", "class": "acctbtn"}, 
//                                  {"id": "removeclassBtn", "class": "acctbtn"}, 
//                                  {"id": "nameclassBtn", "class": "acctbtn"}],true,{},{});

//     expect(panel.children.length).toEqual(1);     
//     expect(panel.children[0].nodeName).toEqual("DIV");
//     expect(panel.children[0].getAttribute("class")).toEqual("subpanel");
//     expect(subpanel.children.length).toEqual(3);     
//     expect(subpanel.children[0].nodeName).toEqual("BUTTON");
//     expect(subpanel.children[0].id).toEqual("createclassBtn");
//     expect(subpanel.children[0].getAttribute("class")).toEqual("acctbtn");
//     expect(subpanel.children[1].nodeName).toEqual("BUTTON");
//     expect(subpanel.children[1].id).toEqual("removeclassBtn");
//     expect(subpanel.children[1].getAttribute("class")).toEqual("acctbtn");
//     expect(subpanel.children[2].nodeName).toEqual("BUTTON");
//     expect(subpanel.children[2].id).toEqual("nameclassBtn");
//     expect(subpanel.children[2].getAttribute("class")).toEqual("acctbtn");  
        
//     subpanel = DOM.createSubPanel(panel,{"class": "subpanel"},[],false, 
//                                     {"id": "class_qty_label"}, 
//                                     {"type": "number", "id":"inputAmt", "class":"acctinput"}); 
    
//     expect(panel.children.length).toEqual(2);     
//     expect(panel.children[1].nodeName).toEqual("DIV");
//     expect(panel.children[1].getAttribute("class")).toEqual("subpanel");
//     expect(subpanel.children[0].nodeName).toEqual("P");
//     expect(subpanel.children[0].id).toEqual("class_qty_label");    
//     expect(subpanel.children[1].nodeName).toEqual("INPUT");
//     expect(subpanel.children[1].id).toEqual("inputAmt");
//     expect(subpanel.children[1].getAttribute("type")).toEqual("number");    
//     expect(subpanel.children[1].getAttribute("class")).toEqual("acctinput");    
// });

// test('Check the addCard function', () => {

//     const container = document.createElement("div");
//     const myCity = new City ("Calgary",51.0447,-114.0719,1336000);
//     const account = new Account("Checking",20);
//     let card = DOM.addCard(container,myCity.name,myCity.population,"Population: ");
//     expect(container.children.length).toEqual(1);
//     expect(container.children[0].nodeName).toEqual("DIV");
//     card = DOM.addCard(container,account.accountName,account.startingBalance,"Balance: $");
//     expect(container.children.length).toEqual(2);
//     expect(container.children[1].nodeName).toEqual("DIV");
// });

// test('Check the createCityCards function', () => {

//     const container = document.createElement("div");
//     let array = [];
//     let myCity = new City ("Calgary",51.0447,-114.0719,1336000);
//     array.push(myCity);
//     myCity = new City ("Edmonton",51.0447,-114.0719,1336000);
//     array.push(myCity);
//     myCity = new City ("Airdire",51.0447,-114.0719,1336000);
//     array.push(myCity);
//     DOM.createCityCards (container, array);

//     expect(container.children.length).toEqual(3);
//     expect(container.children[0].nodeName).toEqual("DIV");
//     expect(container.children[0].id).toEqual("Calgary_div");
//     expect(container.children[1].nodeName).toEqual("DIV");
//     expect(container.children[1].id).toEqual("Edmonton_div");
//     expect(container.children[2].nodeName).toEqual("DIV");
//     expect(container.children[2].id).toEqual("Airdire_div");
// });

// test('Check the createAccountCards function', () => {

//     const container = document.createElement("div");
//     let array = [];
//     let myAccount = new Account("Checking",20);
//     array.push(myAccount);
//     myAccount = new Account("Saving",20);
//     array.push(myAccount);
//     myAccount = new Account("Investment", 40);
//     array.push(myAccount);
//     DOM.createAccountCards (container, array);

//     expect(container.children.length).toEqual(3);
//     expect(container.children[0].nodeName).toEqual("DIV");
//     expect(container.children[0].id).toEqual("Checking_div");
//     expect(container.children[1].nodeName).toEqual("DIV");
//     expect(container.children[1].id).toEqual("Saving_div");
//     expect(container.children[2].nodeName).toEqual("DIV");
//     expect(container.children[2].id).toEqual("Investment_div");
// });

// test('Check the createCards function', () => {
    
//     let array = [];
//     let myAccount = new Account("Checking",20);
//     array.push(myAccount);
//     myAccount = new Account("Saving",20);
//     array.push(myAccount);
//     myAccount = new Account("Investment", 40);
//     array.push(myAccount);
//     let container = DOM.createCards(array,true);

//     expect(container).toEqual(3);
//     expect(container.children.length).toEqual(3);
//     expect(container.children[0].nodeName).toEqual("DIV");
//     expect(container.children[0].id).toEqual("Checking_div");
//     expect(container.children[1].nodeName).toEqual("DIV");
//     expect(container.children[1].id).toEqual("Saving_div");
//     expect(container.children[2].nodeName).toEqual("DIV");
//     expect(container.children[2].id).toEqual("Investment_div");    
// });