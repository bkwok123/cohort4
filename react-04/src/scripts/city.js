export default class City {
    
    constructor(name, latitude, longitude, population) {

        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.population = population;
    }

    show() {                

        return `${this.name}, ${this.latitude}, ${this.longitude}, ${this.population}`;
    }    

    movedIn(headcount) {                

        return this.population = Number(this.population) + Number(headcount);
    }   

    movedOut(headcount) {                

        return this.population = Number(this.population) - Number(headcount);
    }  

    howBig() {              
              
        switch(true) {
            case this.population > 100000:
                return "City";

            case (20000 < this.population) && (this.population <= 100000):
                return "Large town";

            case (1000 < this.population) && (this.population <= 20000):
                return "Town";

            case (100 < this.population) && (this.population <= 1000):
                return "Village";

            case this.population <= 100:
                return "Hamlet";

            default:
        }

        return;
    }      
}

export class Community {

    constructor(name, citys) {

        this.name = name;
        this.citys = [];
    }

    createCity (name, latitude, longitude, population) {

        this.citys.push(new City(name, latitude, longitude, population));

        return this.citys;
    }


    deleteCity(name) {        
            
        this.citys = this.citys.filter(city => city.name !== name);

        return this.citys;
    }        


    whichSphere (name) {

        const location = this.citys.find(city => city.name === name);

        switch(true) {
            case Number(location.latitude) === 0:
                return "Equator";

            case Number(location.latitude) > 0:
                return "Northern Hemisphere";

            case Number(location.latitude) <0:
                return "Southern Hemisphere";

            default:
        }
        
    }

    getMostNorthern () {
        
        let city = this.citys[0];

        for (let i=1; i<this.citys.length; i++) {

            if (Number(city.latitude) < Number(this.citys[i].latitude)) {
                city = this.citys[i];
            }                

        }

        return city.name;
    }


    getMostSouthern () {

        let city = this.citys[0];        

        for (let i=1; i<this.citys.length; i++) {

            if (Number(city.latitude) > Number(this.citys[i].latitude)) {
                city = this.citys[i];            
            }               
            
        }

        return city.name;
    }


    getPopulation () {
        return this.citys.reduce(((total,currentCity) => total+Number(currentCity.population)),0);
    }

    return_index(cityName){        
        return this.citys.findIndex((element) => element.name === cityName);
    }  

    isNameExisting(settlementName){
        let isExisting = false;

        for (let i=0; i<this.citys.length; i++) {

            if(this.citys[i].name === settlementName) {
                isExisting = true;
            }
            
        }     
        
        return isExisting;
    }
    
    copyArray(array) {
        
        for (let i=0; i < array.length; i++) {
            this.citys.push(new City(array[i].name, array[i].latitude, array[i].longitude, array[i].population));
        }

        return this.citys;
    }

}