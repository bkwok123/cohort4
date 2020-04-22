import React from 'react';
import DOM from '../components/domelement';
import { AccountController } from '../scripts/account.js'
import NET from '../scripts/netcomm.js'

class Bank extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAccount: "None",
            user: new AccountController("John Doe"),
        };
    }

    buttonClick(e) {
        let app;
        switch (e.target.alt) {
            case "Home":
                app = <Home />;
                break;            
            case "Banking":
                app = <Game />;
                break;
            case "Demographic":
                app = <Home />;
                break;
        }

        console.log("Clicke");

        this.setState({        
            activeApp: app,}
          );        
    }    

    render() {
        return (
            <div>            
                <div className="container zone">        
                    <div className="panel green">
                        <label id="activity_label" className="highlight"></label>      
                        <ul id="activitylist" className="accctdisplay"></ul>
                    </div>
                
                    <div className="panel yellow">
                        <div id="active_class" className="highlight"></div>
                        <div className="subpanel">        
                            <button type="button" id="createclassBtn" className="acctbtn"></button>
                            <button type="button" id="removeclassBtn" className="acctbtn"></button>
                            <button type="button" id="nameclassBtn" className="acctbtn"></button>        
                        </div>  
            
                        <div className="subpanel">
                            <button type="button" id="sumBtn" className="acctbtn"></button>
                            <button type="button" id="maxBtn" className="acctbtn"></button>
                            <button type="button" id="minBtn" className="acctbtn"></button>
                        </div>        
                
                        <div className="subpanel">      
                            <p id="class_qty_label"></p>
                            <input type="number" id="inputAmt" className="acctinput"></input>        
                        </div>
                
                        <div className="subpanel">
                            <button type="button" id="moveinBtn" className="acctbtn"></button>
                            <button type="button" id="moveoutBtn" className="acctbtn"></button>
                            <button type="button" id="balanceBtn" className="acctbtn"></button>        
                        </div>
                    </div>
                </div>            

                <div id="classgrid" className="zone blue grid-wrapper frame">
                </div>
            </div>
        );
    }    

    // createAccount() {
    //     let className = window.prompt("Enter Account Name: ","Saving");            
            
    //     if (className !== null && className !== "") {
    //         if(!page_state["user"].isNameExisting(className)) {
    //             this.elements["control"].updateLabel(className);
    //             this.elements["display"].eraseList();
    //             this.elements["cards"].addOne(className);

    //             // Maintain Page State
    //             page_state["user"].add_account(className,0);
    //             page_state["currentAccount"] = className;

    //             // Save State to the Server
    //             NET.putData(url, page_state);
    //         }
    //         else {
    //             window.alert("Invalid account name, please try again.");
    //         }
    //     }
    // }

    // removeAccount() {        
    //     if (page_state["currentAccount"] == null || page_state["currentAccount"] == "") {

    //         window.alert("Invalid Account to Remove.");
    //         return;     
    //     }
    //     else {
    //         if(!page_state["user"].isNameExisting(page_state["currentAccount"])) {

    //             window.alert("Invalid Account to Remove.");
    //             return;
    //         }
    //         else {
    //             page_state["user"].remove_account(page_state["currentAccount"]);

    //             // Maintain Page State
    //             page_state["currentAccount"] = "None";

    //             // Save State to the Server
    //             NET.putData(url, page_state);                    

    //             // Refresh page
    //             this.elements["control"].updateLabel("None");
    //             this.elements["display"].eraseList();
    //             this.elements["cards"].updateAll(page_state["user"].accounts);                 
    //             return; 
    //         }
    //     }        
    // }

    // renameAccount() {        
    //     if (page_state["currentAccount"] == null || page_state["currentAccount"] == "") {

    //         window.alert("Invalid Account to Rename.");
    //         return;     
    //     }
    //     else {
    //         if(!page_state["user"].isNameExisting(page_state["currentAccount"])) {

    //             window.alert("Invalid Account to Rename.");
    //             return;
    //         }
    //         else {
    //             let className = window.prompt("Enter New Name for the Account: ");

    //             if(!page_state["user"].isNameExisting(className)) {
    //                 page_state["user"].rename_account(page_state["currentAccount"], className);
                
    //                 // Maintain Page State
    //                 page_state["currentAccount"] = className;

    //                 // Save State to the Server
    //                 NET.putData(url, page_state);                        

    //                 // Refresh page
    //                 this.elements["control"].updateLabel(className);
    //                 this.elements["display"].eraseList();
    //                 this.elements["cards"].updateAll(page_state["user"].accounts); 
    //                 return;
    //             }
    //             else {
    //                 window.alert("Invalid Account to Rename.");
    //                 return;
    //             }                                                          
    //         }
    //     }     
    // }

    // sumBalance() {
    //     if (page_state["user"].accounts.length > 0) {

    //         this.elements["display"].generateList("Total Balance: $", page_state["user"].sum_balance());
    //         return;     
    //     }
    // }

    // maxBalance() {
    //     if (page_state["user"].accounts.length > 0) {

    //         this.elements["display"].generateList("Max Balance: $", page_state["user"].max_balance());
    //         return;     
    //     }
    // } 
    
    // minBalance() {
    //     if (page_state["user"].accounts.length > 0) {

    //         this.elements["display"].generateList("Min Balance: $", page_state["user"].min_balance());
    //         return;     
    //     }
    // }
    
    // deposit() {

    //     if(page_state["currentAccount"] !== "None"){
                
    //         let index = page_state["user"].return_index(page_state["currentAccount"]);
    //         page_state["user"].accounts[index].deposit(this.elements["control"].inputObj.value);
    //         this.elements["display"].generateList("Deposit: $", this.elements["control"].inputObj.value);            
    //         this.elements["control"].inputObj.value = 0;

    //         this.elements["cards"].updateOne(page_state["currentAccount"],page_state["user"].accounts[index].balance());

    //         // Save State to the Server
    //         NET.putData(url, page_state);
    //     }      
    // }

    // withdraw() {
    //     if(page_state["currentAccount"] !== "None"){
                
    //         let index = page_state["user"].return_index(page_state["currentAccount"]);
    //         page_state["user"].accounts[index].withdraw(this.elements["control"].inputObj.value);
    //         this.elements["display"].generateList("Withdraw: $", this.elements["control"].inputObj.value);            
    //         this.elements["control"].inputObj.value = 0;

    //         this.elements["cards"].updateOne(page_state["currentAccount"],page_state["user"].accounts[index].balance());

    //         // Save State to the Server
    //         NET.putData(url, page_state);
    //     }                 
    // }
    
    // balance() {
    //     if(page_state["currentAccount"] !== "None"){                
    //         let index = page_state["user"].return_index(page_state["currentAccount"]);
    //         this.elements["display"].generateList("Balance: $", page_state["user"].accounts[index].balance());            
    //     }             
    // }
    
    // updateCardSel(sel) {
    //     page_state["currentAccount"] = sel;
    //     this.elements["control"].updateLabel(sel);
    // }
}

export default { Bank };