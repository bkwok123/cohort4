import Account, {AccountController} from './account.js'
import City from './city.js'
import CityController from './community.js'

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

   // Initialize account Items
    functions.initaccount("None");
}

const functions = {
    initcommon: () => { 
        // clocklabel.textContent = "Date: " + new Date().toLocaleDateString() + "    Time: " + new Date().toLocaleTimeString();
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
        moveinBtn.textContent = "Deposit"; 
        moveoutBtn.textContent = "Withdraw"; 
        balanceBtn.textContent = "Balance";     
    },

    initcommunity: () => {   
        page_state.currentPage = "Demographic";
        modulelabel.textContent = "Demographic";     
        class_qty_label.textContent = "Population: ";
        inputAmt.value = 0;
        credentiallabel.textContent = "";
        activity_label.textContent = "Population Movement";
        classlabel.textContent = community.name;
        active_class.textContent = "Current Location: " + "None";
        active_class.value = "None";
        createclassBtn.textContent = "Create Settlement";
        moveinBtn.textContent = "Moved In"; 
        moveoutBtn.textContent = "Moved Out"; 
        balanceBtn.textContent = "How Big";           
    },    

    createclassitem: (classID, className, balance) => {
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
        textnode = document.createTextNode("Balance: $" + balance);
        linode.setAttribute("id", className + "_li2");
        linode.appendChild(textnode);       
    },

    updateacctitem: (className, balance) => {        
        document.getElementById(className + "_li2").textContent = "Balance: $" + balance;
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
            functions.createclassitem("classgrid",classes[i].accountName,classes[i].startingBalance);
        } 
    },

    displaycitylist: (classes, listID) => {
        // Regenerate all class items within the controller
        for (let i=0; i < classes.length; i++){
            functions.createclassitem("classgrid",classes[i].name,classes[i].population);
        } 
    },    

    destoryclasslist: (listID) => {
        // Remove all class items in the display pane
        functions.eraseactivityitem(listID);     
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
                if(user.check_validacctname(className)) {
                    console.log(user.add_account(className, 0));

                    active_class.textContent = "Active Account: " + className;
                    active_class.value = className;

                    functions.eraseactivityitem("activitylist");

                    let index = user.return_index(className);
                    functions.createclassitem("classgrid",className,user.accounts[index].startingBalance);

                    // Maintain Page State
                    page_state.currentAccount = className;
                }
                else {
                    window.alert("Invalid account name, please try again.");
                }
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
                        break;

                        case "Demographic":
                            functions.destoryclasslist("classgrid");
                            functions.initcommunity();
                            functions.eraseactivityitem("activitylist");
                            functions.displaycitylist(community.citys, "classgrid");

                            // Maintain Page State
                            page_state.currentPage = "Demographic";                        
                        break;
                    }  
                } else {                 
                    if(!user.check_validacctname(className)){
                        active_class.textContent = "Active Account: " + className;
                        active_class.value = className;
        
                        let index = user.return_index(className);
                        functions.updateacctitem(className, user.accounts[index].balance());
                        functions.eraseactivityitem("activitylist");

                        // Maintain Page State
                        page_state.currentAccount = className; 
                }                                                   
            } 
        }           
      }

}));