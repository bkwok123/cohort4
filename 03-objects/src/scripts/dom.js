import City from './city.js'
import CityController from './community.js'
import Account, {AccountController} from './account.js'

// const user = new AccountController("John Doe");
// const community = new CityController("New Settlement");

const page_state = {
    currentAccount: "None",
    currentCity: "None",
    currentPage: "None",
    user: new AccountController("John Doe"),
    community: new CityController("New Settlement"),
    warningMsg: "Offline Mode: Data cannot be retrieved and saved to the server"
};

class AppElement {

    constructor(key) {
        this.key = key;
        this.element = null;
    }

    getElement(type) {
        const el = document.createElement(type);
        this.element = el;   
        return el;
    }    
}

class DisplayPanel extends AppElement {

    constructor(key) {
        super(key);
        this.updateElement = null;
    }

    getElement() {
        const panel = document.createElement("div");              
        this.updateElement = createDisplayPanel(panel);   
        this.element = panel;
        return panel;
    }

    initElement() {
        this.element.children[0].textContent = "Transaction Activities";
    }
}

class ControlPanel extends AppElement {

    constructor(key) {
        super(key);
        this.updateArray = null;
    }

    getElement() {
        const panel = document.createElement("div");              
        this.updateArray = createControlPanel(panel);   
        this.element = panel;
        return panel;
    }   

    initElement(state,isAccounts) {

        if (isAccounts) {
            modulelabel.textContent = "Banking";
            credentiallabel.textContent = "Login:";
            classlabel.textContent = state["user"].accountHolder;
    
            this.element.children[0].textContent = "Active Account: " + state["currentAccount"];
            this.updateArray[0].children[0].textContent = "Create Account";            
            this.updateArray[0].children[1].textContent = "Remove Account";
            this.updateArray[0].children[2].textContent = "Rename Account";
            this.updateArray[1].children[0].textContent = "Sum Balance";
            this.updateArray[1].children[1].textContent = "Max Balance";
            this.updateArray[1].children[2].textContent = "Min Balance";
            this.updateArray[2].children[0].textContent = "Amount: ";
            this.updateArray[2].children[1].value = 0;
            this.updateArray[3].children[0].textContent = "Deposit";
            this.updateArray[3].children[1].textContent = "Withdraw";
            this.updateArray[3].children[2].textContent = "Balance";
        }
        else {
            modulelabel.textContent = "Demographic";
            credentiallabel.textContent = "";
            classlabel.textContent = state["community"].name;
    
            this.element.children[0].textContent = "Current Location: " + state.currentCity;
            this.updateArray[0].children[0].textContent = "Create Settlement";
            this.updateArray[0].children[1].textContent = "Delete Settlement";
            this.updateArray[0].children[2].textContent = "Show Sphere";
            this.updateArray[1].children[0].textContent = "Sum Population";
            this.updateArray[1].children[1].textContent = "Show Most Northern";
            this.updateArray[1].children[2].textContent = "Show Most Southern";
            this.updateArray[2].children[0].textContent = "Population: ";
            this.updateArray[2].children[1].value = 0;
            this.updateArray[3].children[0].textContent = "Moved In";
            this.updateArray[3].children[1].textContent = "Moved Out";
            this.updateArray[3].children[2].textContent = "How Big";                       
        }
    }       
}

class Cards extends AppElement {

    getElement(array, isAccounts) {
        const panel = createCards(array, isAccounts);             
        this.element = panel;
        return panel;
    }

    removeAll() {
        eraseitems(this.element);
    }
    
    updateAll(array, isAccounts) {
        eraseitems(this.element);
        const panel = createCards(array, isAccounts);             
        this.element = panel;
        return panel;        
    }
}

class PopulateApp {

    constructor() {
        this.container = null;
        this.elements = {};
        this.counter = 1;
    }

    nextKey() {
        return `k${this.counter++}`;
    }

    getElement(theKey) {
        return this.elements[theKey];
    }

    // Create two panels (message display and control panels)
    populate() {

        const shadow = document.createElement("div");
        const container = document.createElement("div");        
        container.setAttribute("class","container zone"); 
        shadow.append(container);
        this.container = shadow;

        // Create main panels
        let key = this.nextKey();
        const displayEL = new DisplayPanel (key);
        this.elements[key] = displayEL;
        key = this.nextKey();
        const controlEL = new ControlPanel (key);
        this.elements[key] = controlEL;
        key = this.nextKey();
        const cardEL = new Cards (key);
        key = this.nextKey(cardEL);

        const dpanel = displayEL.getElement();
        const cpanel = controlEL.getElement(); 
        const cards = cardEL.getElement(page_state["user"],true);        
        container.append(dpanel);
        container.append(cpanel);        
                
        displayEL.initElement();
        controlEL.initElement(page_state,true);

        // Create cards for individual objects
        shadow.append(cards);

        return shadow;
    }
}

function createDisplayPanel(panel) {  
    // const panel = document.createElement("div");      
    panel.setAttribute("class","panel green");
    const label = document.createElement("label");             
    label.setAttribute("id","activity_label");
    label.setAttribute("class","highlight");
    panel.append(label);
    const list = document.createElement("ul");     
    list.setAttribute("id","activitylist");
    list.setAttribute("class","accctdisplay");
    panel.append(list);
    return list;
}

function createControlPanel(panel) {  
    // let panel = document.createElement("div");      
    panel.setAttribute("class","panel yellow");
    const label = document.createElement("div");          
    label.setAttribute("id","active_class");
    label.setAttribute("class","highlight");
    panel.append(label);    
    let subs = [];

    subs[0] = createSubPanel(panel,{"class": "subpanel"},
                                [{"id": "createclassBtn", "class": "acctbtn"}, 
                                 {"id": "removeclassBtn", "class": "acctbtn"}, 
                                 {"id": "nameclassBtn", "class": "acctbtn"}],true,{},{});
    subs[1] = createSubPanel(panel,{"class": "subpanel"},
                                [{"id": "sumBtn", "class": "acctbtn"}, 
                                 {"id": "maxBtn", "class": "acctbtn"}, 
                                 {"id": "minBtn", "class": "acctbtn"}],true,{},{});

    subs[2] = createSubPanel(panel,{"class": "subpanel"},[],false, 
                                 {"id": "class_qty_label"}, 
                                 {"type": "number", "id":"inputAmt", "class":"acctinput"});    
                                 
    subs[3] = createSubPanel(panel,{"class": "subpanel"},
                                [{"id": "moveinBtn", "class": "acctbtn"}, 
                                 {"id": "moveoutBtn", "class": "acctbtn"}, 
                                 {"id": "balanceBtn", "class": "acctbtn"}],true,{},{});
    return subs;
}

function createSubPanel(panel, panelAttributes, btnAttributes, isButton, labelAttributes, inputAttributes) {

    const subpanel = document.createElement("div");
    for (let key in panelAttributes) {
        subpanel.setAttribute(key,panelAttributes[key]);
    }
    panel.append(subpanel);

    if (isButton) {
        createButton(subpanel, btnAttributes);
    }
    else{
        let el = document.createElement("p");
        for (let key in labelAttributes) {
            el.setAttribute(key,labelAttributes[key]);
        }        
        subpanel.append(el);
        el = document.createElement("input");
        for (let key in inputAttributes) {
            el.setAttribute(key,inputAttributes[key]);
        }             
        subpanel.append(el);        
    }
    return subpanel;
}

function createButton(subpanel, btnAttributes) {    
    let btn;

    for (let i=0; i<btnAttributes.length; i++) {
        btn = document.createElement("button");

        for (let key in btnAttributes[i]) {
            btn.setAttribute(key,btnAttributes[i][key]);
        }
        subpanel.append(btn);
    }

    return subpanel;
}

function addCard(containerdiv, objName, balance, msg) {
        const divnode = document.createElement("div");
        const ulnode = document.createElement("ul");
        let linode = document.createElement("li");
        let textnode = document.createTextNode(objName);

        containerdiv.appendChild(divnode);
        divnode.setAttribute("id", objName + "_div");
        divnode.setAttribute("class", "box");
        divnode.appendChild(ulnode);
        ulnode.setAttribute("id", objName + "_ul");        
        ulnode.setAttribute("class", "boxul");
        ulnode.appendChild(linode);
        linode.setAttribute("id", objName + "_li1");        
        linode.appendChild(textnode);
        linode = document.createElement("li");        
        ulnode.appendChild(linode); 
        textnode = document.createTextNode(msg + balance);
        linode.setAttribute("id", objName + "_li2");
        linode.appendChild(textnode); 

        return divnode;
}

function createAccountCards (containerdiv, array) {
    // Regenerate all class items within the controller
    for (let i=0; i < array.length; i++){
        addCard(containerdiv,array[i].accountName,array[i].startingBalance,"Balance: $");
    } 
}

function createCityCards (containerdiv, array) {
    // Regenerate all class items within the controller
    for (let i=0; i < array.length; i++){
        addCard(containerdiv,array[i].name,array[i].population,"Population: ");
    } 
}

function createCards(array, isAccounts) {

    const div = document.createElement("div");      
    div.setAttribute("id","classgrid");
    div.setAttribute("class","zone blue grid-wrapper frame");

    if (isAccounts) {
        createAccountCards (div, array);
    }
    else {
        createCityCards (div, array);
    }

    return div;
}

function updateAccountCard (objName, balance) {        
    document.getElementById(objName + "_li2").textContent = "Balance: $" + balance;
}

function updateCityCard (objName, latitude, longitude, population) {        
    document.getElementById(objName + "_li2").textContent = "Population: " + population;
}

function eraseitems (list) {
    let count = list.childElementCount;

    if(list.hasChildNodes) {
        for (let i=0; i<count; i++) {
            list.removeChild(list.firstElementChild);                
        }
    }
}

export default { AppElement, PopulateApp , DisplayPanel, ControlPanel, Cards, createDisplayPanel, createControlPanel, 
                 createCards, createSubPanel, createButton, addCard, createAccountCards, createCityCards, eraseitems};