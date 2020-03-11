import functions from './functions'

document.body.innerHTML =       "<div id='idDOM' class='domcontainer'>" +
                                "    <div id='idDOMcontent' class='domcontent'>" +
                                "        <h1 class='title'>Basic DOM</h1>" +        
                                "        <div>This is a list of stuff</div>" +
                                "        <ol id= 'orderedlist' class='orderedlist'>" +
                                "            <li>Item 1</li>" +
                                "            <li>Item 2</li>" +
                                "            <li>Item 3</li>" +
                                "        </ol>" +
                                "        <button id='idShow' class='inbutton'>Show</button>" +
                                "        <button id='idAdd' class='inbutton'>Add</button>" +
                                "    </div>" +
                                "</div>" +
                                "<hr>" +
                                "<h1>Working with Cards</h1>" +
                                "<div id='idRpanel' class='rpanelcontainer'>" +
                                "    <div id='idRcontent' class='panelcontent'>" +
                                "        <h1 class='title'>Right Side</h1>" +
                                "    </div>" +
                                "</div>" +
                                "<div id='idLpanel' class='lpanelcontainer'>" +
                                "    <div id='idLcontent' class='panelcontent'>" +
                                "        <button id='idAddCards' class='addcardbutton'>Add Card</button>" +
                                "    </div>" +
                                "</div>";


test('Check the add_card function', () => {

    expect(functions.add_card(1)).toBe(2);
    expect(functions.add_card(10)).toBe(11);
});

test('Check the return_parentindex function', () => {

    functions.add_card(1);
    expect(functions.return_parentindex("idAddBeforeCard 1")).toBe(7);
    functions.add_card(2);
    expect(functions.return_parentindex("idAddBeforeCard 2")).toBe(9);
    functions.add_card(3);
    expect(functions.return_parentindex("idAddBeforeCard 3")).toBe(11);
});

test('Check the addbefore_card function', () => {

    functions.add_card(1);
    expect(functions.addbefore_card(2, "idAddBeforeCard 1")).toBe(3);
    console.log(document.getElementById("idcard 2").id);
    console.log(document.getElementById("idcard 2").childElementCount);
    expect(functions.addbefore_card(3, "idAddBeforeCard 2")).toBe(4);
    console.log(document.getElementById("idcard 3").id);
    console.log(document.getElementById("idcard 3").childElementCount);    
});

test('Check the addbefore_card function', () => {

    functions.add_card(1);
    expect(functions.addafter_card(2, "idAddAfterCard 1")).toBe(3);
    console.log(document.getElementById("idcard 2").id);
    console.log(document.getElementById("idcard 2").childElementCount);
    expect(functions.addafter_card(3, "idAddAfterCard 2")).toBe(4);
    console.log(document.getElementById("idcard 3").id);
    console.log(document.getElementById("idcard 3").childElementCount);
    
    const children = document.getElementById("idLcontent").childNodes;
    const len = children.length;

    console.log("v-------------Begin-----------------v");
    for (let i = 0; i < len; i++){

        console.log(children[i].nodeName);
        console.log(children[i].id);

    }
    console.log("^---------------End-----------------^");    
});