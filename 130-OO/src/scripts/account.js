export default class Account {

    constructor(accountName, startingBalance) {

        this.accountName = accountName + " Account";
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