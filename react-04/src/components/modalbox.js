import React, { Component } from "react";
import ThemeContext from '../context/ThemeContext';
import '../CSS/ModalBox.css';

export class ModalBox extends Component {

  static contextType = ThemeContext;

  render() {
    return (
      <div id={this.props.boxID} className={this.props.hide ? "modalhide":"modalshow"}>
        <div className={`modal-content ${this.context.modalBG} ${this.context.selectChd}`}>
          <span className={`close ${this.context.modalMC}`} onClick={this.props.onClickModalClose}>x</span>
          {this.props.content}          
        </div>
      </div>
    );
  }
}

export default ModalBox;
