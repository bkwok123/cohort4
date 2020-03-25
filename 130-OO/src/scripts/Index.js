import Account, {AccountController} from './account.js'

const user = new AccountController("John Doe");

window.onload = function() {

    inputAmt.value = 0;
    userlabel.textContent = user.accountHolder;
    active_acct.textContent = "Active Account: " + "None";
    active_acct.value = "None";

}

const functions = {

    createacctitem: (acctgridID, accountName) => {
        const acctlist = document.getElementById(acctgridID);
        const divnode = document.createElement("div");
        const ulnode = document.createElement("ul");
        let linode = document.createElement("li");
        let textnode = document.createTextNode(accountName);

        let index = user.return_index(accountName);
        
        acctlist.appendChild(divnode);
        divnode.setAttribute("id", accountName + "_div");
        divnode.setAttribute("class", "box");
        divnode.appendChild(ulnode);
        ulnode.setAttribute("id", accountName + "_ul");        
        ulnode.setAttribute("class", "boxul");
        ulnode.appendChild(linode);
        linode.setAttribute("id", accountName + "_li1");        
        linode.appendChild(textnode);
        linode = document.createElement("li");        
        ulnode.appendChild(linode); 
        textnode = document.createTextNode("Balance: $" + user.accounts[index].startingBalance);
        linode.setAttribute("id", accountName + "_li2");
        linode.appendChild(textnode);       
    },

    updateacctitem: (acct_name) => {
        let index = user.return_index(acct_name);
        document.getElementById(acct_name + "_li2").textContent = "Balance: $" + user.accounts[index].balance();
    },

    createtransactionitem: (listID, message, transactionAmt) => {
        const list = document.getElementById(listID);
        const linode = document.createElement("li");
        const textnode = document.createTextNode(message + transactionAmt);

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

    erasetransactionitem: (listID) => {
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

}

document.addEventListener('click', ((e) => {
    
    switch (e.target.textContent) {
        case "Create Account":
            let accountName = window.prompt("Enter Account Name: ","Saving");
            
            if (accountName == null || accountName == "") {

                console.log("User cancel the account creation");
                return;     
            }
            else {
                if(user.check_validacctname(accountName)) {
                    console.log(user.add_account(accountName, 0));

                    active_acct.textContent = "Active Account: " + accountName;
                    active_acct.value = accountName;

                    functions.erasetransactionitem("listBalance");

                    functions.createacctitem("acctgrid",accountName)
                }
                else {
                    window.alert("Invalid account name, please try again.");
                }
            }
            
        break;

        case "Deposit":
            
            if(active_acct.value !== "None"){
                
                let index = user.return_index(active_acct.value);

                user.accounts[index].deposit(inputAmt.value);
                functions.createtransactionitem("listBalance", "Deposit: $", inputAmt.value);
    
                console.log("Current Balance: ",user.accounts[index].startingBalance);
                inputAmt.value = 0;

                functions.updateacctitem(active_acct.value);
            }
            else{
                console.log("Invalid Account: ", active_acct.value);
            }

        break;

        case "Withdraw":            

            if(active_acct.value !== "None"){

                let index = user.return_index(active_acct.value);

                user.accounts[index].withdraw(inputAmt.value);
                functions.createtransactionitem("listBalance", "Withdraw: $", inputAmt.value);
    
                console.log("Current Balance: ",user.accounts[index].startingBalance);
                inputAmt.value = 0;       
                
                functions.updateacctitem(active_acct.value);
            }
            else{
                console.log("Invalid Account: ", active_acct.value);
            }

        break;

        case "Balance":
                        
            if(active_acct.value !== "None"){
                let index = user.return_index(active_acct.value);

                functions.createtransactionitem("listBalance", "Balance: $", user.accounts[index].balance());
                console.log("Current Balance: ",user.accounts[index].startingBalance);                
            }

        break;
        
        default:

            if((e.target.id !== "")) {
                let acct_name = e.target.id;                
                let pos = acct_name.search("_");
            
                acct_name = acct_name.substring(0,pos);

                if(!user.check_validacctname(acct_name)){

                    active_acct.textContent = "Active Account: " + acct_name;
                    active_acct.value = acct_name;
    
                    functions.updateacctitem(acct_name);
                    functions.erasetransactionitem("listBalance");
                }                
            }            
      }

}));