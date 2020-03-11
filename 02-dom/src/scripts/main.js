import functions from './functions.js';

// **********
//
// Add the event listeners
// 

idDOM.addEventListener('click', ((e) => {
    console.log("This is event for idDOM:",e);
}));

idShow.addEventListener('click', (() => {

    let i=0;

    for (i=0; i<document.getElementById("orderedlist").childElementCount; i++){
        console.log(document.getElementById("orderedlist").children[i]);
    };

}));

idAdd.addEventListener('click', (() => {

    let linode = document.createElement("li");
    let textnode = document.createTextNode("Water");
    linode.appendChild(textnode);
    document.getElementById("orderedlist").appendChild(linode);

}));

let cardID = 1;

idAddCards.addEventListener('click', (() => {

    cardID = functions.add_card(cardID);

}));

idLcontent.addEventListener('click', ((event) => {
    const isButton = event.target.nodeName === 'button';
    if (!isButton) {
        
        let targetid = event.target.id;
        let idnum = targetid.substr(targetid.search(" ")+1,targetid.length);

        console.log("Me: ",targetid);

        if (targetid.includes("Delete")) {
            
            let element = document.getElementById(targetid);
            console.log(element.parentNode.id);
            element.parentNode.remove(element);

            element = document.getElementById("idCardBr " + idnum);
            console.log(element);
            element.parentNode.removeChild(element);
        }
        else if (targetid.includes("AddBefore")){

            cardID = functions.addbefore_card(cardID,targetid);

        }
        else if (targetid.includes("AddAfter")){
            cardID = functions.addafter_card(cardID,targetid);
        }

    }

}));