
const functions = {
    
    add_card: (cardID) => {

        let newdiv = document.createElement("div");
        let newbtn = document.createElement("button");
        let newbr = document.createElement("br");
        let textnode = document.createTextNode("CARD " + cardID);
    
        newdiv.setAttribute("id","idcard " + cardID);
        newdiv.setAttribute("class","card");
    
        document.getElementById("idLcontent").appendChild(newdiv);
        newdiv.appendChild(textnode);
        newdiv.appendChild(newbr);
        newbr = document.createElement("br");
        newdiv.appendChild(newbr);
    
        newbtn.setAttribute("id","idAddBeforeCard " + cardID);
        newbtn.setAttribute("class","addcardbutton");
    
        newdiv.appendChild(newbtn);
    
        textnode = document.createTextNode("Add Before");
        newbtn.appendChild(textnode);
    
        newbtn = document.createElement("button");
        newbtn.setAttribute("id","idAddAfterCard " + cardID);
        newbtn.setAttribute("class","addcardbutton");
    
        textnode = document.createTextNode("Add After");
        newbtn.appendChild(textnode);
        newdiv.appendChild(newbtn);
        newbr = document.createElement("br");
        newdiv.appendChild(newbr);
    
        newbtn = document.createElement("button")
        newbtn.setAttribute("id","idDeleteCard " + cardID);
        newbtn.setAttribute("class","addcardbutton");
    
        textnode = document.createTextNode("Delete");
        newbtn.appendChild(textnode);
        newdiv.appendChild(newbtn);
    
        newbr = document.createElement("br");
        newbr.setAttribute("id","idCardBr " + cardID);
        document.getElementById("idLcontent").appendChild(newbr);

        return cardID + 1
    },

    return_parentindex: (childid) => {

        const parents = document.getElementById(childid).parentNode.parentNode.childNodes;
        const parentlen = parents.length;
        const children = document.getElementById(childid).parentNode.childNodes;
        const len = children.length;
        const parentid =document.getElementById(childid).parentNode.id;

        let str = childid;
        let index = null;

        // console.log("parentid",parentid);

        for (let i = 0; i < parentlen; i++){

                if (parentid === parents[i].id) {                
                    index = i;
                }

          }

        return index;
    },

    addbefore_card: (cardID, targetid) => {
            
        const lpanel = document.getElementById("idLcontent");
        let newdiv = document.createElement("div");
        let newbtn = document.createElement("button");
        let newbr = document.createElement("br");
        let textnode = document.createTextNode("CARD " + cardID);
    
        newdiv.setAttribute("id","idcard " + cardID);
        newdiv.setAttribute("class","card");
 
        lpanel.insertBefore(newdiv,lpanel.childNodes[functions.return_parentindex(targetid)]);
        
        newdiv.appendChild(textnode);
        newdiv.appendChild(newbr);
        newbr = document.createElement("br");
        newdiv.appendChild(newbr);
    
        newbtn.setAttribute("id","idAddBeforeCard " + cardID);
        newbtn.setAttribute("class","addcardbutton");
    
        newdiv.appendChild(newbtn);
    
        textnode = document.createTextNode("Add Before");
        newbtn.appendChild(textnode);
    
        newbtn = document.createElement("button");
        newbtn.setAttribute("id","idAddAfterCard " + cardID);
        newbtn.setAttribute("class","addcardbutton");
    
        textnode = document.createTextNode("Add After");
        newbtn.appendChild(textnode);
        newdiv.appendChild(newbtn);
        newbr = document.createElement("br");
        newdiv.appendChild(newbr);
    
        newbtn = document.createElement("button")
        newbtn.setAttribute("id","idDeleteCard " + cardID);
        newbtn.setAttribute("class","addcardbutton");
    
        textnode = document.createTextNode("Delete");
        newbtn.appendChild(textnode);
        newdiv.appendChild(newbtn);
    
        newbr = document.createElement("br");
        newbr.setAttribute("id","idCardBr " + cardID);
        lpanel.insertBefore(newbr,lpanel.childNodes[functions.return_parentindex(targetid)]);            

        return cardID = cardID +1;
    },

    addafter_card: (cardID, targetid) => {
            
        const lpanel = document.getElementById("idLcontent");
        let newdiv = document.createElement("div");
        let newbtn = document.createElement("button");
        let newbr = document.createElement("br");
        let textnode = document.createTextNode("CARD " + cardID);
        let index = functions.return_parentindex(targetid);
    
        newdiv.setAttribute("id","idcard " + cardID);
        newdiv.setAttribute("class","card");

        lpanel.insertBefore(newdiv,lpanel.childNodes[index+1].nextSibling);
        
        newdiv.appendChild(textnode);
        newdiv.appendChild(newbr);
        newbr = document.createElement("br");
        newdiv.appendChild(newbr);
    
        newbtn.setAttribute("id","idAddBeforeCard " + cardID);
        newbtn.setAttribute("class","addcardbutton");
    
        newdiv.appendChild(newbtn);
    
        textnode = document.createTextNode("Add Before");
        newbtn.appendChild(textnode);
    
        newbtn = document.createElement("button");
        newbtn.setAttribute("id","idAddAfterCard " + cardID);
        newbtn.setAttribute("class","addcardbutton");
    
        textnode = document.createTextNode("Add After");
        newbtn.appendChild(textnode);
        newdiv.appendChild(newbtn);
        newbr = document.createElement("br");
        newdiv.appendChild(newbr);
    
        newbtn = document.createElement("button")
        newbtn.setAttribute("id","idDeleteCard " + cardID);
        newbtn.setAttribute("class","addcardbutton");
    
        textnode = document.createTextNode("Delete");
        newbtn.appendChild(textnode);
        newdiv.appendChild(newbtn);
    
        newbr = document.createElement("br");
        newbr.setAttribute("id","idCardBr " + cardID);
        lpanel.insertBefore(newbr,lpanel.childNodes[index+2].nextSibling);        

        return cardID = cardID +1;
    },    
};

export default functions;
