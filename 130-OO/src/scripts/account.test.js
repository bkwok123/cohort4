import Account, {AccountController} from './account.js'

test('Check the account class instantiation', () => {

    let account = new Account("Checking",20)
    console.log(account);
    console.log(account.accountName);
    console.log(account.startingBalance);
});

test('Check the account class deposit method', () => {

    let account = new Account("Saving",20)

    expect(account.deposit(10)).toBe(30);
    console.log(account.startingBalance);
    expect(account.deposit(50)).toBe(80);
    console.log(account.startingBalance);
});

test('Check the account class withdraw method', () => {

    let account = new Account("Saving",20)

    expect(account.withdraw(10)).toBe(10);
    console.log(account.startingBalance);
    expect(account.withdraw(20)).toBe(-10);
    console.log(account.startingBalance);    
});

test('Check the account class balance method', () => {

    let account = new Account("Saving",20)

    expect(account.balance()).toBe(20);
    console.log(account.startingBalance);
    expect(account.withdraw(10)).toBe(10);
    console.log(account.startingBalance);    
    expect(account.balance()).toBe(10);
    console.log(account.startingBalance);    
    expect(account.deposit(100)).toBe(110);
    console.log(account.startingBalance);        
});

test('Check the account class balance method', () => {

    let accountcontroller = new AccountController()

    accountcontroller.test();

});