import Account, {AccountController} from './account.js'

test('Check the account class instantiation', () => {

    const account = new Account("Checking",20)
    console.log(account);
    console.log(account.accountName);
    console.log(account.startingBalance);
});

test('Check the account class deposit method', () => {

    const account = new Account("Saving",20)

    expect(account.deposit(10)).toBe(30);
    console.log(account.startingBalance);
    expect(account.deposit(50)).toBe(80);
    console.log(account.startingBalance);
});

test('Check the account class withdraw method', () => {

    const account = new Account("Saving",20)

    expect(account.withdraw(10)).toBe(10);
    console.log(account.startingBalance);
    expect(account.withdraw(20)).toBe(-10);
    console.log(account.startingBalance);    
});

test('Check the account class balance method', () => {

    const account = new Account("Saving",20)

    expect(account.balance()).toBe(20);
    console.log(account.startingBalance);
    expect(account.withdraw(10)).toBe(10);
    console.log(account.startingBalance);    
    expect(account.balance()).toBe(10);
    console.log(account.startingBalance);    
    expect(account.deposit(100)).toBe(110);
    console.log(account.startingBalance);        
});

test('Check the AccountController class instantiation', () => {

    const accountcontroller = new AccountController("John Doe")

    console.log(accountcontroller.accountHolder);
    console.log(accountcontroller);
});

test('Check the account class add_account method', () => {

    const accountcontroller = new AccountController("John Doe")
    
    console.log(accountcontroller.add_account("Saving", 10));
    console.log(accountcontroller.accounts[0].accountName);
    expect(accountcontroller.accounts[0].accountName).toBe("Saving");
    console.log(accountcontroller.accounts[0].startingBalance);
    expect(accountcontroller.accounts[0].startingBalance).toBe(10);

    console.log(accountcontroller.add_account("Checking", 20));
    console.log(accountcontroller.accounts[1].accountName);    
    expect(accountcontroller.accounts[1].accountName).toBe("Checking");
    console.log(accountcontroller.accounts[1].startingBalance);
    expect(accountcontroller.accounts[1].startingBalance).toBe(20);    
});

test('Check the account class remove_account method', () => {

    const accountcontroller = new AccountController("John Doe")
    
    console.log(accountcontroller.add_account("Saving", 10));
    console.log(accountcontroller.add_account("Cheque", 30));
    console.log(accountcontroller.add_account("Investment", 40));
    console.log(accountcontroller.add_account("High Interest", 50));

    console.log(accountcontroller.remove_account("Cheque"));
    expect(accountcontroller.accounts.length).toBe(3);
    expect(accountcontroller.accounts[0].accountName).toBe("Saving");
    expect(accountcontroller.accounts[1].accountName).toBe("Investment");
    expect(accountcontroller.accounts[2].accountName).toBe("High Interest");

    console.log(accountcontroller.remove_account("Saving"));
    expect(accountcontroller.accounts.length).toBe(2);
    expect(accountcontroller.accounts[0].accountName).toBe("Investment");
    expect(accountcontroller.accounts[1].accountName).toBe("High Interest");    

    console.log(accountcontroller.remove_account("High Interest"));
    expect(accountcontroller.accounts.length).toBe(1);
    expect(accountcontroller.accounts[0].accountName).toBe("Investment");
});

test('Check the account class rename_account method', () => {

    const accountcontroller = new AccountController("John Doe")
    accountcontroller.add_account("Saving", 100);
    accountcontroller.add_account("Investment", 150);
    accountcontroller.add_account("High Interest", 200);

    console.log(accountcontroller.rename_account("Investment", "Stock"));
    expect(accountcontroller.accounts[1].accountName).toBe("Stock");

    console.log(accountcontroller.rename_account("Saving", "Daily Saving"));
    expect(accountcontroller.accounts[0].accountName).toBe("Daily Saving");
});

test('Check the account class sum_balance method', () => {

    const accountcontroller = new AccountController("John Doe")
    accountcontroller.add_account("Saving", 100);
    accountcontroller.add_account("Investment", 150);
    accountcontroller.add_account("High Interest", 200);

    expect(accountcontroller.sum_balance()).toBe(450);

    accountcontroller.accounts[0].deposit(20);
    accountcontroller.accounts[1].deposit(50);
    accountcontroller.accounts[2].deposit(80);
    expect(accountcontroller.sum_balance()).toBe(600);
});

test('Check the account class max_balance method', () => {

    const accountcontroller = new AccountController("John Doe")
    accountcontroller.add_account("Saving", 100);
    accountcontroller.add_account("Investment", 150);
    accountcontroller.add_account("High Interest", 200);

    expect(accountcontroller.max_balance()).toBe(200);

    accountcontroller.accounts[1].deposit(300);
    expect(accountcontroller.max_balance()).toBe(450);
});

test('Check the account class min_balance method', () => {

    const accountcontroller = new AccountController("John Doe")
    accountcontroller.add_account("Saving", 100);
    accountcontroller.add_account("Investment", 150);
    accountcontroller.add_account("High Interest", 200);

    expect(accountcontroller.min_balance()).toBe(100);

    accountcontroller.accounts[2].withdraw(300);
    expect(accountcontroller.min_balance()).toBe(-100);    
});