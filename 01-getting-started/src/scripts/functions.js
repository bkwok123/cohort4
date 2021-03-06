
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
    },

    calculate_taxamt: (income) => {

        let fedtax = 0;

        // Calculate Federal tax
        switch(true) {
            case income <= 48535:
                fedtax = income * 0.15;
                break;
            case income <= 97069:
                fedtax = (income - 48535) * 0.205 + 7280;
                break;
            case income <= 150473:
                fedtax = (income - 97069) * 0.26 + 17230;
                break;
            case income <= 214368:
                fedtax = (income - 150473) * 0.29 + 31115;
                break;
            default:
                fedtax = (income - 214368) * 0.33 + 49645;
          }

        return fedtax;
    },

    calculate_taxrate: (income) => {
        return functions.calculate_taxamt(income)/income;
    },

    display_percent: (number, float) => {
        return parseFloat(number * 100).toFixed(float) + "%";
    },

    addtoarray: (array,number) =>{
        array.push(number);
        return array;
    },

    showarray: (array) =>{

        let i=0;
        let arr_content =array[0];

        for (i = 1; i < array.length; i++) {
            arr_content = arr_content  + "," + array[i];
          }

        return arr_content;
    },

    totalarray: (array) =>{

        let i=0;
        let total =Number(array[0]);

        for (i = 1; i < array.length; i++) {
            total = total + Number(array[i]);
          }

        return total;
    },

    cleararray: (array) =>{
        array.length = 0;
        return array;
    },

    lookup_prov: (provincelist, provincecode) => {
        return Object.values(provincelist).find(value => provincelist[provincecode] === value);
    },
};

export default functions;
