import { Community } from './city.js'
import { AccountController } from './account.js'
import DOM from '../components/domelement.js'
import NET from '../scripts/netcomm.js'

const url = 'https://api.myjson.com/bins/10cqhs';

const page_state = {
    currentAccount: "None",
    currentCity: "None",
    currentPage: "None",
    user: new AccountController("John Doe"),
    community: new Community("New Settlement"),
    warningMsg: ""
};

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
        const displayEL = new DOM.AccountDisplay ("display");
        this.elements["display"] = displayEL;
        const controlEL = new DOM.AccountControl ("control");
        this.elements["control"] = controlEL;
        const cardEL = new DOM.AccountCards ("cards");
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
                NET.putData(url, page_state);
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
                NET.putData(url, page_state);                    

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
                    NET.putData(url, page_state);                        

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
            NET.putData(url, page_state);
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
            NET.putData(url, page_state);
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
        const displayEL = new DOM.CityDisplay ("display");
        this.elements["display"] = displayEL;
        const controlEL = new DOM.CityControl ("control");
        this.elements["control"] = controlEL;
        const cardEL = new DOM.CityCards ("cards");
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
                NET.putData(url, page_state);
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
                NET.putData(url, page_state);                    

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
            NET.putData(url, page_state);
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
            NET.putData(url, page_state);
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
        const footerEl = new DOM.NavFooter();
        const navEl = new DOM.NavHeader();
        this.apps = {Banking: bankingApp, Demographic: demographicApp};

        const banking = bankingApp.populate();
        const demographic = demographicApp.populate();
        const footer = footerEl.getElement();
        const nav = navEl.getElement();

        this.nav = navEl;
        this.pages = {Banking: banking, Demographic: demographic};
        this.footer = footerEl;

        shadow.append(nav);
        
        // Create a temporary app
        navEl.updateWarning("Connecting... Please wait.");
        shadow.append(document.createElement("div"));
        this.footer.disable();
        shadow.append(footer);

        return shadow;
    }

    async refresh() {
        const shadow = this.container;
        const navEl = this.nav;

        // Remove the temporary app
        shadow.removeChild(shadow.children[1]);

        try {            
            // Retrieve saved states from remote server
            let wait = setTimeout(()=>{
                try {
                        clearTimeout(wait);
                        throw("Timeout2");
                    }
        
                catch (err) {
                    clearTimeout(wait);

                    page_state["warningMsg"] = "Offline Mode: Data cannot be retrieved and saved to the server";

                    // Load default home page                    
                    shadow.insertAdjacentElement('beforeend',this.pages["Banking"]);
                    page_state["currentPage"] = "Banking";
                    navEl.updateAppLabel("Banking");
                    navEl.updateWarning(page_state["warningMsg"]);
                    this.footer.enable();
                    shadow.append(this.footer.element);                                
                }
            }, 1000);

            const webdata = await NET.getData(url);            
            page_state["currentAccount"] = webdata.currentAccount;
            page_state["currentCity"] = webdata.currentCity;
            page_state["currentPage"] = webdata.currentPage;
            page_state["warningMsg"] = webdata.warningMsg;
            page_state["user"].copyArray(webdata);
            page_state["community"].copyArray(webdata);

            shadow.insertAdjacentElement('beforeend',this.pages[page_state["currentPage"]]);
            navEl.updateAppLabel(page_state["currentPage"]);
            this.footer.enable();
            shadow.append(this.footer.element);                       
        }  
         
        catch (err) {   // cannot access online data => default to a starting page (handled by timeout)
            console.log("Error: ", err); 
        }         
    }    

    switchPage(page) {
        page_state["currentPage"] = page;

        this.nav.updateAppLabel(page);
        this.container.removeChild(this.container.children[1]);
        this.container.insertAdjacentElement('beforeend',this.pages[page_state["currentPage"]]);        
        this.container.append(this.footer.element);
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

export default { PopulateApp , PopulateAccountApp, PopulateCityApp, AppsController };