import React from 'react';
import trainh from "../images/train head.svg";
import trainc1 from "../images/train cart1.svg";
import trainc2 from "../images/train cart2.svg";
import traint from "../images/train cart3.svg";

function NodeHead(props) {
  return (
    <div className={props.nodecss}>
      <p>Subject: {props.subject}</p> <p>Amount: {props.amount}</p>
      <input type="image" src={trainh} className="train" alt="Head" onClick={props.onClick}></input>
    </div>
  );
}

function Node(props) {
  return (
    <div className={props.nodecss}>
      <p>Subject: {props.subject}</p> <p>Amount: {props.amount}</p>
      <input type="image" src={trainc1} className="train" alt="Cart" onClick={props.onClick}></input>
    </div>
  );
}

function NodeTail(props) {
  return (
    <div className={props.nodecss}>
      <p>Subject: {props.subject}</p> <p>Amount: {props.amount}</p>
      <input type="image" src={traint} className="train" alt="Tail" onClick={props.onClick}></input>
    </div>
  );
}

export default { NodeHead, Node, NodeTail };