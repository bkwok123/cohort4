import functions from './functions.js';
import calculate from './closures.js'

// **********
//
// Add the event listeners
// 
let array1 = [];
let provincecode = {
    ON: "Toronto",
    QC: "Quebec",
    NS: "Nova Scotia",
    NB: "New Brunswick",
    MB: "Manitoba",
    BC: "British Columbia",
    PE: "Prince Edward Island",
    SK: "Saskatchewan",
    AB: "Alberta",
    NL: "Newfoundland and Labrador",
};

idDictionariesLookup.addEventListener('click', (() => {
    idDictionariesMsg.textContent = functions.lookup_prov(provincecode,idDictionariesInput.value.toUpperCase());
}));

idNumber.addEventListener('change', (() => {
    idNumberSize.textContent = functions.size(idNumber.value);
}));

// Calculator event listener
idCalculatorContainer.addEventListener("click", ((e) =>{
    // Prevent passing result as input by clicking outside any button
    if((e.target.id !== "idCalResult") && (e.target.id !== "idCalculatorContainer") && (e.target.id.length !== 0)) {
        idCalResult.textContent = calculate(e.target.textContent)["display"];

        if(e.target.textContent === "CE") {
            idCalHistory.textContent = "";
        }
        else {
            idCalHistory.textContent = idCalHistory.textContent + e.target.textContent;
        }
    }        
}));

idTaxUpdate.addEventListener("click", (() =>{
    idTaxAmt.textContent = `Tax Amount: ${functions.calculate_taxamt(idTaxableIncome.value)}`;
    idTaxRate.textContent = `Effective Tax Rate: ${functions.display_percent(functions.calculate_taxrate(idTaxableIncome.value),2)}`;
}));

idArraysAdd.addEventListener('click', (() => {
    if(isNaN(idArraysInput.value)) {
        idArraysMsg.textContent = "The input is not a valid number."
    }
    else
    {
        functions.addtoarray(array1,idArraysInput.value);
        idArraysMsg.textContent = "The number has been added to the array."
    }    
}));

idArraysShow.addEventListener('click', (() => {
    idArraysMsg.textContent = functions.showarray(array1);
}));

idArraysTotal.addEventListener('click', (() => {
    idArraysMsg.textContent = functions.totalarray(array1);
}));

idArraysClear.addEventListener('click', (() => {
    idArraysMsg.textContent = functions.cleararray(array1);
}));