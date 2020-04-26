import React from 'react';
import Home from '../components/Home';
import DOM from '../components/pagenav';
import Bank from './bank';
import Place from './location';
import Game from './Game';
import List from './list';
import Linear from './linear';

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
                app = <Place />;
                break;
            case "Tic Tac Toe":
                app = <Game />;
                break;
            case "Linked List":
                app = <List />;
                break;
            case "Stack and Queue":
                app = <Linear />;
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