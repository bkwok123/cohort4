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

    // console.log(document.getElementById("idShow").childNodes);
    expect(functions.add_card(1)).toBe(2);
    expect(functions.add_card(10)).toBe(11);
});