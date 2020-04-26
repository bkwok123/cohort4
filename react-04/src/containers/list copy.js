import React, { useState } from 'react';
import Node from '../components/linkednode';
import LL from '../scripts/linkedlist';
import '../CSS/List.css';

function List() {
  // Declare a new state variable, which we'll call "count"
  const [list, setList] = useState(new LL.LinkedList());
  const[train, setTrain] = useState([]);
  const[trainIdx, setTrainIdx] = useState(-1);
  const [amount, setAmount] = useState(0);  
  const [subject, setSubject] = useState("");  
  const [size, setSize] = useState(0);  
  const [capMsg, setCapMsg] = useState("");  


  function addTrain() {

    switch (true) {
      case list.size === 1:
        train.push(<Node.NodeHead subject={subject} amount={amount} nodecss="node redborder"/>);
        setTrain(train);
        break;
      case list.size < 20:
        if(trainIdx === (list.size-2)) {  // new cart is last train cart
          const p = train[trainIdx].props;
          if (trainIdx === 0) {         // current cart is head train cart            
            train[0]=<Node.NodeHead subject={p.subject} amount={p.amount} nodecss="node"/>;          
          }
          else {                        
            train[trainIdx]=<Node.Node subject={p.subject} amount={p.amount} nodecss="node"/>;          
          }

          // update previous last cart image with middle cart image          
          train.push(<Node.NodeTail subject={subject} amount={amount} nodecss="node redborder"/>);               
        }
        else {                          // new cart is middle train cart
          const p = train[trainIdx].props;
          train.push(<Node.Node subject={subject} amount={amount} nodecss="node redborder"/>);                          
        }    
        setTrain(train);
        break;
      case list.size === 20:
        const p = train[trainIdx].props;
        train[trainIdx]=<Node.Node subject={p.subject} amount={p.amount} nodecss="node"/>;          
        train.push(<Node.NodeTail subject={subject} amount={amount} nodecss="node redborder"/>);
        setCapMsg("Reach MAX capacity!!!");
        break;
      default:
    }    
  }

  function deleteTrain() {
    
    // replace the last node with NodeTail
    if (list.size > 1) {      
      const p = train[list.size-1].props;

      if (trainIdx === list.size) {   // Current node to be deleted is the last node
        // Assign the predecessor of the current node as the new current node
        train[trainIdx-1]=<Node.NodeTail subject={p.subject} amount={p.amount} nodecss="node redborder"/>;      
      }
      else {
        train[trainIdx-1]=<Node.Node subject={p.subject} amount={p.amount} nodecss="node redborder"/>;      
      }
    }
    else {  // Only one node remaining
      const p = train[trainIdx].props;
      train[trainIdx-1]=<Node.NodeHead subject={p.subject} amount={p.amount} nodecss="node redborder"/>;      
    }

    train[trainIdx]="";
    setTrain(train.filter(el => el !== ""));
    setCapMsg("");    
  }    
  

  function addHandler() {
    if (list.size < 20) {
      list.insert(subject,amount);
      addTrain();

      setSize(list.size);
      setTrainIdx(trainIdx+1)      
    }    
  }

  function deleteHandler() {
    if (list.size > 0) {
      list.delete();
      deleteTrain(); 

      setSize(list.size);
      setTrainIdx(trainIdx-1);      
    }    
  }

  function showHandler() {
    
  }

  function resetTrainBorder() {
    const p = train[trainIdx].props;
    switch (true) {
      case trainIdx === 0:
        train[trainIdx]=<Node.NodeHead subject={p.subject} amount={p.amount} nodecss="node"/>; 
        break;
      case trainIdx === list.size-1:
        train[trainIdx]=<Node.NodeTail subject={p.subject} amount={p.amount} nodecss="node"/>; 
        break;
      default:
        train[trainIdx]=<Node.Node subject={p.subject} amount={p.amount} nodecss="node"/>; 
        break;                    
    }
  }

  function firstHandler() {

    if(list.size > 0) {
      resetTrainBorder();
    
      const p = train[0].props;
      train[0]=<Node.NodeHead subject={p.subject} amount={p.amount} nodecss="node redborder"/>; 
      list.first();
      setTrainIdx(0);
    }
  }

  function lastHandler() {

    if(list.size > 0) {
      resetTrainBorder();

      list.last();
      const p = train[list.size-1].props;
      train[list.size-1]=<Node.NodeTail subject={p.subject} amount={p.amount} nodecss="node redborder"/>;     
      setTrainIdx(list.size-1);
    }
  }

  function nextHandler() {
    if((list.size > 0) && (trainIdx < list.size-1)) {
      resetTrainBorder();
    
      const p = train[trainIdx+1].props;
      if (trainIdx===list.size-2) {
        train[trainIdx+1]=<Node.NodeTail subject={p.subject} amount={p.amount} nodecss="node redborder"/>; 
      }
      else {
        train[trainIdx+1]=<Node.Node subject={p.subject} amount={p.amount} nodecss="node redborder"/>; 
      }
      
      list.next();
      setTrainIdx(trainIdx+1);
    }    
  }
  
  function previousHandler() {
    if((list.size > 0) && (trainIdx > 0)) {
      resetTrainBorder();
    
      const p = train[trainIdx-1].props;
      if (trainIdx===1) {
        train[trainIdx-1]=<Node.NodeHead subject={p.subject} amount={p.amount} nodecss="node redborder"/>; 
      }
      else {
        train[trainIdx-1]=<Node.Node subject={p.subject} amount={p.amount} nodecss="node redborder"/>; 
      }
      
      list.previous();
      setTrainIdx(trainIdx-1);
    }     
  }
  
  function showtotalHandler() {
    
  }
  
  return (
    <div className="list">
      <p>Train Size: {size}   {capMsg}</p>
      <p>Train Inx: {trainIdx}</p>      
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
      </div>
      <div className="linkedlist">
        {/* <Node.NodeHead />
        <Node.Node />
        <Node.NodeTail /> */}
        {train}
      </div>
    </div>
  );
}


export default List;