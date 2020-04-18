import Account, {AccountController} from './account.js'
import CityController from './community.js'
import display from './display.js'
import State from './netcomm.js'
import DOM from './dom.js'

const app = new DOM.PopulateApp();
const container = app.populate();

window.onload = function() {
    idAppContent.append(container);
}

document.addEventListener('click', ((e) => {
    const update = e.target.getAttribute("update");

    if(update) {
        app.updateCardSel(update);
        console.log(update);

    }

    switch (e.target.textContent) {
        case "Create Account":
            app.createAccount();
            break;
        case "Remove Account":
            app.removeAccount();
            break;
        case "Rename Account":  
            app.renameAccount();              
            break;        
        case "Sum Balance":
            app.sumBalance();
            break;        
        case "Max Balance":
            app.maxBalance();
            break;                                                                                          
        case "Min Balance":
            app.minBalance();
            break;
        case "Deposit":
            app.deposit();
            break;
        case "Withdraw":  
            app.withdraw();              
            break;        
        case "Balance":
            app.balance();
            break;        
        case "Create Settlement":
            break;
        case "Delete Settlement":
            break;
        case "Show Sphere":
            break;
        case "Sum Population":                
            break;        
        case "Show Most Northern":
            break;        
        case "Show Most Southern":
            break;                
        case "Moved In":
            break;
        case "Moved Out":                
            break;        
        case "How Big":
            break;       
    }
}));