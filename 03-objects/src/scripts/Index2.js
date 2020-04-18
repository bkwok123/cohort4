import Account, {AccountController} from './account.js'
import CityController from './community.js'
import display from './display.js'
import State from './netcomm.js'
import DOM from './dom.js'

window.onload = function() {

    const app = new DOM.PopulateApp();
    const container = app.populate();

    idAppContent.append(container);
}

document.addEventListener('click', ((e) => {

    switch (e.target.textContent) {
        case "Create Account":
            break;
        case "Remove Account":
            break;
        case "Rename Account":                
            break;        
        case "Sum Balance":
            break;        
        case "Max Balance":
            break;                                                                                          
        case "Min Balance":
            break;
        case "Deposit":
            break;
        case "Withdraw":                
            break;        
        case "Balance":
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