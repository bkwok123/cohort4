import Account, {AccountController} from './account.js'
import CityController from './community.js'
import display from './display.js'
import State from './maintaintstate.js'

const stateurl = 'https://api.myjson.com/bins/10cqhs';
const accturl = 'https://api.myjson.com/bins/1gqjio';
const cityurl = 'https://api.myjson.com/bins/i1mvc';

const user = new AccountController("John Doe");
const community = new CityController("New Settlement");
const page_state = {
    currentAccount: "None",
    currentCity: "None",
    currentPage: "None",
    warningMsg: "Offline Mode: Data cannot be retrieved and saved to the server"
};

window.onload = function() {

    // Initialize common Items
    functions.initcommon();
}

const functions = {
    initcommon: async () => {
        try {            
            // Retrieve saved states from remote server
            let webdata = await State.getData(stateurl);
            page_state.currentAccount = webdata.currentAccount;
            page_state.currentCity = webdata.currentCity;
            page_state.currentPage = webdata.currentPage;
            page_state.warningMsg = "";

            webdata = await State.getData(accturl);
            user.copyArray(webdata);

            webdata = await State.getData(cityurl);
            community.copyArray(webdata);

            switch(page_state.currentPage) {
                case "Banking":
                    page_state.currentPage = "Banking";
                    display.initaccount(user, page_state);
                    display.displayaccountlist(user.accounts, "classgrid");                
                break;

                case "Demographic":
                    page_state.currentPage = "Demographic";
                    display.initcommunity(community, page_state);
                    display.displaycitylist(community.citys, "classgrid");                
                break;
            }  
        } 

        catch (err) {   // cannot access online data => default to a starting page
            page_state.currentPage = "Banking";
            display.initaccount(user, page_state);
        }      
    },
    
    updatestate: () => {


    },

    savestate: () => {
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

                    display.eraseactivityitem("activitylist");

                    let index = user.return_index(className);
                    display.createclassitem("classgrid",className,user.accounts[index].startingBalance, "Balance: $");

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
                    display.destoryclasslist("classgrid");
                    display.initaccount(user, page_state);
                    display.eraseactivityitem("activitylist");
                    display.displayaccountlist(user.accounts, "classgrid");                    
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
                        display.destoryclasslist("classgrid");
                        display.initaccount(user, page_state);
                        display.eraseactivityitem("activitylist");
                        display.displayaccountlist(user.accounts, "classgrid");   

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

                display.createactivityitem("activitylist", "Total Balance: $", user.sum_balance());
                return;     
            }
            
        break;

        case "Max Balance":

            if (user.accounts.length > 0) {

                display.createactivityitem("activitylist", "Max Balance: $", user.max_balance());
                return;     
            }
            
        break;         

        case "Min Balance":

            if (user.accounts.length > 0) {

                display.createactivityitem("activitylist", "Min Balance: $", user.min_balance());
                return;     
            }
            
        break;                 

        case "Deposit":
            
            if(active_class.value !== "None"){
                
                let index = user.return_index(active_class.value);

                user.accounts[index].deposit(inputAmt.value);
                display.createactivityitem("activitylist", "Deposit: $", inputAmt.value);
    
                console.log("Current Balance: ",user.accounts[index].startingBalance);
                inputAmt.value = 0;
                
                display.updateacctitem(active_class.value, user.accounts[index].balance());             

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
                display.createactivityitem("activitylist", "Withdraw: $", inputAmt.value);
    
                console.log("Current Balance: ",user.accounts[index].startingBalance);
                inputAmt.value = 0;       
                
                display.updateacctitem(active_class.value, user.accounts[index].balance());

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

                display.createactivityitem("activitylist", "Balance: $", user.accounts[index].balance());
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

                    display.eraseactivityitem("activitylist");

                    let index = community.return_index(className2);
                    display.createclassitem("classgrid",className2,community.citys[index].population, "Population: ");

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
                    display.destoryclasslist("classgrid");
                    display.initcommunity(community, page_state);
                    display.eraseactivityitem("activitylist");
                    display.displaycitylist(community.citys, "classgrid");                    
                    return; 
                }
            }
            
        break;
        
        case "Show Sphere":

            if(page_state.currentCity !== "None"){
                let index = community.return_index(page_state.currentCity);

                display.createactivityitem("activitylist", "In: ", community.whichSphere(page_state.currentCity));
                console.log("In: ",community.whichSphere(page_state.currentCity));                
            }
            
        break;      
        
        case "Sum Population":

            if (community.citys.length > 0) {

                display.createactivityitem("activitylist", "Total Population: ", community.getPopulation());
                return;     
            }
            
        break;     
        
        case "Show Most Northern":

            if (community.citys.length > 0) {

                display.createactivityitem("activitylist", "Most Northern Settlement: ", community.getMostNorthern());
                return;     
            }
            
        break; 
        
        case "Show Most Southern":

            if (community.citys.length > 0) {

                display.createactivityitem("activitylist", "Most Southern Settlement: ", community.getMostSouthern());
                return;     
            }
            
        break;         


        case "Moved In":
            
            if(page_state.currentCity !== "None"){
                
                let index = community.return_index(page_state.currentCity);

                community.citys[index].movedIn(inputAmt.value);
                display.createactivityitem("activitylist", "Moved In: ", inputAmt.value);
    
                console.log("Current Population: ",community.citys[index].population);
                inputAmt.value = 0;
                
                display.updatecityitem(page_state.currentCity, 0, 0, community.citys[index].population);  
                
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
                display.createactivityitem("activitylist", "Moved Out: ", inputAmt.value);
    
                console.log("Current Population: ",community.citys[index].population);
                inputAmt.value = 0;
                
                display.updatecityitem(page_state.currentCity, 0, 0, community.citys[index].population);  
                
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
                
                display.createactivityitem("activitylist", "Classification: ", community.citys[index].howBig());
            }
            else{
                console.log("Invalid Settlement: ", page_state.currentCity);
            }

        break;         

        default:

            if((e.target.id !== "")) {
                let className = e.target.id;   
     
                if (className.includes("Btn")){
                    className = e.target.alt;
                    
                    switch(className) {
                        case "Banking":
                            display.destoryclasslist("classgrid");
                            display.initaccount(user, page_state);
                            display.eraseactivityitem("activitylist");
                            display.displayaccountlist(user.accounts, "classgrid");

                            // Maintain Page State
                            page_state.currentPage = "Banking";        
                            
                            // Save State to the Server
                            functions.savestate();                                   
                        break;

                        case "Demographic":
                            display.destoryclasslist("classgrid");
                            display.initcommunity(community, page_state);
                            display.eraseactivityitem("activitylist");
                            display.displaycitylist(community.citys, "classgrid");

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
                        display.updateacctitem(className, user.accounts[index].balance());
                        display.eraseactivityitem("activitylist");

                        // Maintain Page State
                        page_state.currentAccount = className; 
                    }
                    
                    if(community.isNameExisting(className)){
                        active_class.textContent = "Active Location: " + className;
                        active_class.value = className;
        
                        let index = community.return_index(className);
                        display.updatecityitem(className, 0, 0, community.citys[index].population);
                        display.eraseactivityitem("activitylist");

                        // Maintain Page State
                        page_state.currentCity = className;                              
                    }                    
                    
                } 
            }           
      }

}));