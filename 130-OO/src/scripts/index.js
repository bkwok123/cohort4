import Account from './account.js'

let savingAccount = new Account("Saving", 0);

window.onload = function() {

    // inputDeposit.value = 0;
    inputAmt.value = 0;
    accountType.textContent = savingAccount.accountName;

}

const functions = {
    createtransactionitem: (listID, message, transactionAmt) => {
        const list = document.getElementById(listID);
        const linode = document.createElement("li");
        const textnode = document.createTextNode(message + transactionAmt);

        // Add new log item
        linode.appendChild(textnode);
        list.appendChild(linode);

        // keep display log to a fixed number of items
        if(list.childElementCount > 5){
            list.removeChild(list.childNodes[0]);
        }

    }

}


document.addEventListener('click', ((e) => {
    
    switch (e.target.textContent) {
        case "Deposit":
            
            savingAccount.deposit(inputAmt.value);
            functions.createtransactionitem("listBalance", "Deposit: $", inputAmt.value);

            console.log("Current Balance: ",savingAccount.startingBalance);
            inputAmt.value = 0;



        break;

        case "Withdraw":            

            savingAccount.withdraw(inputAmt.value);
            functions.createtransactionitem("listBalance", "Withdraw: $", inputAmt.value);

            console.log("Current Balance: ",savingAccount.startingBalance);
            inputAmt.value = 0;

        break;

        case "Balance":
                        
            functions.createtransactionitem("listBalance", "Balance: $", savingAccount.balance());
            console.log("Current Balance: ",savingAccount.startingBalance);

        break;

        default:

      }

}));