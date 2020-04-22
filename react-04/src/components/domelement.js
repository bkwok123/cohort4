import React from 'react';
import '../CSS/Footer.css';
import '../CSS/Header.css';
import himg from "../images/logo.svg";
import bimg from "../images/bank.png";
import cimg from "../images/community.png";

class NavHeader extends React.Component {

    render() {
        return (
            <nav className="zone blue sticky">
                <ul className="main-nav">
                    <li>
                        <label id="modulelabel">{this.props.applabel}</label>
                    </li>   
                    <li className="sys-nav push">
                        <label id="credentiallabel">{this.props.credential}</label>
                        <label id="classlabel">{this.props.currentController}</label>
                    </li>      
                </ul>    
                
                <div className="zone red warning">
                    <label id="warninglabel">{this.props.warninglabel}</label>
                </div>      
            </nav>
        );
    }    
}

class NavFooter extends React.Component {

    render() {
        return (
            <footer className="zone yellow bottom-nav stickyb">
                <div>
                <input type="image" src={himg} alt="Home" className="navbox" disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={bimg} alt="Banking" className="navbox" disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={cimg} alt="Demographic" className="navbox" disabled={this.props.on} onClick={this.props.onClick}></input>
                </div>
            </footer>
        );
    }
}

class DisplayPanel extends React.Component {

    renderItem() {        
        const msg = this.props.msg;
        const list = msg.map((item, i) => {

            return (
                <li>{item}</li>
            );
          });

        return list;        
    }

    // eraseList() {
    //     utility.eraseitems (this.updateObj["list"]);
    // }   

    // generateList(message, qty) {
    //     const list = this.updateObj["list"];
    //     const linode = document.createElement("li");
    //     const textnode = document.createTextNode(message + qty);

    //     let count = list.childElementCount;

    //     // keep display log to a fixed number of items        
    //     if(count === 5){
    //         list.removeChild(list.firstElementChild);
    //     }
        
    //     // Add new log item
    //     linode.appendChild(textnode);
    //     list.appendChild(linode);        
    // }     

    render() {
        return (
            <div class="panel green">
                <label id="activity_label" class="highlight"></label>      
                <ul id="activitylist" class="accctdisplay"></ul>
            </div>
        );
    }
}

// class AccountDisplay extends DisplayPanel {

//     initElement() {
//         this.updateObj["label"].textContent = "Transaction Activities";
//     }    
// }

// class CityDisplay extends DisplayPanel {

//     initElement() {
//         this.updateObj["label"].textContent = "Population Movement";
//     }      
// }

// class ControlPanel extends AppElement {

//     constructor(key) {
//         super(key);
//         this.updateObj = null;
//         this.inputObj = null;
//     }

//     getElement() {
//         const panel = document.createElement("div");              
//         const array = htmlEl.createControlPanel(panel);
//         this.updateObj = {label: array[0], bpanel1: array[1], bpanel2: array[2], ipanel1: array[3], bpanel3: array[4]};
//         this.inputObj = array[3].children[1];
//         this.element = panel;
//         return panel;
//     }   
        
//     updateLabel(msg) {
//         this.updateObj["label"].textContent = msg;
//     }
// }

// class AccountControl extends ControlPanel {

//     initElement(state) {
//         this.updateObj["label"].textContent = "Active Account: " + state["currentAccount"];
//         this.updateObj["bpanel1"].children[0].textContent = "Create Account";            
//         this.updateObj["bpanel1"].children[1].textContent = "Remove Account";
//         this.updateObj["bpanel1"].children[2].textContent = "Rename Account";
//         this.updateObj["bpanel2"].children[0].textContent = "Sum Balance";
//         this.updateObj["bpanel2"].children[1].textContent = "Max Balance";
//         this.updateObj["bpanel2"].children[2].textContent = "Min Balance";
//         this.updateObj["ipanel1"].children[0].textContent = "Amount: ";
//         this.inputObj.value = 0;
//         this.updateObj["bpanel3"].children[0].textContent = "Deposit";
//         this.updateObj["bpanel3"].children[1].textContent = "Withdraw";
//         this.updateObj["bpanel3"].children[2].textContent = "Balance";
//     }
    
//     updateLabel(msg) {
//         this.updateObj["label"].textContent = "Active Account: " + msg;
//     }    
// }

// class CityControl extends ControlPanel {

//     initElement(state) {
//         this.updateObj["label"].textContent = "Current Location: " + state.currentCity;
//         this.updateObj["bpanel1"].children[0].textContent = "Create Settlement";
//         this.updateObj["bpanel1"].children[1].textContent = "Delete Settlement";
//         this.updateObj["bpanel1"].children[2].textContent = "Show Sphere";
//         this.updateObj["bpanel2"].children[0].textContent = "Sum Population";
//         this.updateObj["bpanel2"].children[1].textContent = "Show Most Northern";
//         this.updateObj["bpanel2"].children[2].textContent = "Show Most Southern";
//         this.updateObj["ipanel1"].children[0].textContent = "Population: ";
//         this.inputObj.value = 0;
//         this.updateObj["bpanel3"].children[0].textContent = "Moved In";
//         this.updateObj["bpanel3"].children[1].textContent = "Moved Out";
//         this.updateObj["bpanel3"].children[2].textContent = "How Big"; 
//     }     
    
//     updateLabel(msg) {
//         this.updateObj["label"].textContent = "Current Location: " + msg;
//     }     
// }

// class Cards extends AppElement {
//     removeAll() {
//         utility.eraseitems(this.element);
//     }
// }

// class AccountCards extends Cards {

//     getElement(array) {
//         const panel = document.createElement("div");
//         panel.setAttribute("id","classgrid");
//         panel.setAttribute("class","zone blue grid-wrapper frame");
//         utility.createAccountCards (panel, array);

//         this.element = panel;
//         return panel;
//     }

//     updateAll(array) {
//         utility.eraseitems(this.element);
//         utility.createAccountCards (this.element, array);
        
//         return this.element;        
//     }

//     addOne(name) {
//         utility.addCard(this.element, name, 0, "Balance: $");
//     }

//     updateOne(name, balance) {
//         document.getElementById(name + "_li2").textContent = "Balance: $" + balance;
//     }
// }

// class CityCards extends Cards {

//     getElement(array) {
//         const panel = document.createElement("div");
//         panel.setAttribute("id","classgrid");
//         panel.setAttribute("class","zone blue grid-wrapper frame");
//         utility.createCityCards (panel, array);

//         this.element = panel;
//         return panel;
//     }

//     updateAll(array) {
//         utility.eraseitems(this.element);
//         utility.createCityCards (this.element, array);
        
//         return this.element;        
//     }

//     addOne(name) {
//         utility.addCard(this.element, name, 0, "Population: ");
//     }

//     updateOne(name, population) {
//         document.getElementById(name + "_li2").textContent = "Population: " + population;
//     }    
// }

// const htmlEl = {

//     createControlPanel: (panel)=> {
//         panel.setAttribute("class","panel yellow");
//         const label = document.createElement("div");          
//         label.setAttribute("id","active_class");
//         label.setAttribute("class","highlight");
//         panel.append(label);    
//         let subs = [];
    
//         subs[0] = label;
    
//         subs[1] = htmlEl.createSubPanel(panel,{"class": "subpanel"},
//                                     [{"id": "createclassBtn", "class": "acctbtn"}, 
//                                      {"id": "removeclassBtn", "class": "acctbtn"}, 
//                                      {"id": "nameclassBtn", "class": "acctbtn"}],true,{},{});
//         subs[2] = htmlEl.createSubPanel(panel,{"class": "subpanel"},
//                                     [{"id": "sumBtn", "class": "acctbtn"}, 
//                                      {"id": "maxBtn", "class": "acctbtn"}, 
//                                      {"id": "minBtn", "class": "acctbtn"}],true,{},{});
    
//         subs[3] = htmlEl.createSubPanel(panel,{"class": "subpanel"},[],false, 
//                                      {"id": "class_qty_label"}, 
//                                      {"type": "number", "id":"inputAmt", "class":"acctinput"});    
                                     
//         subs[4] = htmlEl.createSubPanel(panel,{"class": "subpanel"},
//                                     [{"id": "moveinBtn", "class": "acctbtn"}, 
//                                      {"id": "moveoutBtn", "class": "acctbtn"}, 
//                                      {"id": "balanceBtn", "class": "acctbtn"}],true,{},{});
//         return subs;        
//     },

//     createSubPanel: (panel, panelAttributes, btnAttributes, isButton, labelAttributes, inputAttributes)=> {
//         const subpanel = document.createElement("div");
//         utility.setMulAttributes(subpanel,panelAttributes);
//         panel.append(subpanel);
    
//         if (isButton) {
//             utility.createButton(subpanel, btnAttributes);
//         }
//         else{
//             let el = document.createElement("p");
//             utility.setMulAttributes(el,labelAttributes);
//             subpanel.append(el);
//             el = document.createElement("input");
//             utility.setMulAttributes(el,inputAttributes);
//             subpanel.append(el);        
//         }
//         return subpanel;
//     },

//     createNav: (navbar)=> {
//         navbar.setAttribute("class","zone blue sticky");
//         let div = document.createElement("div");
//         const ul = document.createElement("ul");
//         ul.setAttribute("class","main-nav");
//         let li = document.createElement("li");
//         let label = document.createElement("label"); // modulelabel
//         navbar.appendChild(ul);
//         ul.appendChild(li);
//         li.appendChild(label);
//         li = document.createElement("li");
//         li.setAttribute("class","sys-nav push");
//         ul.appendChild(li);
//         label = document.createElement("label");
//         li.appendChild(label);                      // credentiallabel
//         label = document.createElement("label");
//         li.appendChild(label);                      // classlabel
//         div = document.createElement("div");
//         div.setAttribute("class","zone red warning");
//         navbar.appendChild(div);
//         label = document.createElement("label");    // warninglabel
//         div.appendChild(label);              
//         return navbar;
//     },    

// }

// const utility = {
//     setMulAttributes: (element, attributes)=> {
//         for (let key in attributes) {
//             element.setAttribute(key,attributes[key]);
//         } 
//     },

//     createButton: (subpanel, btnAttributes)=> {
//         {    
//             let btn;
        
//             for (let i=0; i<btnAttributes.length; i++) {
//                 btn = document.createElement("button");
        
//                 for (let key in btnAttributes[i]) {
//                     btn.setAttribute(key,btnAttributes[i][key]);
//                 }
//                 subpanel.append(btn);
//             }
        
//             return subpanel;
//         }
//     },

//     addCard: (containerdiv, objName, balance, msg)=> {
//         const divnode = document.createElement("div");
//         const ulnode = document.createElement("ul");
//         let linode = document.createElement("li");
//         let textnode = document.createTextNode(objName);

//         containerdiv.appendChild(divnode);
//         divnode.setAttribute("update", objName);
//         divnode.setAttribute("id", objName + "_div");
//         divnode.setAttribute("class", "box");
//         divnode.appendChild(ulnode);
//         ulnode.setAttribute("update", objName);
//         ulnode.setAttribute("id", objName + "_ul");        
//         ulnode.setAttribute("class", "boxul");
//         ulnode.appendChild(linode);
//         linode.setAttribute("update", objName);
//         linode.setAttribute("id", objName + "_li1");        
//         linode.appendChild(textnode);        
//         linode = document.createElement("li");        
//         ulnode.appendChild(linode); 
//         textnode = document.createTextNode(msg + balance);
//         linode.setAttribute("update", objName);
//         linode.setAttribute("id", objName + "_li2");
//         linode.appendChild(textnode); 

//         return divnode;
//     },

//     createAccountCards: (containerdiv, array)=> {
//         // Regenerate all class items within the controller
//         for (let i=0; i < array.length; i++){
//             utility.addCard(containerdiv,array[i].accountName,array[i].startingBalance,"Balance: $");
//         } 
//     },

//     createCityCards: (containerdiv, array)=> {
//         // Regenerate all class items within the controller
//         for (let i=0; i < array.length; i++){
//             utility.addCard(containerdiv,array[i].name,array[i].population,"Population: ");
//         } 
//     },

//     eraseitems: (list)=> {
//         let count = list.childElementCount;
//         if(list.hasChildNodes) {
//             for (let i=0; i<count; i++) {
//                 list.removeChild(list.firstElementChild);                
//             }
//         }
//     },
// }

// export default { AppElement, 
//                  ControlPanel, AccountControl, CityControl,
//                  DisplayPanel, AccountDisplay, CityDisplay, 
//                  Cards, AccountCards, CityCards, 
//                  NavFooter, NavHeader, htmlEl, utility};

export default {NavHeader, NavFooter};