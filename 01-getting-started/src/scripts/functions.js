
const functions = {
    
    size: (num) => {
        if (num < 10) return "small";
        if (num < 20) return "medium";
        return "large";
    },

    add: (num1, num2) => {
        return num1 + num2;
    },

    subtract: (num1, num2) => {
        return num1 - num2;
    },

    multiply: (num1, num2) => {
        return num1 * num2;
    },

    divide: (num1, num2) => {
        return num1 / num2;
    },

    convertpercentage: (num1) => {
        return num1 / 100;
    },

    calculate: (num1, num2, sign) => {

        let temp = null;

        switch(sign) {
            case "+":
                return functions.add(num1,num2);
                break;
            case "-":
                return functions.subtract(num1,num2);
                break;
            case "x":
                return functions.multiply(num1,num2);
                break;
            case "/":
                return functions.divide(num1,num2);
                break;
            //default:
          }
    }

    // isEven: (num) => {
    //     return false;
    // }
};

export default functions;
