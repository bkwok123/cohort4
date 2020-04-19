function createDisplayPanel() {  
    const panel = document.createElement("div");      
    panel.setAttribute("class","panel green");
    const label = document.createElement("label");             
    label.setAttribute("id","activity_label");
    label.setAttribute("class","highlight");
    panel.append(label);
    const list = document.createElement("ul");     
    list.setAttribute("id","activitylist");
    list.setAttribute("class","accctdisplay");
    panel.append(list);
    return panel;
}

function createControlPanel() {  
    let panel = document.createElement("div");      
    panel.setAttribute("class","panel yellow");
    const label = document.createElement("div");          
    label.setAttribute("id","active_class");
    label.setAttribute("class","highlight");
    panel.append(label);    

    panel = createSubPanel(panel,{"class": "subpanel"},
                                [{"id": "createclassBtn", "class": "acctbtn"}, 
                                 {"id": "removeclassBtn", "class": "acctbtn"}, 
                                 {"id": "nameclassBtn", "class": "acctbtn"}],true,{},{});
    panel = createSubPanel(panel,{"class": "subpanel"},
                                [{"id": "sumBtn", "class": "acctbtn"}, 
                                 {"id": "maxBtn", "class": "acctbtn"}, 
                                 {"id": "minBtn", "class": "acctbtn"}],true,{},{});

    panel = createSubPanel(panel,{"class": "subpanel"},[],false, 
                                 {"id": "class_qty_label"}, 
                                 {"type": "number", "id":"inputAmt", "class":"acctinput"});    
                                 
    panel = createSubPanel(panel,{"class": "subpanel"},
                                [{"id": "moveinBtn", "class": "acctbtn"}, 
                                 {"id": "moveoutBtn", "class": "acctbtn"}, 
                                 {"id": "balanceBtn", "class": "acctbtn"}],true,{},{});
    return panel;
}

function createSubPanel(panel, panelAttributes, btnAttributes, isButton, labelAttributes, inputAttributes) {

    const subpanel = document.createElement("div");
    for (let key in panelAttributes) {
        subpanel.setAttribute(key,panelAttributes[key]);
    }
    panel.append(subpanel);

    if (isButton) {
        createButton(subpanel, btnAttributes);
    }
    else{
        let el = document.createElement("p");
        for (let key in labelAttributes) {
            el.setAttribute(key,labelAttributes[key]);
        }        
        subpanel.append(el);
        el = document.createElement("input");
        for (let key in inputAttributes) {
            el.setAttribute(key,inputAttributes[key]);
        }             
        subpanel.append(el);        
    }
    return panel;
}

function createButton(subpanel, btnAttributes) {    
    let btn;

    for (let i=0; i<btnAttributes.length; i++) {
        btn = document.createElement("button");

        for (let key in btnAttributes[i]) {
            btn.setAttribute(key,btnAttributes[i][key]);
        }
        subpanel.append(btn);
    }

    return subpanel;
}

function createCard(array, type) {

    const div = document.createElement("div");      
    div.setElementAttribute("id","classgrid");
    div.setElementAttribute("class","zone blue grid-wrapper frame");


    for (let i=0; i < array.length; i++) {
        // get classname, balance and msg from account or city
        // const divnode = document.createElement("div");
        // const ulnode = document.createElement("ul");
        // let linode = document.createElement("li");
        // let textnode = document.createTextNode(className);

        // div.appendChild(divnode);
        // divnode.setAttribute("id", className + "_div");
        // divnode.setAttribute("class", "box");
        // divnode.appendChild(ulnode);
        // ulnode.setAttribute("id", className + "_ul");        
        // ulnode.setAttribute("class", "boxul");
        // ulnode.appendChild(linode);
        // linode.setAttribute("id", className + "_li1");        
        // linode.appendChild(textnode);
        // linode = document.createElement("li");        
        // ulnode.appendChild(linode); 
        // textnode = document.createTextNode(msg + balance);
        // linode.setAttribute("id", className + "_li2");
        // linode.appendChild(textnode);        
    }    

    return div;
}

class AppElement {

    constructor(key) {
        this.key = key;
        this.element = null;
    }

    getElement(type) {
        const el = document.createElement(type);
        this.element = el;   
        return el;
    }    

    setElementAttribute(attr, attrvalue) {
        const el = this.element;
        el.setAttribute(attr, attrvalue);
        return el;
    }

    // appendchild(childtype){
    //     const parent = this.element;
        
    //     if (parent) {
    //         const child = document.createElement(childtype);            
    //         parent.append(child);
            
    //         return child;
    //     }        
    //     else {           
    //         return null;
    //     } 
    // }   

    // setChildAttribute(idx, attr, attrvalue) {
    //     const parent = this.element;     
    //     if (parent) { 
    //         parent.childNodes[idx].setAttribute(attr, attrvalue);
    //         return parent.childNodes[idx];
    //     }
    //     else {
    //         return null;
    //     }
    // }    
}

class PopulateApp {

    constructor() {
        this.container = null;
        this.elements = {};
        this.counter = 1;
    }

    nextKey() {
        return `k${this.counter++}`;
    }

    getElement(theKey) {
        return this.elements[theKey];
    }

    // appendchild(parentKey,childtype){
    //     const parent = this.elements[parentKey];
        
    //     if (parent) {
    //         const child = new AppElement();                        
    //         const childel = child.getElement(childtype,"id3", "test");
    //         let key = this.nextKey();
    //         this.elements[key] = child;
    //         parent.element.append(childel);
            
    //         return childel;
    //     }        
    //     else {           
    //         return null;
    //     }
    // }

//     createDisplayPanel(parentKey){
//         const panel = this.getElement(parentKey);    
//         const panel_el = panel.element;

//         const label = new AppElement();    
//         const label_el = label.getElement("label");
//         label.setElementAttribute("id","activity_label");
//         label.setElementAttribute("class","highlight");
//         let key = this.nextKey();
// console.log("key ", key);        
//         this.elements[key] = label;
//         panel_el.append(label_el);

//         const list = new AppElement();
//         const list_el = list.getElement("ul");
//         list.setElementAttribute("id","activitylist");
//         list.setElementAttribute("class","accctdisplay");
//         key = this.nextKey();
// console.log("key ", key);          
//         this.elements[key] = list;
//         panel_el.append(list_el);

//         return panel;
//     }    

    // createDisplayPanel(){
    //     const panel_obj = new AppElement();    
    //     const panel_el = panel_obj.getElement("div");      
    //     panel_obj.setElementAttribute("class","panel green");
    //     const label = panel_obj.appendchild("label");       
    //     panel_obj.setChildAttribute(0, "id","activity_label");
    //     panel_obj.setChildAttribute(0, "class","highlight");
    //     const list = panel_obj.appendchild("ul");
    //     panel_obj.setChildAttribute(1, "id","activitylist");
    //     panel_obj.setChildAttribute(1, "class","accctdisplay");
    //     let key = this.nextKey();
    //     this.elements[key] = panel_obj;

    //     return panel_obj;
    // } 

    // Create two panels (message display and control panels)
    populate() {
        const container = document.createElement("div");
        container.setAttribute("class","container zone"); 
        this.container = container;

        // Create main panels
        container.append(createDisplayPanel());
        container.append(createControlPanel());

        // const displaypanel = new AppElement();
        // const display_el = displaypanel.getElement("div");
        // displaypanel.setElementAttribute("class","panel green");          
        // let key = this.nextKey();
        // this.elements[key] = displaypanel;
        // const controlpanel = new AppElement();
        // const control_el = controlpanel.getElement("div");
        // controlpanel.setElementAttribute("class","panel yellow");
        // key = this.nextKey();
        // this.elements[key] = controlpanel;

        // for (let key in this.elements) {
        //     container.append(this.elements[key]);
        // }

        // Create sub panels
        // this.createDisplayPanel("k1");


        // Create cards for individual objects



        return container;
    }
}

export default { AppElement, PopulateApp , createDisplayPanel, createControlPanel, createCard, createSubPanel, createButton};
