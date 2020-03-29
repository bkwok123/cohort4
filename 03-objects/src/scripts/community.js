import City from './city.js'

export default class community {

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
            case location.latitude === 0:
                return "Equator";
            break;

            case location.latitude > 0:
                return "Northern Hemisphere";
            break;

            case location.latitude <0:
                return "Southern Hemisphere";
            break;
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
        return this.citys.reduce(((total,currentCity) => total+currentCity.population),0);
    }

    return_index(cityName){

        let index=null;

        for (let i=0; i<this.citys.length; i++) {

            if(this.citys[i].name === cityName) {
                index = i;
            }
            
        }     
        
        return index;
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

}