import React from 'react';
import '../CSS/Footer.css';
import '../CSS/Header.css';
import himg from "../images/logo.svg";
import bimg from "../images/bank.svg";
import cimg from "../images/community.svg";
import timg from "../images/ttt.svg";
import limg from "../images/link.svg";
import simg from "../images/book.svg";


class NavHeader extends React.Component {

    render() {
        return (
            <nav className="zone blue sticky">
                <ul className="main-nav">
                    <li>
                        <label id="modulelabel">{this.props.applabel}</label>
                    </li>   
                    <li className="sys-nav push">
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

    render() {
        return (
            <footer className="zone yellow bottom-nav stickyb">
                <div>
                    <input type="image" src={himg} alt="Home" className="navbox" disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={bimg} alt="Banking" className="navbox" disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={cimg} alt="Demographic" className="navbox" disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={timg} alt="Tic Tac Toe" className="navbox" disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={limg} alt="Linked List" className="navbox" disabled={this.props.on} onClick={this.props.onClick}></input>
                    <input type="image" src={simg} alt="Stack and Queue" className="navbox" disabled={this.props.on} onClick={this.props.onClick}></input>
                </div>
            </footer>
        );
    }
}

export default {NavHeader, NavFooter};