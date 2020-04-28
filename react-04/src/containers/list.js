import React, { useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import Node from '../components/linkednode';
import LL from '../scripts/linkedlist';
import '../CSS/List.css';
import '../CSS/Theme.css';

function List() {
  const [list, setList] = useState(new LL.LinkedList());
  const [train, setTrain] = useState([]);
  const [amount, setAmount] = useState(0);  
  const [subject, setSubject] = useState("Coal");  
  const [size, setSize] = useState(0);  
  const [capMsg, setCapMsg] = useState("");  
  const [display, setDisplay] = useState("");
  const [otheme, setOtheme] = useState("");
  const themeCSS = React.useContext(ThemeContext);

  // Render the display on theme change
  if(themeCSS !== otheme){    
    renderTrain();
    setOtheme(themeCSS);
  }

  function renderTrain(){

    const newtrain = [];
    let current = list.head;
    let i=0;
    while(current != null) {
      if (current===list.current) {
        switch (true) {
          case i===0:
            newtrain[0]=<Node.NodeHead key={`K${i}`} subject={current.subject} amount={current.amount} nodecss={`node borderAct ${themeCSS.btnFG}`} trcss={themeCSS.fill}/>;
            break;
          case i===list.size-1:
            newtrain[i]=<Node.NodeTail key={`K${i}`} subject={current.subject} amount={current.amount} nodecss={`node borderAct ${themeCSS.btnFG}`} trcss={themeCSS.fill}/>;
            break;
          default:
            newtrain[i]=<Node.Node key={`K${i}`} subject={current.subject} amount={current.amount} nodecss={`node borderAct ${themeCSS.btnFG}`} trcss={themeCSS.fill}/>;
        }
      }
      else {
        switch (true) {
          case i===0:
            newtrain[0]=<Node.NodeHead key={`K${i}`} subject={current.subject} amount={current.amount} nodecss={`node ${themeCSS.btnFG}`} trcss={themeCSS.fill}/>;
            break;
          case i===list.size-1:
            newtrain[i]=<Node.NodeTail key={`K${i}`} subject={current.subject} amount={current.amount} nodecss={`node ${themeCSS.btnFG}`} trcss={themeCSS.fill}/>;
            break;
          default:
            newtrain[i]=<Node.Node key={`K${i}`} subject={current.subject} amount={current.amount} nodecss={`node ${themeCSS.btnFG}`} trcss={themeCSS.fill}/>;
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
      setCapMsg(<span><br></br><span style={{color: 'red'}}>MAX</span> capacity is reached!!!</span>);
      
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
      setDisplay(<span>Current Payload: {list.show().subject}<br></br>Current Quantity: {list.show().amount}</span>);
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
    <div className={`list ${themeCSS.background}`}>              
      <div className={`llMonitor ${themeCSS.foreground}`}>
        <p className="llmp1">Train Size: {size}   {capMsg}</p> 
        <button className={`llmbtn llmB1 ${themeCSS.btnFG}`} onClick={() => addHandler()}>
          Insert
        </button>
        <button className={`llmbtn llmB2 ${themeCSS.btnFG}`} onClick={() => deleteHandler()}>
          Delete
        </button>
        <button className={`llmbtn llmB3 ${themeCSS.btnFG}`} onClick={() => showHandler()}>
          Show
        </button>
        <button className={`llmbtn llmB4 ${themeCSS.btnFG}`} onClick={() => showtotalHandler()}>
          Show Total
        </button>            
        <button className={`llmbtn llmB5 ${themeCSS.btnFG}`} onClick={() => firstHandler()}>
          First
        </button>
        <button className={`llmbtn llmB6 ${themeCSS.btnFG}`} onClick={() => lastHandler()}>
          Last
        </button>
        <button className={`llmbtn llmB7 ${themeCSS.btnFG}`} onClick={() => nextHandler()}>
          Next
        </button>
        <button className={`llmbtn llmB8 ${themeCSS.btnFG}`} onClick={() => previousHandler()}>
          Previous
        </button>                               
        <p className="llmp2">Payload:</p>
        <input className={`llmInp llmIn1 ${themeCSS.btnFG}`} type="text" value={subject} onChange={(e) => setSubject(e.target.value)}></input>
        <p className="llmp3"> Quantity:</p>
        <input className={`llmInp llmIn2 ${themeCSS.btnFG}`} type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        <p className="llmp4">{display}</p>
      </div>
      <div className="linkedlist">
        {train}
      </div>
    </div>
  );
}


export default List;