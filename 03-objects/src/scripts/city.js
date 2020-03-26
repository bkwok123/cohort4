export default class city {
    
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

        return this.population = this.population + headcount;
    }   

    movedOut(headcount) {                

        return this.population = this.population - headcount;
    }  

    howBig() {              
              
        switch(true) {
            case this.population > 100000:
                return "City";
            break; 

            case (20000 < this.population) && (this.population <= 100000):
                return "Large town";
            break;

            case (1000 < this.population) && (this.population <= 20000):
                return "Town";
            break;

            case (100 < this.population) && (this.population <= 1000):
                return "Village";
            break;

            case this.population <= 100:
                return "Hamlet";
            break;            

            default:
        }

        return;
    }      
}