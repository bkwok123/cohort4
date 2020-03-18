import Account from './account'

test('Check the account class instantiation', () => {

    let account = new Account("John Doe",20)
    console.log(account);
    console.log(account.name);
    console.log(account.balance);
});

test('Check the account class deposit method', () => {

    let account = new Account("Jane Doe",20)

    expect(account.deposit(10)).toBe(30);
    console.log(account.balance);
    expect(account.deposit(50)).toBe(80);
    console.log(account.balance);
});

test('Check the account class withdraw method', () => {

    let account = new Account("Jane Doe",20)

    expect(account.withdraw(10)).toBe(10);
    console.log(account.balance);
    expect(account.withdraw(20)).toBe(-10);
    console.log(account.balance);    
});

test('Check the account class show_balance method', () => {

    let account = new Account("Jane Doe",20)

    expect(account.show_balance()).toBe(20);
    console.log(account.balance);
    expect(account.withdraw(10)).toBe(10);
    console.log(account.balance);    
    expect(account.show_balance()).toBe(10);
    console.log(account.balance);    
    expect(account.deposit(100)).toBe(110);
    console.log(account.balance);
    
});