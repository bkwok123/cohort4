import React from 'react';
import { Community } from '../scripts/city.js'
import NET from '../scripts/netcomm.js'

class Demographics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCity: "None",
            community: new Community("New Settlement"),
            list: [],
            card: [],
            inputAmt: 0,
            key: 0,
        };
    }

    buttonClick(e) {

        switch (e.target.textContent) {
            case "Create Settlement":
                this.createSettlement();
                break;            
            case "Delete Settlement":
                this.deleteSettlement();
                break;
            case "Show Sphere":
                this.showSphere();
                break;
            case "Sum Population":
                this.sumPopulation();                
                break;
            case "Show Most Northern":
                this.showMostNorthern();
                break;            
            case "Show Most Southern":
                this.showMostSouthern();
                break;
            case "Moved In":
                this.movedIn();
                break;
            case "Moved Out":
                this.movedOut();
                break;   
            case "How Big":
                this.howBig();
                break;      
            default:                                                                                                                                                
        }      
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

    render() {

        return (
            <div>            
                <div className="container zone">        
                    <div className="panel green">
                        <label className="highlight">Population Movement</label>      
                        <ul className="accctdisplay">
                            {this.state.list}
                        </ul>
                    </div>
                
                    <div className="panel yellow">
                        <div id="active_class" className="highlight">Current Location: {this.state.currentCity}</div>
                        <div className="subpanel">        
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Create Settlement</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Delete Settlement</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Show Sphere</button>        
                        </div>  
            
                        <div className="subpanel">
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Sum Population</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Show Most Northern</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Show Most Southern</button>
                        </div>        
                
                        <div className="subpanel">      
                            <p>Population:</p>
                            <input type="number" className="acctinput" value={this.state.inputAmt} onChange={(e) => this.inputChg(e)}></input>       
                        </div>
                
                        <div className="subpanel">
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Moved In</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>Moved Out</button>
                            <button type="button" className="acctbtn" onClick={(e) => this.buttonClick(e)}>How Big</button>        
                        </div>
                    </div>
                </div>            

                <div className="zone blue grid-wrapper frame">
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
            <div update={name} key={`${name}_div`} className="box" onClick={(e) => this.cardClick(e)}>
                <ul update={name} key={`${name}_ul`} className="boxul">
                    <li update={name} key={`${name}_li1`}>{name}</li>
                    <li update={name} key={`${name}_li2`}>{msg}</li>
                </ul>
            </div>            
        )
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

                // Save State to the Server
                // NET.putData(url, page_state);
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

                // Save State to the Server
                // NET.putData(url, page_state);                    
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
                this.addCard(cards, place.citys[i].name, "Moved In: " + place.citys[index].population);
            }

            // Maintain Page State
            this.setState({
                list: list,
                card: cards,
                inputAmt: 0,
                key: key,
             });       

            // Save State to the Server
            // NET.putData(url, page_state);
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
                this.addCard(cards, place.citys[i].name, "Moved Out: " + place.citys[index].population);
            }

            // Maintain Page State
            this.setState({
                list: list,
                card: cards,
                inputAmt: 0,
                key: key,
             });       

            // Save State to the Server
            // NET.putData(url, page_state);
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