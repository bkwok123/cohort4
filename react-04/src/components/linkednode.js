import React from 'react';
import trainh from "../images/train head.svg";
import trainc1 from "../images/train cart1.svg";
import traint from "../images/train cart3.svg";

function NodeHead(props) {
  return (
    <div className={props.nodecss}>
      <p>{props.subject}</p> <p>Amount: {props.amount}</p>
      <input type="image" src={trainh} className="train" alt="Head"></input>
    </div>
  );
}

function Node(props) {
  return (
    <div className={props.nodecss}>
      <p>{props.subject}</p> <p>Amount: {props.amount}</p>
      <input type="image" src={trainc1} className="train" alt="Cart"></input>
    </div>
  );
}

function NodeTail(props) {
  return (
    <div className={props.nodecss}>
      <p>{props.subject}</p> <p>Amount: {props.amount}</p>
      <input type="image" src={traint} className="train" alt="Tail"></input>
    </div>
  );
}

export default { NodeHead, Node, NodeTail };