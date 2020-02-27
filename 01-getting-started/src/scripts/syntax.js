// define attributes / variables
// number
// string
// boolean
// array
// dictionary / objects
// undefined
// sample if / else
// functions
// parameters
// returns
// arrays
// add to the front
// add to the end
// update values
// loops 
// for
// for/in
// while
// do while
// forEach (with array and function)
// Objects / Dictionaries
// declare object
// lookup key to retrieve value

const syntaxfunctions = {
    
    multiply: (num1, num2) => {
        return num1 * num2;
    },

    concatenate: (str1, str2) => {
        return str1.concat(str2);
    },

    findmax: (array) => {
        let i;
        let max = -Infinity;
        for (i = 0; i < array.length; i++) {
          if (array[i] > max) {
            max = array[i];
          }
        }
        
        return max;
    },

    appendarray: (list,appendtolist) => {
        
        let fulllist = list;

        // add to the front
        fulllist.unshift("tiger");

        // add to the end
        fulllist.push(appendtolist);

        return fulllist;
    },   
    
    car: {
            model: "Forester",
            year_made: "2000",
     },

     appendproperties: (list) => {

        let temp="";

        for (const property in list) {
            temp = `${temp}${list[property]}`;
          }

        return temp;
     },

     appendvalues: (list) => {
        let temp="";
        
        // Object.keys(list).forEach(key => {console.log(key)})
        // Object.entries(list).forEach(entry => {console.log(entry)})

        Object.values(list).forEach(value => {
          temp = `${temp}, ${value}`;
      })

      return temp = temp.substring(2,temp.length);
     },

     getKeyByValue: (object, value) => {
      return Object.keys(object).find(key => object[key] === value);
    },

    getValueByKey: (object, key) => {
      return Object.values(object).find(value => object[key] === value);
    }

};

export default syntaxfunctions;