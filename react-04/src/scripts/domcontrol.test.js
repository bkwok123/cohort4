import DOM from './domcontrol.js'

// Reference: https://jestjs.io/docs/en/using-matchers
test('Check the PopulateApp class instantiation', () => {
    
    const app = new DOM.PopulateApp ();
    expect(app.container).toBe(null);
    expect(app.elements).toEqual({});
    expect(app.counter).toBe(1);
});

test('Check the PopulateApp class populate method', () => {
    
    const app = new DOM.PopulateApp ();
    const container = app.populate();
    const el = document.createElement("div");
    el.append(document.createElement("div"));
    el.append(document.createElement("div"));

    expect(container).toEqual(el);
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