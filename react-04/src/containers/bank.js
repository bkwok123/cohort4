import React from 'react';
import { AccountController } from '../scripts/account.js'
import '../CSS/Bank.css';
import NET from '../scripts/netcomm.js'

class Bank extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAccount: "None",
            user: new AccountController("John Doe"),
            list: [],
            card: [],
            inputAmt: 0,
        };
    }

    buttonClick(e) {

        switch (e.target.textContent) {
            case "Create Account":
                this.createAccount();
                break;            
            case "Remove Account":
                this.removeAccount();
                break;
            case "Rename Account":
                this.renameAccount();
                break;
            case "Sum Balance":
                this.sumBalance();                
                break;
            case "Max Balance":
                this.maxBalance();
                break;            
            case "Min Balance":
                this.minBalance();
                break;
            case "Deposit":
                this.deposit();
                break;
            case "Withdraw":
                this.withdraw();
                break;   
            case "Balance":
                this.balance();
                break;  
            default:                                                                                                                                                    
        }      
    }    
    
    inputChg (e){
        this.setState({
            inputAmt: e.target.value
          });        
    }

    cardClick(e) {
        this.setState({
            currentAccount: e.target.getAttribute("update") 
          }); 
    }    

    render() {

        return (
            <div>            
                <div className="container zone">        
                    <div className="panel green">
                        <label className="highlight">Transaction Activities</label>      
                        <ul className="accctdisplay">
                            {this.state.list}
                        </ul>
                    </div>
                
                    <div className="panel yellow">
                        <div id="active_class" className="highlight">Active Account: {this.state.currentAccount}</div>
                        <div className="subpanel">        
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Create Account</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Remove Account</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Rename Account</button>        
                        </div>  
            
                        <div className="subpanel">
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Sum Balance</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Max Balance</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Min Balance</button>
                        </div>        
                
                        <div className="subpanel">      
                            <p>Amount:</p>
                            <input type="number" className="acctinput" value={this.state.inputAmt} onChange={(e) => this.inputChg(e)}></input>       
                        </div>
                
                        <div className="subpanel">
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Deposit</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Withdraw</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Balance</button>        
                        </div>
                    </div>
                </div>            

                <div className="zone blue grid-wrapper frame">
                    {this.state.card}
                </div>
            </div>
        );
    }    

    renderList(list, msg) {        
        if(list.length === 5) {
            list.shift();
        }        
        list.push(<li>{msg}</li>);

        return list;        
    }

    addCard(array, name, msg) {
        array.push(
            <div update={name} key={`${name}_div`} className="box" onClick={(e) => this.cardClick(e)}>
                <ul update={name} key={`${name}_ul`} className="boxul">
                    <li update={name} key={`${name}_li1`}>{name}</li>
                    <li update={name} key={`${name}_li2`}>{msg}</li>
                </ul>
            </div>            
        )
    }

    createAccount() {
        const name = window.prompt("Enter Account Name: ","Saving");
        const holder = this.state.user;   
        let cards = this.state.card.slice();         
            
        if (name !== null && name !== "") {
            if(!holder.isNameExisting(name)) {

                holder.add_account(name,0);
                this.addCard(cards, name, "Balance: $" + 0);

                // Maintain Page State
                this.setState({currentAccount: name,
                               user: holder,
                               list: [],
                               card: cards,
                            });                

                // Save State to the Server
                // NET.putData(url, page_state);
            }
            else {
                window.alert("Invalid account name, please try again.");
            }
        }
    }

    removeAccount() {    
        const holder = this.state.user;
        const currentAccount = this.state.currentAccount;   
        let cards = this.state.card.slice(); 

        if (currentAccount === null || currentAccount === "") {

            window.alert("Invalid Account to Remove.");
            return;     
        }
        else {
            if(!holder.isNameExisting(currentAccount)) {

                window.alert("Invalid Account to Remove.");
                return;
            }
            else {
                holder.remove_account(currentAccount);
                cards = cards.filter(card => card.key.replace("_div","") !== currentAccount);

                // Maintain Page State
                this.setState({currentAccount: "None",
                    user: holder,
                    list: [],
                    card: cards,
                }); 

                // Save State to the Server
                // NET.putData(url, page_state);                    
                return; 
            }
        }        
    }

    renameAccount() {  
        const holder = this.state.user;
        const currentAccount = this.state.currentAccount;   
        let cards = [];

        if (currentAccount === null || currentAccount === "") {

            window.alert("Invalid Account to Rename.");
            return;     
        }
        else {
            if(!holder.isNameExisting(currentAccount)) {

                window.alert("Invalid Account to Rename.");
                return;
            }
            else {
                let name = window.prompt("Enter New Name for the Account: ");

                if(!holder.isNameExisting(name)) {
                    holder.rename_account(currentAccount, name);

                    for (let i=0; i<holder.accounts.length; i++) {                        
                        this.addCard(cards, holder.accounts[i].accountName, "Balance: $" + holder.accounts[i].startingBalance);
                    }

                    // Maintain Page State
                    this.setState({currentAccount: name,
                        user: holder,
                        list: [],
                        card: cards,
                    });    

                    // Save State to the Server
                    // NET.putData(url, page_state);                        
                    return;
                }
                else {
                    window.alert("Invalid Account to Rename.");
                    return;
                }                                                          
            }
        }     
    }

    sumBalance() {
        const holder = this.state.user;
        const list = this.state.list;

        if (holder.accounts.length > 0) {
            this.renderList(list, "Total Balance: $" + holder.sum_balance());
        }

        // Maintain Page State
        this.setState({list: list});         
    }

    maxBalance() {
        const holder = this.state.user;
        const list = this.state.list;

        if (holder.accounts.length > 0) {
            this.renderList(list, "Max Balance: $" + holder.max_balance());
        }

        // Maintain Page State
        this.setState({list: list}); 
    } 
    
    minBalance() {
        const holder = this.state.user;
        const list = this.state.list;

        if (holder.accounts.length > 0) {
            this.renderList(list, "Min Balance: $" + holder.min_balance());
        }

        // Maintain Page State
        this.setState({list: list}); 
    }
    
    deposit() {
        const holder = this.state.user;
        const currentAccount = this.state.currentAccount;
        const list = this.state.list;   
        let cards = [];        

        if(currentAccount !== "None"){
                
            let index = holder.return_index(currentAccount);
            holder.accounts[index].deposit(this.state.inputAmt);
            if (holder.accounts.length > 0) {
                this.renderList(list, "Deposit: $" + this.state.inputAmt);
            }

            for (let i=0; i<holder.accounts.length; i++) {                        
                this.addCard(cards, holder.accounts[i].accountName, "Balance: $" + holder.accounts[i].startingBalance);
            }

            // Maintain Page State
            this.setState({
                list: list,
                card: cards,
                inputAmt: 0,
            }); 

            // Save State to the Server
            // NET.putData(url, page_state);
        }      
    }

    withdraw() {
        const holder = this.state.user;
        const currentAccount = this.state.currentAccount;
        const list = this.state.list;   
        let cards = [];        

        if(currentAccount !== "None"){
                
            let index = holder.return_index(currentAccount);
            holder.accounts[index].withdraw(this.state.inputAmt);
            if (holder.accounts.length > 0) {
                this.renderList(list, "Withdraw: $" + this.state.inputAmt);
            }

            for (let i=0; i<holder.accounts.length; i++) {                        
                this.addCard(cards, holder.accounts[i].accountName, "Balance: $" + holder.accounts[i].startingBalance);
            }

            // Maintain Page State
            this.setState({
                list: list,
                card: cards,
                inputAmt: 0,
            }); 

            // Save State to the Server
            // NET.putData(url, page_state);
        }                 
    }
    
    balance() {
        const holder = this.state.user;
        const currentAccount = this.state.currentAccount;
        const list = this.state.list;   

        if(currentAccount !== "None"){
                
            let index = holder.return_index(currentAccount);
            this.renderList(list, "Balance: $" + holder.accounts[index].balance());

            // Maintain Page State
            this.setState({
                list: list,
            });       
        }       
    }
}

export default Bank;