import React from 'react';
import DOM from '../components/domelement';
import Game from './Game';
import Home from '../components/Home';

class AppsController extends React.Component {

    render() {
        const switchon = true;

        return (
            <div>
                <DOM.NavHeader applabel='Banking' credential='Login: ' currentController = 'John Doe' warninglabel= 'Warning'/>                
                <Home />
                <Game />
                <DOM.NavFooter on={switchon}/>
            </div>
        );

    }    
}

export default AppsController;