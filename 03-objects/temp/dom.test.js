import DOM from './dom.js'

// Reference: https://jestjs.io/docs/en/using-matchers
test('Check the AppElement class instantiation', () => {

    const el = new DOM.AppElement ("k1");
    expect(el.key).toBe("k1");
    expect(el.element).toBe(null);
});

test('Check the AppElement class getElement method', () => {
    
    const el = new DOM.AppElement ("k1");
    const el1 = el.getElement("div");
    const el2 = document.createElement("div");
    expect(el1).toEqual(el2);

    const el3 = new DOM.AppElement ("k2");
    const el4 = el.getElement("button");
    const el5 = document.createElement("button");    
    expect(el4).toEqual(el5);
});

test('Check the AppElement class appendchild method', () => {
    
    const obj = new DOM.AppElement ("k1");
    const el = obj.getElement("div");
    const ch = obj.appendchild("label");

    expect(el.nodeName).toEqual("DIV");
    expect(el.childNodes[0].nodeName).toEqual("LABEL");
    expect(ch.nodeName).toEqual("LABEL");    
});

test('Check the AppElement class setChildAttribute method', () => {
    
    const obj = new DOM.AppElement ("k1");
    const el = obj.getElement("div");
    const ch = obj.appendchild("label");
    obj.setChildAttribute(0,"id", "id1");

    expect(ch.getAttribute("id")).toEqual("id1");    
});

test('Check the createDisplayPanel3 function', () => {
    
    let obj = DOM.createDisplayPanel();
    expect(obj.children.length).toEqual(2);    

    obj = DOM.createControlPanel();
    expect(obj.children.length).toEqual(5);    
});

test('Check the createButton function', () => {
    
    let panel = document.createElement("div");
    let subpanel = DOM.createButton(panel,[{"id": "createclassBtn", "class": "acctbtn"}, 
                                             {"id": "removeclassBtn", "class": "acctbtn"}, 
                                             {"id": "nameclassBtn", "class": "acctbtn"}]);

    expect(subpanel.children.length).toEqual(3);     
    expect(subpanel.children[0].nodeName).toEqual("BUTTON");
    expect(subpanel.children[0].id).toEqual("createclassBtn");
    expect(subpanel.children[0].getAttribute("class")).toEqual("acctbtn");
    expect(subpanel.children[1].nodeName).toEqual("BUTTON");
    expect(subpanel.children[1].id).toEqual("removeclassBtn");
    expect(subpanel.children[1].getAttribute("class")).toEqual("acctbtn");
    expect(subpanel.children[2].nodeName).toEqual("BUTTON");
    expect(subpanel.children[2].id).toEqual("nameclassBtn");
    expect(subpanel.children[2].getAttribute("class")).toEqual("acctbtn");        
});

test('Check the createSubPanel function', () => {
    
    let panel = document.createElement("div");
    panel = DOM.createSubPanel(panel,{"class": "subpanel"},
                                    [{"id": "createclassBtn", "class": "acctbtn"}, 
                                     {"id": "removeclassBtn", "class": "acctbtn"}, 
                                     {"id": "nameclassBtn", "class": "acctbtn"}],true,{},{});
    let subpanel = panel.children[0];

    expect(panel.children.length).toEqual(1);     
    expect(panel.children[0].nodeName).toEqual("DIV");
    expect(panel.children[0].getAttribute("class")).toEqual("subpanel");
    expect(subpanel.children.length).toEqual(3);     
    expect(subpanel.children[0].nodeName).toEqual("BUTTON");
    expect(subpanel.children[0].id).toEqual("createclassBtn");
    expect(subpanel.children[0].getAttribute("class")).toEqual("acctbtn");
    expect(subpanel.children[1].nodeName).toEqual("BUTTON");
    expect(subpanel.children[1].id).toEqual("removeclassBtn");
    expect(subpanel.children[1].getAttribute("class")).toEqual("acctbtn");
    expect(subpanel.children[2].nodeName).toEqual("BUTTON");
    expect(subpanel.children[2].id).toEqual("nameclassBtn");
    expect(subpanel.children[2].getAttribute("class")).toEqual("acctbtn");  
        
    panel = DOM.createSubPanel(panel,{"class": "subpanel"},[],false, 
                                     {"id": "class_qty_label"}, 
                                     {"type": "number", "id":"inputAmt", "class":"acctinput"}); 
    
    subpanel = panel.children[1];  
    expect(panel.children.length).toEqual(2);     
    expect(panel.children[1].nodeName).toEqual("DIV");
    expect(panel.children[1].getAttribute("class")).toEqual("subpanel");
    expect(subpanel.children[0].nodeName).toEqual("P");
    expect(subpanel.children[0].id).toEqual("class_qty_label");    
    expect(subpanel.children[1].nodeName).toEqual("INPUT");
    expect(subpanel.children[1].id).toEqual("inputAmt");
    expect(subpanel.children[1].getAttribute("type")).toEqual("number");    
    expect(subpanel.children[1].getAttribute("class")).toEqual("acctinput");    
});









test('Check the PopulateApp class instantiation', () => {
    
    const app = new DOM.PopulateApp ();
    expect(app.container).toBe(null);
    expect(app.elements).toEqual({});
    expect(app.counter).toBe(1);
});

test('Check the PopulateApp class createDisplayPanel2 method', () => {
    
    const app = new DOM.PopulateApp ();
    const panel = app.createDisplayPanel();
    expect(panel.element.childNodes[0].nodeName).toEqual("LABEL");
    expect(panel.element.childNodes[0].getAttribute("id")).toEqual("activity_label");
    expect(panel.element.childNodes[0].getAttribute("class")).toEqual("highlight");
    expect(panel.element.childNodes[1].nodeName).toEqual("UL");
    expect(panel.element.childNodes[1].getAttribute("id")).toEqual("activitylist");
    expect(panel.element.childNodes[1].getAttribute("class")).toEqual("accctdisplay");    
});


test('Check the PopulateApp2 class populate method', () => {
    
    const app = new DOM.PopulateApp ();
    const container = app.populate();
    const el = document.createElement("div");
    el.append(document.createElement("div"));
    el.append(document.createElement("div"));

    expect(container).toEqual(el);
});

test('Check the PopulateApp class createDisplayPanel method', () => {
    const app = new DOM.PopulateApp ();
    const container = app.populate();
    const displaypanel = app.getElement("k1");
    const displaypanel_el = displaypanel.elment;
    expect(app.getElement("k2")).toEqual("LABEL");
    expect(displaypanel_el.childNodes[1].nodeName).toEqual("UL");
});

test('Check the PopulateApp class nextKey method', () => {
    
    const app = new DOM.PopulateApp ();
    expect(app.counter).toEqual(1);
    let k = app.nextKey();
    expect(app.counter).toEqual(2);
    expect(k).toEqual("k1");
    k = app.nextKey();
    expect(app.counter).toEqual(3);    
    expect(k).toEqual("k2");
});

test('Check the PopulateApp class getElement method', () => {
    
    const app = new DOM.PopulateApp ();
    const container = app.populate();
    let els = app.getElement("k1");
    let el = new DOM.AppElement ("k1");
    let el1 = el.getElement("div");
    expect(els).toEqual(el1);

    els = app.getElement("k2");
    el = new DOM.AppElement ("k2");
    el1 = el.getElement("div");
    expect(els).toEqual(el1);
});

test('Check the PopulateApp class appendchild method', () => {
    
    const app = new DOM.PopulateApp ();    
    let chel = app.appendchild("k3");    
    expect(chel).toEqual(null);

    const container = app.populate();
    expect(Object.keys(app.elements).length).toEqual(4);

    let parentel = app.getElement("k1").element;
    chel = app.appendchild("k1", "div");    
    expect(parentel.nodeName).toEqual("DIV");
    expect(parentel.childNodes[0].nodeName).toEqual("LABEL");
    expect(parentel.childNodes[0].getAttribute('id')).toEqual("activity_label");
    expect(parentel.childNodes[0].getAttribute('class')).toEqual("highlight");
    expect(Object.keys(app.elements).length).toEqual(5);

    chel = app.appendchild("k1", "button");
    expect(parentel.childNodes[1].nodeName).toEqual("BUTTON");
    expect(parentel.childNodes[1].getAttribute('id')).toEqual("id3");
    expect(parentel.childNodes[1].getAttribute('class')).toEqual("test");   
    expect(Object.keys(app.elements).length).toEqual(4);
});

