import React from 'react';
import { Community } from '../scripts/city.js';
import ThemeContext from '../context/ThemeContext';
import NET from '../scripts/netcomm.js';
import '../CSS/CardApp.css';

class Demographics extends React.Component {
    
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = {
            currentCity: "None",
            community: new Community("New Settlement"),
            list: [],
            card: [],
            inputAmt: 0,
            key: 0,
            otheme: this.context,
            cacheCitys: [],
        };
    }

    componentDidUpdate() {
        if (this.state.otheme !== this.context) {
            const place = this.state.community;   
            const cards = [];
    
            for (let i=0; i<place.citys.length; i++) {
                this.addCard(cards, place.citys[i].name, "Population: " + place.citys[i].population);
            }
            
            this.setState({
                card: cards,
                otheme: this.context,
             });
        }   
    }    

    render() { 

        return (
            <div className={`CardApp ${this.context.background}`}>            
                <div className="container zone">        
                    <div className={`panel ${this.context.panel1}`}>
                        <label className={`highlight ${this.context.glow}`}>Population Movement</label>      
                        <ul className="accctdisplay">
                            {this.state.list}
                        </ul>
                    </div>

                    <div className={`panel ${this.context.panel2}`}>
                        <label id="active_class" className={`highlight ${this.context.glow}`}>Current Location: {this.state.currentCity}</label>
                        <div className={`subpanel ${this.context.selectChd}`}>                             
                            <button type="button" className={`spbtn1 ${this.context.btnFG}`} onClick={(e) => this.createSettlement()}>Create Settlement</button>
                            <button type="button" className={`spbtn2 ${this.context.btnFG}`} onClick={(e) => this.deleteSettlement()}>Delete Settlement</button>
                            <button type="button" className={`spbtn3 ${this.context.btnFG}`} onClick={(e) => this.showSphere()}>Show Sphere</button>        
                            <button type="button" className={`spbtn4 ${this.context.btnFG}`} onClick={(e) => this.sumPopulation()}>Sum Population</button>
                            <button type="button" className={`spbtn5 ${this.context.btnFG}`} onClick={(e) => this.showMostNorthern()}>Show Most Northern</button>
                            <button type="button" className={`spbtn6 ${this.context.btnFG}`} onClick={(e) => this.showMostSouthern()}>Show Most Southern</button>
                            <p className="spp1">Population:</p>
                            <input type="number" className={`inbtn1 ${this.context.btnFG}` } value={this.state.inputAmt} onChange={(e) => this.inputChg(e)}></input>       
                            <button type="button" className={`spbtn7 ${this.context.btnFG}`} onClick={(e) => this.movedIn()}>Moved In</button>
                            <button type="button" className={`spbtn8 ${this.context.btnFG}`} onClick={(e) => this.movedOut()}>Moved Out</button>
                            <button type="button" className={`spbtn9 ${this.context.btnFG}`} onClick={(e) => this.howBig()}>How Big</button>                                    
                            <button type="button" className={`spbtn10 ${this.context.btnFG}`} onClick={(e) => this.randSettlement()}>Random</button>
                        </div>
                    </div>                
                </div>            

                <div className={`zone grid-wrapper frame ${this.context.card}`}>
                    {this.state.card}
                </div>
            </div>
        );
    }    

    renderList(list, msg, key) {        
        if(list.length === 5) {
            list.shift();
        }        
        list.push(<li key={`k${key}`}>{msg}</li>);

        return list;        
    }

    addCard(array, name, msg) {
        array.push(
            <div update={name} key={`${name}_div`} className={`box ${this.context.cardbox} ${this.context.selectSelf}`} onClick={(e) => this.cardClick(e)}>
                <ul update={name} key={`${name}_ul`}>
                    <li update={name} key={`${name}_li1`}>{name}</li>
                    <li update={name} key={`${name}_li2`}>{msg}</li>
                </ul>
            </div>            
        )
    }
    
    inputChg (e){
        this.setState({
            inputAmt: e.target.value
          });        
    }

    cardClick(e) {
        this.setState({
            currentCity: e.target.getAttribute("update") 
          }); 
    }   

    async randSettlement () {
        
        const url = "https://restcountries.eu/rest/v2/region/Americas?fields=name;population;latlng";
        let webdata = null;
        let locCache = this.state.cacheCitys;
        const place = this.state.community;   
        let cards = this.state.card.slice();                      

        if (locCache.length < 1) {  // No cache data, retrieve it before proceeding
            try {
                webdata = await NET.getData(url);
    
                if (webdata.status >= 400) {
                    throw (new Error(`${webdata.status} ${webdata.message}`));
                }
                else {
                    locCache = webdata;

                    this.setState({
                        cacheCitys: webdata,
                     });
                }
            }
            catch (error) {
                console.error ("Failed in retrievig data: ", error);
                window.alert("Failed to randomly generate settlement, please enter it manually.");
            }            
        }    

        let isAdd=false;
        let i=0;
        while((i < locCache.length) && (!isAdd)) {
            if(!place.isNameExisting(locCache[i].name)) {
                place.createCity(locCache[i].name, locCache[i].latlng[0], locCache[i].latlng[1], locCache[i].population);
                this.addCard(cards, locCache[i].name, "Population: " + locCache[i].population);

                isAdd = true;

                // Maintain Page State
                this.setState({
                    currentCity: locCache[i].name,
                    community: place,
                    list: [],
                    card: cards,
                 });                                
            }
        
            i++;
        }

        if (!isAdd) {
            window.alert("Invalid settlement name, please enter it manually.");
        }        
    }

    createSettlement() {
        const name = window.prompt("Enter Settlement Name: ","Calgary");
        const place = this.state.community;   
        let cards = this.state.card.slice();                      
            
        if (name !== null && name !== "") {

            if(!place.isNameExisting(name)) {
                const latitude = window.prompt("Enter latitude: ", 0);
                const longitude = window.prompt("Enter longitude: ", 0);
                const population = window.prompt("Enter population: ", 0);

                place.createCity(name, latitude, longitude, population);
                this.addCard(cards, name, "Population: " + population);

                // Maintain Page State
                this.setState({currentCity: name,
                    community: place,
                    list: [],
                    card: cards,
                 });                                
            }
            else {
                window.alert("Invalid settlement name, please try again.");
            }
        }
    }    

    deleteSettlement() {
        const currentCity = this.state.currentCity; 
        const place = this.state.community;   
        let cards = this.state.card.slice(); 

        if (currentCity === null || currentCity === "") {

            window.alert("Invalid Settlement to Remove.");
            return;     
        }
        else {
            if(!place.isNameExisting(currentCity)) {

                window.alert("Invalid Settlement to Remove.");
                return;
            }
            else {
                place.deleteCity(currentCity);
                cards = cards.filter(card => card.key.replace("_div","") !== currentCity);

                // Maintain Page State
                this.setState({currentCity: "None",
                    community: place,
                    list: [],
                    card: cards,
                 });                 

                return; 
            }
        }  
    }

    showSphere() {
        const currentCity = this.state.currentCity;        
        const place = this.state.community;       
        const list = this.state.list;   
        let key = this.state.key+1;

        if(currentCity !== "None"){
            this.renderList(list, "In: " + place.whichSphere(currentCity), key);
        }

        // Maintain Page State
        this.setState({list: list, key: key});        
    }

    sumPopulation() {
        const place = this.state.community;       
        const list = this.state.list;
        let key = this.state.key+1;

        if (place.citys.length > 0) {
            this.renderList(list, "Total Population: " + place.getPopulation(), key);
        }

        // Maintain Page State
        this.setState({list: list, key: key});        
    }    

    showMostNorthern() {
        const place = this.state.community;       
        const list = this.state.list;
        let key = this.state.key+1;

        if (place.citys.length > 0) {
            this.renderList(list, "Most Northern Settlement: " + place.getMostNorthern(), key);
        }

        // Maintain Page State
        this.setState({list: list, key: key});        
    } 

    showMostSouthern() {
        const place = this.state.community;       
        const list = this.state.list;
        let key = this.state.key+1;

        if (place.citys.length > 0) {
            this.renderList(list, "Most Southern Settlement: " + place.getMostSouthern(), key);
        }

        // Maintain Page State
        this.setState({list: list, key: key});        
    }     
    
    movedIn() {
        const currentCity = this.state.currentCity;        
        const place = this.state.community;       
        const list = this.state.list;
        let cards = [];  
        let key = this.state.key+1; 

        if(currentCity !== "None"){
                
            let index = place.return_index(currentCity);
            place.citys[index].movedIn(this.state.inputAmt);

            if (place.citys.length > 0) {                                
                this.renderList(list, "Moved In: " + this.state.inputAmt, key);
            }

            for (let i=0; i<place.citys.length; i++) {                        
                this.addCard(cards, place.citys[i].name, "Population: " + place.citys[index].population);
            }

            // Maintain Page State
            this.setState({
                list: list,
                card: cards,
                inputAmt: 0,
                key: key,
             });       
        }        
    }

    movedOut() {
        const currentCity = this.state.currentCity;        
        const place = this.state.community;       
        const list = this.state.list;
        let cards = [];
        let key = this.state.key+1;   

        if(currentCity !== "None"){
                
            let index = place.return_index(currentCity);
            place.citys[index].movedOut(this.state.inputAmt);

            if (place.citys.length > 0) {                                
                this.renderList(list, "Moved Out: " + this.state.inputAmt, key);
            }

            for (let i=0; i<place.citys.length; i++) {                        
                this.addCard(cards, place.citys[i].name, "Population: " + place.citys[index].population);
            }

            // Maintain Page State
            this.setState({
                list: list,
                card: cards,
                inputAmt: 0,
                key: key,
             });       
        }        
    }
    
    howBig() {
        const place = this.state.community; 
        const currentCity = this.state.currentCity;        
        const list = this.state.list;
        let key = this.state.key+1;   

        if(currentCity !== "None"){
                
            let index = place.return_index(currentCity);
            this.renderList(list, "Classification: " + place.citys[index].howBig(), key);

            // Maintain Page State
            this.setState({
                list: list,
                key: key,
            });       
        }       
    }
}

export default Demographics;