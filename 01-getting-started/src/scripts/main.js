import functions from './functions.js';

// **********
//
// Add the event listeners
// 

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