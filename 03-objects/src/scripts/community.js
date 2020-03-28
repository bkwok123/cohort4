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
        
        if(location.latitude > 0) {
            return "Northern Hemisphere"
        } else {
            return "Southern Hemisphere"
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
        console.log(city.name);

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


}