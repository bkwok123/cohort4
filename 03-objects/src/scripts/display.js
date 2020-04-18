import Account, {AccountController} from './account.js'
import CityController from './community.js'

const functions = {
    initaccount: (user, state) => {          
        modulelabel.textContent = "Banking";
        class_qty_label.textContent = "Amount: ";
        inputAmt.value = 0;        
        credentiallabel.textContent = "Login:";
        activity_label.textContent = "Transaction Activities";
        classlabel.textContent = user.accountHolder;       
        active_class.textContent = "Active Account: " + state.currentAccount;
        active_class.value = state.currentAccount;
        createclassBtn.textContent = "Create Account"; 
        removeclassBtn.textContent = "Remove Account"; 
        nameclassBtn.textContent = "Rename Account"; 
        sumBtn.textContent = "Sum Balance"; 
        maxBtn.textContent = "Max Balance"; 
        minBtn.textContent = "Min Balance";      
        moveinBtn.textContent = "Deposit"; 
        moveoutBtn.textContent = "Withdraw"; 
        balanceBtn.textContent = "Balance";     
        warninglabel.textContent =  state.warningMsg;
    },

    initcommunity: (community, state) => {           
        modulelabel.textContent = "Demographic";     
        class_qty_label.textContent = "Population: ";
        inputAmt.value = 0;
        credentiallabel.textContent = "";
        activity_label.textContent = "Population Movement";
        classlabel.textContent = community.name;
        active_class.textContent = "Current Location: " + state.currentCity;
        active_class.value = state.currentCity;
        createclassBtn.textContent = "Create Settlement";
        removeclassBtn.textContent = "Delete Settlement"; 
        nameclassBtn.textContent = "Show Sphere"; 
        sumBtn.textContent = "Sum Population"; 
        maxBtn.textContent = "Show Most Northern"; 
        minBtn.textContent = "Show Most Southern"; 

        moveinBtn.textContent = "Moved In"; 
        moveoutBtn.textContent = "Moved Out"; 
        balanceBtn.textContent = "How Big";      
        warninglabel.textContent =  state.warningMsg;     
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

        // keep display log to a fixed number of items        
        if(count === 5){
            list.removeChild(list.firstElementChild);
        }
        
        // Add new log item
        linode.appendChild(textnode);
        list.appendChild(linode);
    },

    eraseactivityitem: (listID) => {
        const list = document.getElementById(listID);
        let count = list.childElementCount;

        console.log("list.childElementCount: ", count);
        if(list.hasChildNodes) {
            for (let i=0; i<count; i++) {
                list.removeChild(list.firstElementChild);                
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
}



export default functions;