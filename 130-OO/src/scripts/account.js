export default class Account {

    constructor(name, balance) {

        this.name = name;
        this.balance = balance;
    }

    deposit(deposit_amt) {        
        
        return this.balance = this.balance + deposit_amt;
    }

    withdraw(withdraw_amt) {        
        return this.balance = this.balance - withdraw_amt;
    }

    show_balance() {        
        return this.balance;
    }

}