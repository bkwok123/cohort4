import React from 'react';
import { ReactSvgInjector, Mutate } from "react-svg-injector";
import trainh from "../images/train head.svg";
import trainc1 from "../images/train cart1.svg";
import traint from "../images/train cart3.svg";

function NodeHead(props) {
  return (
    <div className={props.nodecss}>
      <p>{props.subject}</p> <p>Qty: {props.amount}</p>
      <ReactSvgInjector src={trainh} className="train">
        <Mutate selector="path" class={props.trcss} />
      </ReactSvgInjector>            
    </div>
  );
}

function Node(props) {
  return (
    <div className={props.nodecss}>
      <p>{props.subject}</p> <p>Qty: {props.amount}</p>
      <ReactSvgInjector src={trainc1} className="train">
        <Mutate selector="path" class={props.trcss} />
      </ReactSvgInjector>      
    </div>
  );
}

function NodeTail(props) {
  return (
    <div className={props.nodecss}>
      <p>{props.subject}</p> <p>Qty: {props.amount}</p>
      <ReactSvgInjector src={traint} className="train" >
        <Mutate selector="path" class={props.trcss} />
      </ReactSvgInjector>       
    </div>
  );
}

export default { NodeHead, Node, NodeTail };