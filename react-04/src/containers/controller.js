import React from 'react';
import DOM from '../components/domelement';
import Game from './Game';
import Home from '../components/Home';

class AppsController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeApp: <Home />,
        };
      } 

    pageClick(e) {
        let app;
        switch (e.target.alt) {
            case "Home":
                app = <Home />;
                break;            
            case "Banking":
                app = <Game />;
                break;
            case "Demographic":
                app = <Home />;
                break;
        }

        this.setState({        
            activeApp: app,}
          );        
    }

    render() {
        const switchon = false;

        return (
            <div>
                <DOM.NavHeader applabel='Banking' credential='Login: ' currentController = 'John Doe' warninglabel= 'Warning'/>                
                {this.state.activeApp}
                <DOM.NavFooter on={switchon} onClick={(e) => this.pageClick(e)}/>
            </div>
        );

    }    
}

export default AppsController;