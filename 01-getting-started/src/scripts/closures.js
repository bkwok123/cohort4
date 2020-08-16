import functions from './functions.js';

// Implement calculation using JavaScript Closures
// https://www.w3schools.com/js/js_function_closures.asp
const calculate = ((input) => {
    let input1 = "";
    let input2 = "";
    let operator = "";
    let result = 0;
    let display = 0;
    let state = {};

    return (input) => {        

        if (input==="CE") {
            input1 = "";
            input2 = "";
            operator = "";
            result = 0;
            display = 0;
        }
        else {
            if (input1==="") {
                switch (input) {
                    case "=":
                    case "x":
                    case "/":
                    case "%":
                        break;
                    default:                    
                        input1=input;
                }
                display=input1;
            }
            else if ((operator==="")) {
                switch (input) {
                    case "=":
                        break;
                    case "+":
                    case "-":
                    case "x":
                    case "/":                           
                        operator=input;
                        break;
                    case "%":
                        display=input1+input;
                        input1=functions.convertpercentage(input1);                        
                        break;                                                        
                    default:             
                        input1=input1+input;
                        display=input1;
                } 
            }
            else if (input2==="") {
                switch (input) {
                    case "=":
                    case "%":
                        break;
                    case "+":
                    case "-":
                    case "x":
                    case "/":
                        operator=input;
                        break;                                                      
                    default:                    
                        input2=input;
                        display=input2;
                }
            }
            else {
                switch (input) {
                    case "=":
                        result=functions.calculate(Number(input1), Number(input2), operator);
                        input1=result
                        operator="";
                        input2=""
                        display=result;
                        break;
                    case "+":
                    case "-":
                    case "x":
                    case "/":
                        result=functions.calculate(Number(input1), Number(input2), operator);
                        input1=result
                        operator=input;
                        input2=""
                        display=result;
                        break;
                    case "%":
                        display=input2+input;
                        input2=functions.convertpercentage(input2);                        
                        break;                                                                              
                    default:                    
                        input2=input2+input;
                        display=input2;
                }
            }                
        }

        return state = {
            input1: input1,
            input2: input1,
            operator: operator,
            result: result,
            display: String(display)
        }
    }
})();

export default calculate;