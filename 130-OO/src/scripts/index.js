import Account from './account.js'

let savingAccount = new Account("Saving", 0);

window.onload = function() {

    inputDeposit.value = 0;
    inputWithdraw.value = 0;
    accountType.textContent = savingAccount.accountName;

}

const functions = {
    createtransactionitem: (message, transactionAmt) => {
        const linode = document.createElement("li");
        const textnode = document.createTextNode(message + transactionAmt);

        linode.appendChild(textnode);
        document.getElementById("listBalance").appendChild(linode);
    }

}


document.addEventListener('click', ((e) => {
    
    switch (e.target.textContent) {
        case "Deposit":
            
            savingAccount.deposit(inputDeposit.value);
            functions.createtransactionitem("Deposit: $", inputDeposit.value);

            console.log("Current Balance: ",savingAccount.startingBalance);
            inputDeposit.value = 0;



        break;

        case "Withdraw":            

            savingAccount.withdraw(inputWithdraw.value);
            functions.createtransactionitem("Withdraw: $", inputWithdraw.value);

            console.log("Current Balance: ",savingAccount.startingBalance);
            inputWithdraw.value = 0;

        break;

        case "Balance":
                        
            functions.createtransactionitem("Balance: $", savingAccount.balance());
            console.log("Current Balance: ",savingAccount.startingBalance);

        break;

        default:

      }

}));