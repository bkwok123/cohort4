export default class Account {

    constructor(accountName, startingBalance) {

        this.accountName = accountName;
        this.startingBalance = startingBalance;
    }

    deposit(amount) {        
        
        return this.startingBalance = this.startingBalance + Number(amount);
    }

    withdraw(amount) {        
        return this.startingBalance = this.startingBalance - Number(amount);
    }

    balance() {        
        return this.startingBalance;
    }

}

export class AccountController {

    constructor(accountHolder, accounts) {

        this.accountHolder = accountHolder;
        this.accounts = [];
    }

    add_account(accountName, startingBalance) {        

        this.accounts.push(new Account(accountName, startingBalance));

        return this.accounts;
    }

    remove_account(accountName) {        
        
        for (let i=0; i<this.accounts.length; i++) {

            if(this.accounts[i].accountName === accountName) {
                this.accounts.splice(i,1);
            }            
        }

        return this.accounts;
    }

    rename_account(accountName, accountRename){
        for (let i=0; i<this.accounts.length; i++) {

            if(this.accounts[i].accountName === accountName) {
                this.accounts[i].accountName = accountRename;
            }
            
        }     
        
        return this.accounts;
    }

    isNameExisting(accountName){
        let isExisting = false;

        for (let i=0; i<this.accounts.length; i++) {

            if(this.accounts[i].accountName === accountName) {
                isExisting = true;
            }
        }     
        
        return isExisting;
    }
    
    return_index(accountName){
        return this.accounts.findIndex((element) => element.accountName === accountName);
    }    

    copyArray(array) {

        for (let i=0; i < array.length; i++) {
            this.accounts.push(new Account(array[i].accountName, array[i].startingBalance));
        }

        return this.accounts;
    }

    sum_balance () {

        return this.accounts.reduce(((total,currentAcct) => total+currentAcct.startingBalance),0);
    }

    max_balance () {

        return this.accounts.reduce(((max,currentAcct) => Math.max(max,currentAcct.startingBalance)),this.accounts[0].startingBalance);

    }

    min_balance () {

        return this.accounts.reduce(((min,currentAcct) => Math.min(min,currentAcct.startingBalance)),this.accounts[0].startingBalance);

    }    

}