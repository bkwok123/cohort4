import React from 'react';
import { AccountController } from '../scripts/account.js';
import ThemeContext from '../context/ThemeContext';
import ModalBox from '../components/modalbox'
import '../CSS/CardApp.css';

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
            modalstate: {hide: true, content: ""}
        };
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
                            <button type="button" className={`spbtn1 ${this.context.btnFG}`} onClick={(e) => this.createAccount()}>Create Account</button>
                            <button type="button" className={`spbtn2 ${this.context.btnFG}`} onClick={(e) => this.removeAccount()}>Remove Account</button>
                            <button type="button" className={`spbtn3 ${this.context.btnFG}`} onClick={(e) => this.renameAccount()}>Rename Account</button>        
                            <button type="button" className={`spbtn4 ${this.context.btnFG}`} onClick={(e) => this.sumBalance()}>Sum Balance</button>
                            <button type="button" className={`spbtn5 ${this.context.btnFG}`} onClick={(e) => this.maxBalance()}>Max Balance</button>
                            <button type="button" className={`spbtn6 ${this.context.btnFG}`} onClick={(e) => this.minBalance()}>Min Balance</button>
                            <p className="spp1">Amount:</p>
                            <input type="number" className={`inbtn1 ${this.context.btnFG}`} value={this.state.inputAmt} onChange={(e) => this.inputChg(e)}></input>       
                            <button type="button" className={`inbtn7 ${this.context.btnFG}`} onClick={(e) => this.deposit()}>Deposit</button>
                            <button type="button" className={`inbtn8 ${this.context.btnFG}`} onClick={(e) => this.withdraw()}>Withdraw</button>
                            <button type="button" className={`inbtn9 ${this.context.btnFG}`} onClick={(e) => this.balance()}>Balance</button>                                    
                            <button type="button" className={`spbtn10 ${this.context.btnFG}`} onClick={(e) => this.randAccount()}>Random</button>
                        </div>
                    </div>
                </div>            

                <ModalBox
                    boxID="idModelAlert" hide={this.state.modalstate['hide']} onClickModalClose={(e) => this.modalCloseClick(e)}
                    content={this.state.modalstate['content']}
                />                                                

                <div className={`zone grid-wrapper frame ${this.context.card}`}>
                    {this.state.card}
                </div>
            </div>
        );
    }    

    modalCloseClick (e) {
        const modal = e.target.parentNode.parentNode;
        modal.setAttribute("class", "modalhide");
        e.stopPropagation();

        this.setState({
                modalstate: {hide: true, content: ""}
        });
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

    randAccount() {
        const acct = ["Investment", "High Interest", "TFSA", "RRSP", "Bit Coin", "Blockchain", "Spending"];
        const holder = this.state.user;   
        let cards = this.state.card.slice(); 

        let isAdd=false;
        let maxTry=0;
        let i=0;
        let name = acct[0];
        while((maxTry < 50) && !isAdd) {

            name = acct[i] + maxTry;

            if (!holder.isNameExisting(name)) {
                holder.add_account(name,Math.round(Math.random()*100));
                this.addCard(cards, name, "Balance: $" + Math.round(Math.random()*100));
                    
                isAdd=true;

                // Maintain Page State
                this.setState({
                    currentAccount: name,
                    user: holder,
                    list: [],
                    card: cards,
                });                                
            }

            i=maxTry%(acct.length-1);
            maxTry++;
        }

        if (!isAdd) {
            this.setState({
                modalstate: {hide: false, content: "Failed to randomly generate account, please enter it manually."}
            });
        }

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
            }
            else {               
                this.setState({
                    modalstate: {hide: false, content: "Invalid account name, please try again."}
                });                
            }
        }
    }

    removeAccount() {    
        const holder = this.state.user;
        const currentAccount = this.state.currentAccount;   
        let cards = this.state.card.slice(); 

        if (currentAccount === null || currentAccount === "") {
            this.setState({
                modalstate: {hide: false, content: "Invalid Account to Remove."}
            });            
            return;     
        }
        else {
            if(!holder.isNameExisting(currentAccount)) {                
                this.setState({
                    modalstate: {hide: false, content: "Invalid Account to Remove."}
                });                
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

                return; 
            }
        }        
    }

    renameAccount() {  
        const holder = this.state.user;
        const currentAccount = this.state.currentAccount;   
        let cards = [];

        if (currentAccount === null || currentAccount === "") {            
            this.setState({
                modalstate: {hide: false, content: "Invalid Account to Rename."}
            });            
            return;     
        }
        else {
            if(!holder.isNameExisting(currentAccount)) {
                this.setState({
                    modalstate: {hide: false, content: "Invalid Account to Rename."}
                });                
                return;                
            }
            else {
                let name = window.prompt("Enter New Name for the Account: ");

                if(!holder.isNameExisting(name) && (name !== null) && (name !== "")) {
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
                      
                    return;
                }
                else {
                    this.setState({
                        modalstate: {hide: false, content: "Invalid Account to Rename."}
                    });                    
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