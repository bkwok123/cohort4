import Account, {AccountController} from './account.js'
import CityController from './community.js'
import State from './maintaintstate.js'

const stateurl = 'https://api.myjson.com/bins/10cqhs';
const accturl = 'https://api.myjson.com/bins/1gqjio';
const cityurl = 'https://api.myjson.com/bins/i1mvc';

const user = new AccountController("John Doe");
const community = new CityController("New Settlement");
const page_state = {
    currentAccount: "None",
    currentCity: "None",
    currentPage: "None"
};

window.onload = function() {

    // Initialize common Items
    functions.initcommon();
}

window.onbeforeunload = function() {
 
}

window.onunload = function() {
    
       
}

const functions = {
    initcommon: async () => { 
        // clocklabel.textContent = "Date: " + new Date().toLocaleDateString() + "    Time: " + new Date().toLocaleTimeString();
        // Retrieve saved states from remote server
        let webdata = await State.getData(stateurl);
        page_state.currentAccount = webdata.currentAccount;
        page_state.currentCity = webdata.currentCity;
        page_state.currentPage = webdata.currentPage;

        webdata = await State.getData(accturl);
        user.copyArray(webdata);

        webdata = await State.getData(cityurl);
        community.copyArray(webdata);

        switch(page_state.currentPage) {
            case "Banking":
                functions.initaccount(page_state.currentAccount);
                functions.displayaccountlist(user.accounts, "classgrid");                
            break;

            case "Demographic":
                functions.initcommunity(page_state.currentCity);
                functions.displaycitylist(community.citys, "classgrid");                
            break;
        }        
    },

    initaccount: (currentClass) => {        
        page_state.currentPage = "Banking";
        modulelabel.textContent = "Banking";
        class_qty_label.textContent = "Amount: ";
        inputAmt.value = 0;        
        credentiallabel.textContent = "Login:";
        activity_label.textContent = "Transaction Activities";
        classlabel.textContent = user.accountHolder;
        active_class.textContent = "Active Account: " + currentClass;
        active_class.value = currentClass;
        createclassBtn.textContent = "Create Account"; 
        removeclassBtn.textContent = "Remove Account"; 
        nameclassBtn.textContent = "Rename Account"; 
        sumBtn.textContent = "Sum Balance"; 
        maxBtn.textContent = "Max Balance"; 
        minBtn.textContent = "Min Balance";      
        moveinBtn.textContent = "Deposit"; 
        moveoutBtn.textContent = "Withdraw"; 
        balanceBtn.textContent = "Balance";     
    },

    initcommunity: (currentClass) => {   
        page_state.currentPage = "Demographic";
        modulelabel.textContent = "Demographic";     
        class_qty_label.textContent = "Population: ";
        inputAmt.value = 0;
        credentiallabel.textContent = "";
        activity_label.textContent = "Population Movement";
        classlabel.textContent = community.name;
        active_class.textContent = "Current Location: " + currentClass;
        active_class.value = currentClass;
        createclassBtn.textContent = "Create Settlement";
        removeclassBtn.textContent = "Delete Settlement"; 
        nameclassBtn.textContent = "Show Sphere"; 
        sumBtn.textContent = "Sum Population"; 
        maxBtn.textContent = "Show Most Northern"; 
        minBtn.textContent = "Show Most Southern"; 

        moveinBtn.textContent = "Moved In"; 
        moveoutBtn.textContent = "Moved Out"; 
        balanceBtn.textContent = "How Big";           
    },    

    createclassitem: (classID, className, balance, msg) => {
        const classlist = document.getElementById(classID);
        const divnode = document.createElement("div");
        const ulnode = document.createElement("ul");
        let linode = document.createElement("li");
        let textnode = document.createTextNode(className);
                
        classlist.appendChild(divnode);
        divnode.setAttribute("id", className + "_div");
        divnode.setAttribute("class", "box");
        divnode.appendChild(ulnode);
        ulnode.setAttribute("id", className + "_ul");        
        ulnode.setAttribute("class", "boxul");
        ulnode.appendChild(linode);
        linode.setAttribute("id", className + "_li1");        
        linode.appendChild(textnode);
        linode = document.createElement("li");        
        ulnode.appendChild(linode); 
        textnode = document.createTextNode(msg + balance);
        linode.setAttribute("id", className + "_li2");
        linode.appendChild(textnode);       
    },

    updateacctitem: (className, balance) => {        
        document.getElementById(className + "_li2").textContent = "Balance: $" + balance;
    },

    updatecityitem: (className, latitude, longitude, population) => {        
        document.getElementById(className + "_li2").textContent = "Population: " + population;
    },    

    createactivityitem: (listID, message, qty) => {
        const list = document.getElementById(listID);
        const linode = document.createElement("li");
        const textnode = document.createTextNode(message + qty);

        let count = list.childElementCount;
        console.log("count: ", count);

        // keep display log to a fixed number of items        
        if(count === 5){
            list.removeChild(list.firstElementChild);
        }
        
        // Add new log item
        linode.appendChild(textnode);
        list.appendChild(linode);

        console.log("list.childElementCount: ", list.childElementCount);
    },

    eraseactivityitem: (listID) => {
        const list = document.getElementById(listID);
        let count = list.childElementCount;

        console.log("list.childElementCount: ", count);
        if(list.hasChildNodes) {
            for (let i=0; i<count; i++) {
                list.removeChild(list.firstElementChild);
                
                console.log(i);
            }
        }
    },

    displayaccountlist: (classes, listID) => {
        // Regenerate all class items within the controller
        for (let i=0; i < classes.length; i++){
            functions.createclassitem("classgrid",classes[i].accountName,classes[i].startingBalance,"Balance: $");
        } 
    },

    displaycitylist: (classes, listID) => {
        // Regenerate all class items within the controller
        for (let i=0; i < classes.length; i++){
            functions.createclassitem("classgrid",classes[i].name,classes[i].population,"Population: ");
        } 
    },    

    destoryclasslist: (listID) => {
        // Remove all class items in the display pane
        functions.eraseactivityitem(listID);     
    },
    
    savestate: () => {

        console.log(page_state);
        State.putData(stateurl,page_state);
        State.putData(accturl,user.accounts);
        State.putData(cityurl,community.citys);

    },        
}

document.addEventListener('click', ((e) => {
    
    switch (e.target.textContent) {
        case "Create Account":
            let className = window.prompt("Enter Account Name: ","Saving");            
            
            if (className == null || className == "") {

                console.log("User cancel the account creation");
                return;     
            }
            else {
                if(!user.isNameExisting(className)) {
                    console.log(user.add_account(className, 0));

                    active_class.textContent = "Active Account: " + className;
                    active_class.value = className;

                    functions.eraseactivityitem("activitylist");

                    let index = user.return_index(className);
                    functions.createclassitem("classgrid",className,user.accounts[index].startingBalance, "Balance: $");

                    // Maintain Page State
                    page_state.currentAccount = className;

                    // Save State to the Server
                    functions.savestate();
                }
                else {
                    window.alert("Invalid account name, please try again.");
                }
            }
            
        break;

        case "Remove Account":

            if (page_state.currentAccount == null || page_state.currentAccount == "") {

                window.alert("Invalid Account to Remove.");
                return;     
            }
            else {
                if(!user.isNameExisting(page_state.currentAccount)) {

                    window.alert("Invalid Account to Remove.");
                    return;
                }
                else {
                    user.remove_account(page_state.currentAccount);

                    // Maintain Page State
                    page_state.currentAccount = "None";

                    // Save State to the Server
                    functions.savestate();                    

                    // Refresh page
                    functions.destoryclasslist("classgrid");
                    functions.initaccount(page_state.currentAccount);
                    functions.eraseactivityitem("activitylist");
                    functions.displayaccountlist(user.accounts, "classgrid");                    
                    return; 
                }
            }
            
        break;     
        
        case "Rename Account":

            if (page_state.currentAccount == null || page_state.currentAccount == "") {

                window.alert("Invalid Account to Rename.");
                return;     
            }
            else {
                if(!user.isNameExisting(page_state.currentAccount)) {

                    window.alert("Invalid Account to Rename.");
                    return;
                }
                else {
                    let className = window.prompt("Enter New Name for the Account: ");

                    if(!user.isNameExisting(className)) {
                        user.rename_account(page_state.currentAccount, className);
                    
                        // Maintain Page State
                        page_state.currentAccount = className;

                        // Save State to the Server
                        functions.savestate();                        
    
                        // Refresh page
                        functions.destoryclasslist("classgrid");
                        functions.initaccount(page_state.currentAccount);
                        functions.eraseactivityitem("activitylist");
                        functions.displayaccountlist(user.accounts, "classgrid");   

                        return;
                    }
                    else {
                        window.alert("Invalid Account to Rename.");
                        return;
                    }                                                          
                }
            }
            
        break;         

        case "Sum Balance":

            if (user.accounts.length > 0) {

                functions.createactivityitem("activitylist", "Total Balance: $", user.sum_balance());
                return;     
            }
            
        break;

        case "Max Balance":

            if (user.accounts.length > 0) {

                functions.createactivityitem("activitylist", "Max Balance: $", user.max_balance());
                return;     
            }
            
        break;         

        case "Min Balance":

            if (user.accounts.length > 0) {

                functions.createactivityitem("activitylist", "Min Balance: $", user.min_balance());
                return;     
            }
            
        break;                 

        case "Deposit":
            
            if(active_class.value !== "None"){
                
                let index = user.return_index(active_class.value);

                user.accounts[index].deposit(inputAmt.value);
                functions.createactivityitem("activitylist", "Deposit: $", inputAmt.value);
    
                console.log("Current Balance: ",user.accounts[index].startingBalance);
                inputAmt.value = 0;
                
                functions.updateacctitem(active_class.value, user.accounts[index].balance());             

                // Save State to the Server
                functions.savestate();
            }
            else{
                console.log("Invalid Account: ", active_class.value);
            }

        break;

        case "Withdraw":            

            if(active_class.value !== "None"){

                let index = user.return_index(active_class.value);

                user.accounts[index].withdraw(inputAmt.value);
                functions.createactivityitem("activitylist", "Withdraw: $", inputAmt.value);
    
                console.log("Current Balance: ",user.accounts[index].startingBalance);
                inputAmt.value = 0;       
                
                functions.updateacctitem(active_class.value, user.accounts[index].balance());

                // Save State to the Server
                functions.savestate();                
            }
            else{
                console.log("Invalid Account: ", active_class.value);
            }

        break;

        case "Balance":
                        
            if(active_class.value !== "None"){
                let index = user.return_index(active_class.value);

                functions.createactivityitem("activitylist", "Balance: $", user.accounts[index].balance());
                console.log("Current Balance: ",user.accounts[index].startingBalance);                
            }

        break;
        

        case "Create Settlement":
            let className2 = window.prompt("Enter Settlement Name: ","Calgary");            
            
            if (className2 == null || className2 == "") {

                console.log("User cancel the settlement creation");
                return;     
            }
            else {
                if(!community.isNameExisting(className2)) {
                    let latitude = window.prompt("Enter latitude: ", 0);
                    let longitude = window.prompt("Enter longitude: ", 0);
                    let population = window.prompt("Enter population: ", 0);
                    console.log(community.createCity (className2, Number(latitude), Number(longitude), Number(population)));

                    active_class.textContent = "Active Settlement: " + className2;
                    active_class.value = className2;

                    functions.eraseactivityitem("activitylist");

                    let index = community.return_index(className2);
                    functions.createclassitem("classgrid",className2,community.citys[index].population, "Population: ");

                    // Maintain Page State
                    page_state.currentCity = className2;

                    // Save State to the Server
                    functions.savestate();                    
                }
                else {
                    window.alert("Invalid settlement name, please try again.");
                }
            }
            
        break;        

        case "Delete Settlement":
            if (page_state.currentCity == null || page_state.currentCity == "") {

                window.alert("Invalid Settlement to Remove.");
                return;     
            }
            else {
                if(!community.isNameExisting(page_state.currentCity)) {

                    window.alert("Invalid Settlement to Remove.");
                    return;
                }
                else {
                   
                    community.deleteCity(page_state.currentCity);

                    // Maintain Page State
                    page_state.currentCity = "None";

                    // Save State to the Server
                    functions.savestate();

                    // Refresh page
                    functions.destoryclasslist("classgrid");
                    functions.initcommunity(page_state.currentCity);
                    functions.eraseactivityitem("activitylist");
                    functions.displaycitylist(community.citys, "classgrid");                    
                    return; 
                }
            }
            
        break;
        
        case "Show Sphere":

            if(page_state.currentCity !== "None"){
                let index = community.return_index(page_state.currentCity);

                functions.createactivityitem("activitylist", "In: ", community.whichSphere(page_state.currentCity));
                console.log("In: ",community.whichSphere(page_state.currentCity));                
            }
            
        break;      
        
        case "Sum Population":

            if (community.citys.length > 0) {

                functions.createactivityitem("activitylist", "Total Population: ", community.getPopulation());
                return;     
            }
            
        break;     
        
        case "Show Most Northern":

            if (community.citys.length > 0) {

                functions.createactivityitem("activitylist", "Most Northern Settlement: ", community.getMostNorthern());
                return;     
            }
            
        break; 
        
        case "Show Most Southern":

            if (community.citys.length > 0) {

                functions.createactivityitem("activitylist", "Most Southern Settlement: ", community.getMostSouthern());
                return;     
            }
            
        break;         


        case "Moved In":
            
            if(page_state.currentCity !== "None"){
                
                let index = community.return_index(page_state.currentCity);

                community.citys[index].movedIn(inputAmt.value);
                functions.createactivityitem("activitylist", "Moved In: ", inputAmt.value);
    
                console.log("Current Population: ",community.citys[index].population);
                inputAmt.value = 0;
                
                functions.updatecityitem(page_state.currentCity, 0, 0, community.citys[index].population);  
                
                // Save State to the Server
                functions.savestate();                
            }
            else{
                console.log("Invalid Settlement: ", page_state.currentCity);
            }

        break;

        case "Moved Out":
        
            if(page_state.currentCity !== "None"){
                
                let index = community.return_index(page_state.currentCity);

                community.citys[index].movedOut(inputAmt.value);
                functions.createactivityitem("activitylist", "Moved Out: ", inputAmt.value);
    
                console.log("Current Population: ",community.citys[index].population);
                inputAmt.value = 0;
                
                functions.updatecityitem(page_state.currentCity, 0, 0, community.citys[index].population);  
                
                // Save State to the Server
                functions.savestate();                
            }
            else{
                console.log("Invalid Settlement: ", page_state.currentCity);
            }

        break;   
        
        case "How Big":
        
            if(page_state.currentCity !== "None"){
                
                let index = community.return_index(page_state.currentCity);
                
                functions.createactivityitem("activitylist", "Classification: ", community.citys[index].howBig());
            }
            else{
                console.log("Invalid Settlement: ", page_state.currentCity);
            }

        break;         

        default:

            if((e.target.id !== "")) {
                let className = e.target.id;   
                let pos = className.search("-");                             
                let cmd = className.substring(pos+1,className.length);
                
                pos = className.search("_");                            
                className = className.substring(0,pos);
           
                if (cmd === "nav"){
                    switch(className) {
                        case "Banking":
                            functions.destoryclasslist("classgrid");
                            functions.initaccount(page_state.currentAccount);
                            functions.eraseactivityitem("activitylist");
                            functions.displayaccountlist(user.accounts, "classgrid");

                            // Maintain Page State
                            page_state.currentPage = "Banking";        
                            
                            // Save State to the Server
                            functions.savestate();                                   
                        break;

                        case "Demographic":
                            functions.destoryclasslist("classgrid");
                            functions.initcommunity(page_state.currentCity);
                            functions.eraseactivityitem("activitylist");
                            functions.displaycitylist(community.citys, "classgrid");

                            // Maintain Page State
                            page_state.currentPage = "Demographic";      
                            
                            // Save State to the Server
                            functions.savestate();                                
                        break;
                    }  
                } else {                 
                    if(user.isNameExisting(className)){
                        active_class.textContent = "Active Account: " + className;
                        active_class.value = className;
        
                        let index = user.return_index(className);
                        functions.updateacctitem(className, user.accounts[index].balance());
                        functions.eraseactivityitem("activitylist");

                        // Maintain Page State
                        page_state.currentAccount = className; 
                    }
                    
                    if(community.isNameExisting(className)){
                        active_class.textContent = "Active Location: " + className;
                        active_class.value = className;
        
                        let index = community.return_index(className);
                        functions.updatecityitem(className, 0, 0, community.citys[index].population);
                        functions.eraseactivityitem("activitylist");

                        // Maintain Page State
                        page_state.currentCity = className;                              
                    }                    
                    
                } 
            }           
      }

}));