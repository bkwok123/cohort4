import functions from './functions.js';

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

idCalNum0.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + 0;
}));

idCalNum1.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + 1;
}));

idCalNum2.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + 2;
}));

idCalNum3.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + 3;
}));

idCalNum4.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent +  4;
}));

idCalNum5.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + 5;
}));

idCalNum6.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + 6;
}));

idCalNum7.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + 7;
}));

idCalNum8.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + 8;
}));

idCalNum9.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + 9;
}));

idCaldot.addEventListener("click", (() =>{
    idCalResult.textContent = idCalResult.textContent + ".";
}));

idCalCe.addEventListener("click", (() =>{
    idCalResult.textContent = "";
}));

idCalPlus.addEventListener("click", (() =>{
    idCalNumCache1.textContent = idCalResult.textContent
    idCalNumCacheS.textContent = '+'
    idCalResult.textContent = "";
}));

idCalMinus.addEventListener("click", (() =>{
    idCalNumCache1.textContent = idCalResult.textContent
    idCalNumCacheS.textContent = '-'
    idCalResult.textContent = "";
}));

idCalMul.addEventListener("click", (() =>{
    idCalNumCache1.textContent = idCalResult.textContent
    idCalNumCacheS.textContent = 'x'
    idCalResult.textContent = "";
}));

idCalDiv.addEventListener("click", (() =>{
    idCalNumCache1.textContent = idCalResult.textContent
    idCalNumCacheS.textContent = '/'
    idCalResult.textContent = "";
}));

idCalPer.addEventListener("click", (() =>{
    idCalResult.textContent = functions.convertpercentage(Number(idCalResult.textContent));
}));

idCalEq.addEventListener("click", (() =>{
    idCalResult.textContent = functions.calculate(Number(idCalNumCache1.textContent), Number(idCalResult.textContent), idCalNumCacheS.textContent);

    // reset states
    idCalNumCache1.textContent =""
    idCalNumCacheS.textContent =""
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