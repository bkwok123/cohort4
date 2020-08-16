import React from 'react';
import ThemeContext from '../context/ThemeContext';
import '../CSS/Footer.css';
import '../CSS/Header.css';
import himg from "../images/logo.svg";
import bimg from "../images/bank.svg";
import cimg from "../images/community.svg";
import timg from "../images/ttt.svg";
import limg from "../images/link.svg";
import simg from "../images/book.svg";
import thimg from "../images/theme.svg";


class NavHeader extends React.Component {

    static contextType = ThemeContext;

    render() {
        return (
            <nav className={`zone sticky ${this.context.zone} ${this.context.navt} ${this.context.glow}`}>
                <ul className="main-nav">
                    <li>
                        <label id="modulelabel">{this.props.applabel}</label>
                    </li>   
                    <li className="push">
                        <label id="credentiallabel">{this.props.credential}</label>
                        <label id="classlabel">{this.props.currentController}</label>
                    </li>      
                </ul>    
                
                <div className="zone red warning">
                    <label id="warninglabel">{this.props.warninglabel}</label>
                </div>      
            </nav>
        );
    }    
}

class NavFooter extends React.Component {

    static contextType = ThemeContext;
        
    render() {
        return (
            <footer className={`zone bottom-nav stickyb ${this.context.navb}`}>
                <div>
                    <input type="image" src={himg} alt="Home" className={`navbox ${this.context.navicon}`} disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={bimg} alt="Banking" className={`navbox ${this.context.navicon}`} disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={cimg} alt="Demographic" className={`navbox ${this.context.navicon}`} disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={timg} alt="Tic Tac Toe" className={`navbox ${this.context.navicon}`} disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={limg} alt="Linked List" className={`navbox ${this.context.navicon}`} disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={simg} alt="Stack and Queue" className={`navbox ${this.context.navicon}`} disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={thimg} alt="Settings" className={`navbox ${this.context.navicon}`} disabled={this.props.on} onClick={this.props.onClick}></input>
                </div>
            </footer>
        );
    }
}

export default {NavHeader, NavFooter};