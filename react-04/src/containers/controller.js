import React from 'react';
import ThemeContext, { themes }  from '../context/ThemeContext';
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
            activeTheme: themes.dark,
        };
    } 

    toggleTheme = () => {
        this.setState({
            activeTheme: this.state.activeTheme === themes.dark ? themes.light : themes.dark,
        });        
    }

    pageClick(e) {
        let app;
        let page = e.target.alt;
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
            case "Settings":
                app = this.state.activeApp;
                page = this.state.activePage;
                this.toggleTheme();
                break;                   
            default:                                                
        }

        this.setState({        
            activeApp: app,
            activePage: page,
        });        
    }

    render() {
        const switchon = false;

        return (
            <div>
                <ThemeContext.Provider value={this.state.activeTheme}>
                    <DOM.NavHeader applabel={this.state.activePage}/>                
                    {this.state.activeApp}            
                    <DOM.NavFooter on={switchon} onClick={(e) => this.pageClick(e)}/>
                </ThemeContext.Provider>
            </div>
        );

    }    
}

export default AppsController;