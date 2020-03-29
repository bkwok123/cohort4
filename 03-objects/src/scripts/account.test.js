import Account, {AccountController} from './account.js'

// Reference: https://jestjs.io/docs/en/using-matchers

test('Check the account class instantiation', () => {

    const account = new Account("Checking",20)
    expect(account.accountName).toBe("Checking");
    expect(account.startingBalance).toBe(20);
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
    const obj = {"accountHolder": "John Doe", "accounts": []};
    expect(accountcontroller.accountHolder).toBe("John Doe");
    expect(accountcontroller).toEqual(obj);
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

test('Check the account class isNameExisting method', () => {

    const accountcontroller = new AccountController("John Doe")
    accountcontroller.add_account("Saving", 100);
    accountcontroller.add_account("Investment", 150);
    accountcontroller.add_account("High Interest", 200);

    expect(accountcontroller.isNameExisting("Test")).toBe(false);
    expect(accountcontroller.isNameExisting("Saving")).toBe(true);
    expect(accountcontroller.isNameExisting("Investment")).toBe(true);
    expect(accountcontroller.isNameExisting("High Interest")).toBe(true);
});

test('Check the account class return_index method', () => {

    const accountcontroller = new AccountController("John Doe")

    expect(accountcontroller.return_index("High Interest")).toBe(null);

    accountcontroller.add_account("Saving", 100);
    accountcontroller.add_account("Investment", 150);
    accountcontroller.add_account("High Interest", 200);

    expect(accountcontroller.return_index("Saving")).toBe(0);
    expect(accountcontroller.return_index("Investment")).toBe(1);
    expect(accountcontroller.return_index("High Interest")).toBe(2);

    expect(accountcontroller.return_index("Test")).toBe(null);    
});

test('Check the account class copyArray method', () => {

    let user = new AccountController ("John Doe");
    let user2 = new AccountController ("Jane J");
    let array1 = [{"accountName":"Saving","startingBalance":5000},
                  {"accountName":"Investment","startingBalance":10000},
                  {"accountName":"High Interest","startingBalance":700},
                  {"accountName":"Cheque","startingBalance":100}];
                
    user2.add_account("Saving",5000);
    user2.add_account("Investment",10000);
    user2.add_account("High Interest",700);
    user2.add_account("Cheque",100);
    expect(user.copyArray(array1)).toEqual(user2.accounts);

    user = new AccountController ("Brad");
    user2 = new AccountController ("Beth");
    array1 = [{"accountName":"ABC","startingBalance":0},
                  {"accountName":"DEF","startingBalance":54},
                  {"accountName":"HI","startingBalance":98}];   

    user2.add_account("ABC",0);
    user2.add_account("DEF",54);
    user2.add_account("HI",98);
    expect(user.copyArray(array1)).toEqual(user2.accounts);

    user = new AccountController ("Rain");
    user2 = new AccountController ("Cloud");
    array1 = [];    

    expect(user.copyArray(array1)).toEqual(user2.accounts);
});