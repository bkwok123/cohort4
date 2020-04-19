import Account, {AccountController} from './account.js'
import CityController from './community.js'
import display from '../../temp/display.js'
import State from './netcomm.js'
import DOM from './dom.js'

const app = new DOM.PopulateCityApp();
const container = app.populate();

window.onload = function() {
    idAppContent.append(container);
}

document.addEventListener('click', ((e) => {
    const update = e.target.getAttribute("update");

    if(update) {
        app.updateCardSel(update);
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
            app.createSettlement();
            break;
        case "Delete Settlement":
            app.deleteSettlement();
            break;
        case "Show Sphere":
            app.showSphere();
            break;
        case "Sum Population":
            app.sumPopulation();                
            break;        
        case "Show Most Northern":
            app.showMostNorthern();
            break;        
        case "Show Most Southern":
            app.showMostSouthern();
            break;                
        case "Moved In":
            app.movedIn();
            break;
        case "Moved Out":
            app.movedOut();                
            break;        
        case "How Big":
            app.howBig();
            break;       
    }
}));