import React from 'react';
import { AccountController } from '../scripts/account.js';
import ThemeContext from '../context/ThemeContext';
import '../CSS/Bank.css';
import NET from '../scripts/netcomm.js';

class Bank extends React.Component {

    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = {
            currentAccount: "None",
            user: new AccountController("John Doe"),
            list: [],
            card: [],
            inputAmt: 0,
            key: 0,
            otheme: this.context,
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

    componentDidUpdate() {

        if (this.state.otheme !== this.context) {
            const holder = this.state.user;   
            const cards = [];
    
            for (let i=0; i<holder.accounts.length; i++) {
                this.addCard(cards, holder.accounts[i].accountName, "Balance: $" + holder.accounts[i].startingBalance);
            }
            
            this.setState({
                card: cards,
                otheme: this.context,
             });
        }   
    }

    render() {

        return (
            <div className={`CardApp ${this.context.background}`}>            
                <div className="container zone">        
                    <div className={`panel ${this.context.panel1}`}>
                        <label className={`highlight ${this.context.glow}`}>Transaction Activities</label>      
                        <ul className="accctdisplay">
                            {this.state.list}
                        </ul>
                    </div>
                
                    <div className={`panel ${this.context.panel2}`}>
                        <label id="active_class" className={`highlight ${this.context.glow}`}>Active Account: {this.state.currentAccount}</label>
                        <div className={`subpanel ${this.context.selectChd}`}>                             
                            <button type="button" className={`spbtn1 ${this.context.btnFG}`} onClick={(e) => this.buttonClick(e)}>Create Account</button>
                            <button type="button" className={`spbtn2 ${this.context.btnFG}`} onClick={(e) => this.buttonClick(e)}>Remove Account</button>
                            <button type="button" className={`spbtn3 ${this.context.btnFG}`} onClick={(e) => this.buttonClick(e)}>Rename Account</button>        
                            <button type="button" className={`spbtn4 ${this.context.btnFG}`} onClick={(e) => this.buttonClick(e)}>Sum Balance</button>
                            <button type="button" className={`spbtn5 ${this.context.btnFG}`} onClick={(e) => this.buttonClick(e)}>Max Balance</button>
                            <button type="button" className={`spbtn6 ${this.context.btnFG}`} onClick={(e) => this.buttonClick(e)}>Min Balance</button>
                            <p className="spp1">Amount:</p>
                            <input type="number" className={`inbtn1 ${this.context.btnFG}`} value={this.state.inputAmt} onChange={(e) => this.inputChg(e)}></input>       
                            <button type="button" className={`inbtn7 ${this.context.btnFG}`} onClick={(e) => this.buttonClick(e)}>Deposit</button>
                            <button type="button" className={`inbtn8 ${this.context.btnFG}`} onClick={(e) => this.buttonClick(e)}>Withdraw</button>
                            <button type="button" className={`inbtn9 ${this.context.btnFG}`} onClick={(e) => this.buttonClick(e)}>Balance</button>                                    
                        </div>
                    </div>
                </div>            

                <div className={`zone grid-wrapper frame ${this.context.card}`}>
                    {this.state.card}
                </div>
            </div>
        );
    }    

    renderList(list, msg, key) {        
        if(list.length === 5) {
            list.shift();
        }        
        list.push(<li key={`k${key}`}>{msg}</li>);        

        return list;        
    }

    addCard(array, name, msg) {
        array.push(
            <div update={name} key={`${name}_div`} className={`box ${this.context.cardbox} ${this.context.selectSelf}`} onClick={(e) => this.cardClick(e)}>
                <ul update={name} key={`${name}_ul`}>
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
        let key = this.state.key+1;

        if (holder.accounts.length > 0) {
            this.renderList(list, "Total Balance: $" + holder.sum_balance(), key);
        }

        // Maintain Page State
        this.setState({list: list, key: key});         
    }

    maxBalance() {
        const holder = this.state.user;
        const list = this.state.list;
        let key = this.state.key+1;

        if (holder.accounts.length > 0) {
            this.renderList(list, "Max Balance: $" + holder.max_balance(), key);
        }

        // Maintain Page State
        this.setState({list: list, key: key}); 
    } 
    
    minBalance() {
        const holder = this.state.user;
        const list = this.state.list;
        let key = this.state.key+1;

        if (holder.accounts.length > 0) {
            this.renderList(list, "Min Balance: $" + holder.min_balance(), key);
        }

        // Maintain Page State
        this.setState({list: list, key: key}); 
    }
    
    deposit() {
        const holder = this.state.user;
        const currentAccount = this.state.currentAccount;
        const list = this.state.list;   
        let cards = [];  
        let key = this.state.key+1;      

        if(currentAccount !== "None"){
                
            let index = holder.return_index(currentAccount);
            holder.accounts[index].deposit(this.state.inputAmt);
            if (holder.accounts.length > 0) {
                this.renderList(list, "Deposit: $" + this.state.inputAmt, key);
            }

            for (let i=0; i<holder.accounts.length; i++) {                        
                this.addCard(cards, holder.accounts[i].accountName, "Balance: $" + holder.accounts[i].startingBalance);
            }

            // Maintain Page State
            this.setState({
                list: list,
                card: cards,
                inputAmt: 0,
                key: key,
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
        let key = this.state.key+1;  

        if(currentAccount !== "None"){
                
            let index = holder.return_index(currentAccount);
            holder.accounts[index].withdraw(this.state.inputAmt);
            if (holder.accounts.length > 0) {
                this.renderList(list, "Withdraw: $" + this.state.inputAmt, key);
            }

            for (let i=0; i<holder.accounts.length; i++) {                        
                this.addCard(cards, holder.accounts[i].accountName, "Balance: $" + holder.accounts[i].startingBalance);
            }

            // Maintain Page State
            this.setState({
                list: list,
                card: cards,
                inputAmt: 0,
                key: key,
            }); 

            // Save State to the Server
            // NET.putData(url, page_state);
        }                 
    }
    
    balance() {
        const holder = this.state.user;
        const currentAccount = this.state.currentAccount;
        const list = this.state.list;
        let key = this.state.key+1;

        if(currentAccount !== "None"){
                
            let index = holder.return_index(currentAccount);
            this.renderList(list, "Balance: $" + holder.accounts[index].balance(), key);

            // Maintain Page State
            this.setState({
                list: list,
                key: key,
            });       
        }       
    }
}

export default Bank;