import React from 'react';
import DOM from '../components/domelement';
import Bank from './bank';
import Game from './Game';
import Home from '../components/Home';

class AppsController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeApp: <Home />,
            activePage: "Home",
        };
      } 

    pageClick(e) {
        let app;
        switch (e.target.alt) {
            case "Home":
                app = <Home />;
                break;            
            case "Banking":
                app = <Bank />;
                break;
            case "Demographic":
                app = <Game />;
                break;
            case "Tic Tac Toe":
                app = <Game />;
                break;                
        }

        this.setState({        
            activeApp: app,
            activePage: e.target.alt,
        });        
    }

    render() {
        const switchon = false;

        return (
            <div>
                <DOM.NavHeader applabel={this.state.activePage}/>                
                {this.state.activeApp}            
                <DOM.NavFooter on={switchon} onClick={(e) => this.pageClick(e)}/>
            </div>
        );

    }    
}

export default AppsController;