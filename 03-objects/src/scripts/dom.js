import { Community } from './city.js'
import { AccountController } from './account.js'

const page_state = {
    currentAccount: "None",
    currentCity: "None",
    currentPage: "None",
    user: new AccountController("John Doe"),
    community: new Community("New Settlement"),
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
        this.updateObj = null;
    }

    getElement() {
        const panel = document.createElement("div");
        createDisplayPanel(panel);              
        this.updateObj = {label: panel.children[0], list: panel.children[1]};
        this.element = panel;
        return panel;
    }

    eraseList() {
        eraseitems (this.updateObj["list"]);
    }   

    generateList(message, qty) {
        const list = this.updateObj["list"];
        const linode = document.createElement("li");
        const textnode = document.createTextNode(message + qty);

        let count = list.childElementCount;

        // keep display log to a fixed number of items        
        if(count === 5){
            list.removeChild(list.firstElementChild);
        }
        
        // Add new log item
        linode.appendChild(textnode);
        list.appendChild(linode);        
    }     
}

class NavFooter extends AppElement {

    getElement() {
        const footer = document.createElement("footer");
        createFooter(footer);              
        this.element = footer;
        return footer;
    }
}

class AccountDisplay extends DisplayPanel {

    initElement() {
        this.updateObj["label"].textContent = "Transaction Activities";
    }    
}

class CityDisplay extends DisplayPanel {

    initElement() {
        this.updateObj["label"].textContent = "Population Movement";
    }      
}

class ControlPanel extends AppElement {

    constructor(key) {
        super(key);
        this.updateObj = null;
        this.inputObj = null;
    }

    getElement() {
        const panel = document.createElement("div");              
        const array = createControlPanel(panel);
        this.updateObj = {label: array[0], bpanel1: array[1], bpanel2: array[2], ipanel1: array[3], bpanel3: array[4]};
        this.inputObj = array[3].children[1];
        this.element = panel;
        return panel;
    }   
        
    updateLabel(msg) {
        this.updateObj["label"].textContent = msg;
    }
}

class AccountControl extends ControlPanel {

    initElement(state) {
        modulelabel.textContent = "Banking";
        credentiallabel.textContent = "Login:";
        classlabel.textContent = state["user"].accountHolder;

        this.updateObj["label"].textContent = "Active Account: " + state["currentAccount"];
        this.updateObj["bpanel1"].children[0].textContent = "Create Account";            
        this.updateObj["bpanel1"].children[1].textContent = "Remove Account";
        this.updateObj["bpanel1"].children[2].textContent = "Rename Account";
        this.updateObj["bpanel2"].children[0].textContent = "Sum Balance";
        this.updateObj["bpanel2"].children[1].textContent = "Max Balance";
        this.updateObj["bpanel2"].children[2].textContent = "Min Balance";
        this.updateObj["ipanel1"].children[0].textContent = "Amount: ";
        this.inputObj.value = 0;
        this.updateObj["bpanel3"].children[0].textContent = "Deposit";
        this.updateObj["bpanel3"].children[1].textContent = "Withdraw";
        this.updateObj["bpanel3"].children[2].textContent = "Balance";
    }
    
    updateLabel(msg) {
        this.updateObj["label"].textContent = "Active Account: " + msg;
    }    
}

class CityControl extends ControlPanel {

    initElement(state) {
        modulelabel.textContent = "Demographic";
        credentiallabel.textContent = "";
        classlabel.textContent = state["community"].name;

        this.updateObj["label"].textContent = "Current Location: " + state.currentCity;
        this.updateObj["bpanel1"].children[0].textContent = "Create Settlement";
        this.updateObj["bpanel1"].children[1].textContent = "Delete Settlement";
        this.updateObj["bpanel1"].children[2].textContent = "Show Sphere";
        this.updateObj["bpanel2"].children[0].textContent = "Sum Population";
        this.updateObj["bpanel2"].children[1].textContent = "Show Most Northern";
        this.updateObj["bpanel2"].children[2].textContent = "Show Most Southern";
        this.updateObj["ipanel1"].children[0].textContent = "Population: ";
        this.inputObj.value = 0;
        this.updateObj["bpanel3"].children[0].textContent = "Moved In";
        this.updateObj["bpanel3"].children[1].textContent = "Moved Out";
        this.updateObj["bpanel3"].children[2].textContent = "How Big"; 
    }     
    
    updateLabel(msg) {
        this.updateObj["label"].textContent = "Current Location: " + msg;
    }     
}

class Cards extends AppElement {
    removeAll() {
        eraseitems(this.element);
    }
}

class AccountCards extends Cards {

    getElement(array) {
        const panel = document.createElement("div");
        panel.setAttribute("id","classgrid");
        panel.setAttribute("class","zone blue grid-wrapper frame");
        createAccountCards (panel, array);

        this.element = panel;
        return panel;
    }

    updateAll(array) {
        eraseitems(this.element);
        createAccountCards (this.element, array);
        
        return this.element;        
    }

    addOne(name) {
        addCard(this.element, name, 0, "Balance: $");
    }

    updateOne(name, balance) {
        document.getElementById(name + "_li2").textContent = "Balance: $" + balance;
    }
}

class CityCards extends Cards {

    getElement(array) {
        const panel = document.createElement("div");
        panel.setAttribute("id","classgrid");
        panel.setAttribute("class","zone blue grid-wrapper frame");
        createCityCards (panel, array);

        this.element = panel;
        return panel;
    }

    updateAll(array) {
        eraseitems(this.element);
        createCityCards (this.element, array);
        
        return this.element;        
    }

    addOne(name) {
        addCard(this.element, name, 0, "Population: ");
    }

    updateOne(name, population) {
        document.getElementById(name + "_li2").textContent = "Population: " + population;
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

    populate() {
        const shadow = document.createElement("div");
        this.container = shadow;

        return shadow;
    }    
}

class PopulateAccountApp extends PopulateApp {

    populate() {
        const shadow = super.populate();
        const container = document.createElement("div");        
        container.setAttribute("class","container zone"); 
        shadow.append(container);

        // Create two panels (message display and control panels)
        const displayEL = new AccountDisplay ("display");
        this.elements["display"] = displayEL;
        const controlEL = new AccountControl ("control");
        this.elements["control"] = controlEL;
        const cardEL = new AccountCards ("cards");
        this.elements["cards"] = cardEL;
       
        container.append(displayEL.getElement());
        container.append(controlEL.getElement());        
                
        displayEL.initElement();
        controlEL.initElement(page_state);                
                   
        // Create cards for individual objects
        shadow.append(cardEL.getElement(page_state["user"]));

        return shadow;
    }

    createAccount() {
        let className = window.prompt("Enter Account Name: ","Saving");            
            
        if (className !== null && className !== "") {
            if(!page_state["user"].isNameExisting(className)) {
                this.elements["control"].updateLabel(className);
                this.elements["display"].eraseList();
                this.elements["cards"].addOne(className);

                // Maintain Page State
                page_state["user"].add_account(className,0);
                page_state["currentAccount"] = className;

                // Save State to the Server
                // functions.savestate();
            }
            else {
                window.alert("Invalid account name, please try again.");
            }
        }
    }

    removeAccount() {        
        if (page_state["currentAccount"] == null || page_state["currentAccount"] == "") {

            window.alert("Invalid Account to Remove.");
            return;     
        }
        else {
            if(!page_state["user"].isNameExisting(page_state["currentAccount"])) {

                window.alert("Invalid Account to Remove.");
                return;
            }
            else {
                page_state["user"].remove_account(page_state["currentAccount"]);

                // Maintain Page State
                page_state["currentAccount"] = "None";

                // Save State to the Server
                // functions.savestate();                    

                // Refresh page
                this.elements["control"].updateLabel("None");
                this.elements["display"].eraseList();
                this.elements["cards"].updateAll(page_state["user"].accounts);                 
                return; 
            }
        }        
    }

    renameAccount() {        
        if (page_state["currentAccount"] == null || page_state["currentAccount"] == "") {

            window.alert("Invalid Account to Rename.");
            return;     
        }
        else {
            if(!page_state["user"].isNameExisting(page_state["currentAccount"])) {

                window.alert("Invalid Account to Rename.");
                return;
            }
            else {
                let className = window.prompt("Enter New Name for the Account: ");

                if(!page_state["user"].isNameExisting(className)) {
                    page_state["user"].rename_account(page_state["currentAccount"], className);
                
                    // Maintain Page State
                    page_state["currentAccount"] = className;

                    // Save State to the Server
                    // functions.savestate();                        

                    // Refresh page
                    this.elements["control"].updateLabel(className);
                    this.elements["display"].eraseList();
                    this.elements["cards"].updateAll(page_state["user"].accounts); 
                    return;
                }
                else {
                    window.alert("Invalid Account to Rename.");
                    return;
                }                                                          
            }
        }     
    }

    sumBalance() {
        if (page_state["user"].accounts.length > 0) {

            this.elements["display"].generateList("Total Balance: $", page_state["user"].sum_balance());
            return;     
        }
    }

    maxBalance() {
        if (page_state["user"].accounts.length > 0) {

            this.elements["display"].generateList("Max Balance: $", page_state["user"].max_balance());
            return;     
        }
    } 
    
    minBalance() {
        if (page_state["user"].accounts.length > 0) {

            this.elements["display"].generateList("Min Balance: $", page_state["user"].min_balance());
            return;     
        }
    }
    
    deposit() {

        if(page_state["currentAccount"] !== "None"){
                
            let index = page_state["user"].return_index(page_state["currentAccount"]);
            page_state["user"].accounts[index].deposit(this.elements["control"].inputObj.value);
            this.elements["display"].generateList("Deposit: $", this.elements["control"].inputObj.value);            
            this.elements["control"].inputObj.value = 0;

            this.elements["cards"].updateOne(page_state["currentAccount"],page_state["user"].accounts[index].balance());

            // Save State to the Server
            // functions.savestate();
        }      
    }

    withdraw() {
        if(page_state["currentAccount"] !== "None"){
                
            let index = page_state["user"].return_index(page_state["currentAccount"]);
            page_state["user"].accounts[index].withdraw(this.elements["control"].inputObj.value);
            this.elements["display"].generateList("Withdraw: $", this.elements["control"].inputObj.value);            
            this.elements["control"].inputObj.value = 0;

            this.elements["cards"].updateOne(page_state["currentAccount"],page_state["user"].accounts[index].balance());

            // Save State to the Server
            // functions.savestate();
        }                 
    }
    
    balance() {
        if(page_state["currentAccount"] !== "None"){                
            let index = page_state["user"].return_index(page_state["currentAccount"]);
            this.elements["display"].generateList("Balance: $", page_state["user"].accounts[index].balance());            
        }             
    }
    
    updateCardSel(sel) {
        page_state["currentAccount"] = sel;
        this.elements["control"].updateLabel(sel);
    }
}

class PopulateCityApp extends PopulateApp {

    populate() {
        const shadow = super.populate();
        const container = document.createElement("div");        
        container.setAttribute("class","container zone"); 
        shadow.append(container);

        // Create two panels (message display and control panels)
        const displayEL = new CityDisplay ("display");
        this.elements["display"] = displayEL;
        const controlEL = new CityControl ("control");
        this.elements["control"] = controlEL;
        const cardEL = new CityCards ("cards");
        this.elements["cards"] = cardEL;
       
        container.append(displayEL.getElement());
        container.append(controlEL.getElement());        
                
        displayEL.initElement();
        controlEL.initElement(page_state);                
                   
        // // Create cards for individual objects
        shadow.append(cardEL.getElement(page_state["community"]));

        return shadow;
    }

    createSettlement() {
        let className = window.prompt("Enter Settlement Name: ","Calgary");            
            
        if (className !== null && className !== "") {

            if(!page_state["community"].isNameExisting(className)) {
                let latitude = window.prompt("Enter latitude: ", 0);
                let longitude = window.prompt("Enter longitude: ", 0);
                let population = window.prompt("Enter population: ", 0);

                this.elements["control"].updateLabel(className);
                this.elements["display"].eraseList();
                this.elements["cards"].addOne(className);

                // Maintain Page State                
                page_state["community"].createCity(className, latitude, longitude, population);
                page_state["currentCity"] = className;

                // Save State to the Server
                // functions.savestate();
            }
            else {
                window.alert("Invalid settlement name, please try again.");
            }
        }
    }

    deleteSettlement() {        
        if (page_state["currentCity"] == null || page_state["currentCity"] == "") {

            window.alert("Invalid Settlement to Remove.");
            return;     
        }
        else {
            if(!page_state["community"].isNameExisting(page_state["currentCity"])) {

                window.alert("Invalid Settlement to Remove.");
                return;
            }
            else {
                page_state["community"].deleteCity(page_state["currentCity"]);

                // Maintain Page State
                page_state["currentCity"] = "None";

                // Save State to the Server
                // functions.savestate();                    

                // Refresh page
                this.elements["control"].updateLabel("None");
                this.elements["display"].eraseList();
                this.elements["cards"].updateAll(page_state["community"].citys);                 
                return; 
            }
        }  
    }

    showSphere() {        
        if(page_state["currentCity"] !== "None"){
            this.elements["display"].generateList("In: " + page_state["community"].whichSphere(page_state["currentCity"]),"");
        }
    }

    sumPopulation() {
        if (page_state["community"].citys.length > 0) {

            this.elements["display"].generateList("Total Population: ", page_state["community"].getPopulation());
            return;     
        }
    }

    showMostNorthern() {
        if (page_state["community"].citys.length > 0) {

            this.elements["display"].generateList("Most Northern Settlement: ", page_state["community"].getMostNorthern());
            return;     
        }
    } 
    
    showMostSouthern() {
        if (page_state["community"].citys.length > 0) {

            this.elements["display"].generateList("Most Southern Settlement: ", page_state["community"].getMostSouthern());
            return;     
        }
    }
    
    movedIn() {
        if(page_state["currentCity"] !== "None"){
                
            let index = page_state["community"].return_index(page_state["currentCity"]);
            page_state["community"].citys[index].movedIn(this.elements["control"].inputObj.value);
            this.elements["display"].generateList("Moved In: ", this.elements["control"].inputObj.value);            
            this.elements["control"].inputObj.value = 0;

            this.elements["cards"].updateOne(page_state["currentCity"],page_state["community"].citys[index].population);

            // Save State to the Server
            // functions.savestate();
        }        
    }

    movedOut() {
        if(page_state["currentCity"] !== "None"){
                
            let index = page_state["community"].return_index(page_state["currentCity"]);
            page_state["community"].citys[index].movedOut(this.elements["control"].inputObj.value);
            this.elements["display"].generateList("Moved In: ", this.elements["control"].inputObj.value);            
            this.elements["control"].inputObj.value = 0;

            this.elements["cards"].updateOne(page_state["currentCity"],page_state["community"].citys[index].population);

            // Save State to the Server
            // functions.savestate();
        }                
    }
    
    howBig() {
        if(page_state["currentCity"] !== "None"){
            let index = page_state["community"].return_index(page_state["currentCity"]);                
            this.elements["display"].generateList("Classification: ", page_state["community"].citys[index].howBig());            
        }            
    }
    
    updateCardSel(sel) {
        page_state["currentCity"] = sel;
        this.elements["control"].updateLabel(sel);
    }
}

class AppsController {
    constructor() {
        this.container = null;                
        this.nav = null;
        this.apps = {};
        this.pages = {};
        this.footer = null;
        this.counter = 1;
    }

    load() {
        const shadow = document.createElement("div");
        this.container = shadow;

        const bankingApp = new PopulateAccountApp();
        const demographicApp = new PopulateCityApp();
        const footerEl = new NavFooter();
        this.apps = {Banking: bankingApp, Demographic: demographicApp};

        const banking = bankingApp.populate();
        const demographic = demographicApp.populate();
        const footer = footerEl.getElement();

        this.pages = {Banking: banking, Demographic: demographic};
        this.footer = footer;

        // shadow.append(nav);

        if (page_state["currentPage"] === "None") {   // Home Page
            shadow.append(this.pages["Banking"]);
        }
        else {
            shadow.append(this.pages[page_state["currentPage"]]);
        }

        shadow.append(footer);

        return shadow;
    }

    switchPage(page) {
        page_state["currentPage"] = page;

        console.log(page_state["currentPage"]);
        console.log(this.container.children.length);

        this.container.removeChild(this.container.firstChild);
        this.container.insertAdjacentElement('beforeend',this.pages[page_state["currentPage"]]);
        this.container.append(this.footer);
    }

    createAccount() {
        this.apps["Banking"].createAccount();
    };
    removeAccount() {
        this.apps["Banking"].removeAccount();
    };
    renameAccount() {
        this.apps["Banking"].renameAccount();
    };              
    sumBalance() {
        this.apps["Banking"].sumBalance();
    };
    maxBalance() {
        this.apps["Banking"].maxBalance();
    };
    minBalance() {
        this.apps["Banking"].minBalance();
    };
    deposit() {
        this.apps["Banking"].deposit();
    };
    withdraw() {
        this.apps["Banking"].withdraw();
    };              
    balance() {
        this.apps["Banking"].balance();
    };
    createSettlement() {
        this.apps["Demographic"].createSettlement();
    };
    deleteSettlement() {
        this.apps["Demographic"].deleteSettlement();
    };
    showSphere() {
        this.apps["Demographic"].showSphere();
    };
    sumPopulation() {
        this.apps["Demographic"].sumPopulation();
    };                
    showMostNorthern() {
        this.apps["Demographic"].showMostNorthern();
    };
    showMostSouthern() {
        this.apps["Demographic"].showMostSouthern();
    };
    movedIn() {
        this.apps["Demographic"].movedIn();
    };
    movedOut() {
        this.apps["Demographic"].movedOut();
    };                
    howBig() {
        this.apps["Demographic"].howBig();
    };

    updateCardSel(update) {
        this.apps[page_state["currentPage"]].updateCardSel(update);
    };
}

function createFooter(footer) {
    footer.setAttribute("class","zone yellow bottom-nav stickyb");
    const div = document.createElement("div");
    footer.append(div);
    let input = document.createElement("input");
    setMulAttributes(input, {type: "image", src: "./images/bank.png", alt: "Banking", class: "navbox"});
    div.append(input);    
    input = document.createElement("input");
    setMulAttributes(input, {type: "image", src: "./images/community.png", alt: "Demographic", class: "navbox"});
    div.append(input);
    return footer;
}

function createDisplayPanel(panel) {  
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
    panel.setAttribute("class","panel yellow");
    const label = document.createElement("div");          
    label.setAttribute("id","active_class");
    label.setAttribute("class","highlight");
    panel.append(label);    
    let subs = [];

    subs[0] = label;

    subs[1] = createSubPanel(panel,{"class": "subpanel"},
                                [{"id": "createclassBtn", "class": "acctbtn"}, 
                                 {"id": "removeclassBtn", "class": "acctbtn"}, 
                                 {"id": "nameclassBtn", "class": "acctbtn"}],true,{},{});
    subs[2] = createSubPanel(panel,{"class": "subpanel"},
                                [{"id": "sumBtn", "class": "acctbtn"}, 
                                 {"id": "maxBtn", "class": "acctbtn"}, 
                                 {"id": "minBtn", "class": "acctbtn"}],true,{},{});

    subs[3] = createSubPanel(panel,{"class": "subpanel"},[],false, 
                                 {"id": "class_qty_label"}, 
                                 {"type": "number", "id":"inputAmt", "class":"acctinput"});    
                                 
    subs[4] = createSubPanel(panel,{"class": "subpanel"},
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
        setMulAttributes(el,inputAttributes);
        subpanel.append(el);
        el = document.createElement("input");
        setMulAttributes(el,inputAttributes);
        subpanel.append(el);        
    }
    return subpanel;
}

function setMulAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key,attributes[key]);
    } 
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
        divnode.setAttribute("update", objName);
        divnode.setAttribute("id", objName + "_div");
        divnode.setAttribute("class", "box");
        divnode.appendChild(ulnode);
        ulnode.setAttribute("update", objName);
        ulnode.setAttribute("id", objName + "_ul");        
        ulnode.setAttribute("class", "boxul");
        ulnode.appendChild(linode);
        linode.setAttribute("update", objName);
        linode.setAttribute("id", objName + "_li1");        
        linode.appendChild(textnode);        
        linode = document.createElement("li");        
        ulnode.appendChild(linode); 
        textnode = document.createTextNode(msg + balance);
        linode.setAttribute("update", objName);
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

function eraseitems (list) {
    let count = list.childElementCount;
    if(list.hasChildNodes) {
        for (let i=0; i<count; i++) {
            list.removeChild(list.firstElementChild);                
        }
    }
}

export default { AppElement, PopulateApp , PopulateAccountApp, PopulateCityApp, DisplayPanel, ControlPanel, Cards, AppsController, createDisplayPanel, createControlPanel, 
                 createSubPanel, createButton, addCard, createAccountCards, createCityCards, eraseitems};