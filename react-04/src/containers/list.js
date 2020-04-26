import React, { useState } from 'react';
import Node from '../components/linkednode';
import LL from '../scripts/linkedlist';
import '../CSS/List.css';

function List() {
  // Declare a new state variable, which we'll call "count"
  const [list, setList] = useState(new LL.LinkedList());
  const[train, setTrain] = useState([]);
  const [amount, setAmount] = useState(0);  
  const [subject, setSubject] = useState("");  
  const [size, setSize] = useState(0);  
  const [capMsg, setCapMsg] = useState("");  
  const [display, setDisplay] = useState("");

  function renderTrain(){

    const newtrain = [];
    let current = list.head;
    let i=0;
    while(current != null) {
      if (current===list.current) {
        switch (true) {
          case i===0:
            newtrain[0]=<Node.NodeHead subject={current.subject} amount={current.amount} nodecss="node redborder"/>;
            break;
          case i===list.size-1:
            newtrain[i]=<Node.NodeTail subject={current.subject} amount={current.amount} nodecss="node redborder"/>;
            break;
          default:
            newtrain[i]=<Node.Node subject={current.subject} amount={current.amount} nodecss="node redborder"/>;
        }
      }
      else {
        switch (true) {
          case i===0:
            newtrain[0]=<Node.NodeHead subject={current.subject} amount={current.amount} nodecss="node"/>;
            break;
          case i===list.size-1:
            newtrain[i]=<Node.NodeTail subject={current.subject} amount={current.amount} nodecss="node"/>;
            break;
          default:
            newtrain[i]=<Node.Node subject={current.subject} amount={current.amount} nodecss="node"/>;
        }        
      }

      current = current.forwardNode;
      i++;
    }
    
    setTrain(newtrain);
  }

  function addHandler() {
    if (list.size < 20) {      
      list.insert(subject,amount);
      renderTrain();

      setSize(list.size);           
    }

    if (list.size === 20) {      
      setCapMsg("MAX capacity is reached!!!");
    }    
  }

  function deleteHandler() {
    if (list.size > 0) {
      list.delete();
      renderTrain(); 

      setSize(list.size);      
    }    
    setCapMsg("");
  }

  function showHandler() {
    if (list.size > 0) {
      setDisplay(`Current subject: ${list.show().subject} Current amount: ${list.show().amount}`);    
    }
  }

  function firstHandler() {

    if(list.size > 0) {
      
      list.first();
      renderTrain();
    }
  }

  function lastHandler() {

    if(list.size > 0) {
      list.last();
      renderTrain(); 
    }
  }

  function nextHandler() {
      
      list.next();
      renderTrain(); 
  }
  
  function previousHandler() {      
      list.previous();
      renderTrain();
  }
  
  function showtotalHandler() {
    if (list.size > 0) {
      setDisplay(`Total: ${list.showtotal()}`);    
    }
  }
  
  return (
    <div className="list">
      <p>Train Size: {size}   {capMsg}</p>     
      <div className="llMonitor">
        <button onClick={() => addHandler()}>
          Insert
        </button>
        <button onClick={() => deleteHandler()}>
          Delete
        </button>
        <button onClick={() => showHandler()}>
          Show
        </button>
        <button onClick={() => firstHandler()}>
          First
        </button>
        <button onClick={() => lastHandler()}>
          Last
        </button>
        <button onClick={() => nextHandler()}>
          Next
        </button>
        <button onClick={() => previousHandler()}>
          Previous
        </button>
        <button onClick={() => showtotalHandler()}>
          Show Total
        </button>                                        

        <p>Subject:</p>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}></input>
        <p>Amount:</p>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
          <p>{display}</p>
      </div>
      <div className="linkedlist">
        {train}
      </div>
    </div>
  );
}


export default List;