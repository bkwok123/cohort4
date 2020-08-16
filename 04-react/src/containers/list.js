import React, { useState, useEffect, useCallback } from 'react';
import { ReactSvgInjector, Mutate } from "react-svg-injector";
import ThemeContext from '../context/ThemeContext';
import Node from '../components/linkednode';
import LL from '../scripts/linkedlist';
import '../CSS/List.css';
import '../CSS/Theme.css';
import arrow from '../images/arrow.svg';
import darrow from '../images/darrow.svg';
import sortA from '../images/sortA.svg';
import sortN from '../images/sortN.svg';
import eye from '../images/eye.svg';
import sum from '../images/sum.svg';

function List() {
  const [list] = useState(new LL.LinkedList());
  const [train, setTrain] = useState([]);
  const [amount, setAmount] = useState(0);  
  const [subject, setSubject] = useState("🛢️");  
  const [size, setSize] = useState(0);  
  const [capMsg, setCapMsg] = useState("");  
  const [display, setDisplay] = useState("");
  const themeCSS = React.useContext(ThemeContext);
  
  function randomInput(){
    const emoji = ["🍖","🥔","🥦","🥑","🍓","🥩","🍈","🛢️","🧶"];
    const rand = Math.round(Math.random()*10%8);
    const rand2 = Math.round(Math.random()*10%8);
    setAmount((rand2+1)*10);
    setSubject(emoji[rand]);
  }

  // Wrap with useCallback to avoid change on every render
  const renderTrain = useCallback(() => {

    const newtrain = [];
    let current = list.head;
    let i=0;
    while(current != null) {
      if (current===list.current) {
        switch (true) {
          case i===0:
            newtrain[0]=<Node.NodeHead key={`K${i}`} subject={current.subject} amount={current.amount} nodecss={`node ${themeCSS.activeSelf} ${themeCSS.btnFG}`} trcss={themeCSS.activefill}/>;
            break;
          case i===list.size-1:
            newtrain[i]=<Node.NodeTail key={`K${i}`} subject={current.subject} amount={current.amount} nodecss={`node ${themeCSS.activeSelf} ${themeCSS.btnFG}`} trcss={themeCSS.activefill}/>;
            break;
          default:
            newtrain[i]=<Node.Node key={`K${i}`} subject={current.subject} amount={current.amount} nodecss={`node ${themeCSS.activeSelf} ${themeCSS.btnFG}`} trcss={themeCSS.activefill}/>;
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
  }, [list, themeCSS]);

  function addHandler() {
    if (list.size < 20) {      
      list.insert(subject,amount);
      renderTrain();
      randomInput();

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
      randomInput();

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
      showHandler();
    }
  }

  function lastHandler() {

    if(list.size > 0) {
      list.last();
      renderTrain();
      showHandler(); 
    }
  }

  function nextHandler() {
      
      list.next();
      renderTrain();
      showHandler(); 
  }
  
  function previousHandler() {      
      list.previous();
      renderTrain();
      showHandler();
  }
  
  function showtotalHandler() {
    if (list.size > 0) {
      setDisplay(`Total: ${list.showtotal()}`);    
    }
  }
  
  function sortAmtHandler() {
    list.sort(true);
    renderTrain();
  }

  function sortSubjHandler() {
    list.sort(false);
    renderTrain();
  }

  useEffect(() => {

    // Render the display on theme change
    renderTrain();

  },[renderTrain]);

  return (
    <div className={`list ${themeCSS.background}`}>              
      <div className={`llMonitor ${themeCSS.foreground}`}>
        <p className="llmp1">Train Size: {size}   {capMsg}</p>
        <div className="llMnav">
          <button className={`llmRbtn llmB1 ${themeCSS.btnFG}`} onClick={() => addHandler()}>
            +
          </button>
          <button className={`llmRbtn llmB2 ${themeCSS.btnFG}`} onClick={() => deleteHandler()}>
            -
          </button>
          <button className={`llmRbtn llmB3 ${themeCSS.btnFG}`} onClick={() => showHandler()}>          
            <ReactSvgInjector src={eye} className="llmSVG" alt="Show">
              <Mutate selector="path" class={themeCSS.fill} />
            </ReactSvgInjector>          
          </button>
          <button className={`llmRbtn llmB4 ${themeCSS.btnFG}`} onClick={() => showtotalHandler()}>
            <ReactSvgInjector src={sum} className="llmSVG" alt="Show Total">
              <Mutate selector="path" class={themeCSS.fill} />
            </ReactSvgInjector>           
          </button>            
          <button className={`llmRbtn llmB5 ${themeCSS.btnFG}`} onClick={() => firstHandler()}>
            <ReactSvgInjector src={darrow} className="llmSVG" alt="First">
              <Mutate selector="path" class={themeCSS.fill} />
            </ReactSvgInjector>           
          </button>
          <button className={`llmRMbtn llmB6 ${themeCSS.btnFG}`} onClick={() => lastHandler()}>
            <ReactSvgInjector src={darrow} className="llmSVG" alt="Last">
              <Mutate selector="path" class={themeCSS.fill} />
            </ReactSvgInjector>           
          </button>
          <button className={`llmRMbtn llmB7 ${themeCSS.btnFG}`} onClick={() => nextHandler()}>
            <ReactSvgInjector src={arrow} className="llmSVG" alt="Next">
              <Mutate selector="path" class={themeCSS.fill} />
            </ReactSvgInjector>           
          </button>
          <button className={`llmRbtn llmB8 ${themeCSS.btnFG}`} onClick={() => previousHandler()}>
            <ReactSvgInjector src={arrow} className="llmSVG" alt="Previous">
              <Mutate selector="path" class={themeCSS.fill} />
            </ReactSvgInjector>          
          </button>
          <button className={`llmRbtn llmB9 ${themeCSS.btnFG}`} onClick={() => sortAmtHandler()}>
            <ReactSvgInjector src={sortN} className="llmSVG" alt="Sort Amount">
              <Mutate selector="path" class={themeCSS.fill} />
            </ReactSvgInjector>              
          </button>
          <button className={`llmRbtn llmB10 ${themeCSS.btnFG}`} onClick={() => sortSubjHandler()}>
            <ReactSvgInjector src={sortA} className="llmSVG" alt="Sort Payload">
              <Mutate selector="path" class={themeCSS.fill} />
            </ReactSvgInjector>                        
          </button>                
        </div>
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