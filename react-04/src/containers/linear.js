import React, { useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import PL from '../components/stackable';
import LI from '../scripts/linearobj';
import '../CSS/Linear.css';

function Linear() {
  const [ssize, setSsize] = useState(0);
  const [qsize, setQsize] = useState(0);
  const [stack, setStack] = useState(new LI.LIFO());
  const [queue, setQueue] = useState(new LI.FIFO());
  const [dqueue, setDqueue] = useState([]);
  const [sobj, setSOBJ] = useState([]);
  const [qobj, setQOBJ] = useState([]);
  const [key, setKey] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [otheme, setOtheme] = useState("");
  const themeCSS = React.useContext(ThemeContext);

  function renderStack() {
    const linearobj = [];
    let current = stack.head;
    let i=0;
    while(current != null) {
      // Key prefix is changed to prevent duplicated key generated outside this render function
      linearobj[i] = <PL.Plate key={`ki${i}`} nodecss={`stackable ${themeCSS.stack}`} subject={current.subject} amount={current.amount} unique={i}/>;
      current = current.forwardNode;
      console.log(current);
      i++;
      }

    return linearobj
  }

  function renderQueue() {
    const linearobj = [];
    let current = queue.head;
    let i=0;
    while(current != null) {
      // Key prefix is changed to prevent duplicated key generated outside this render function
      linearobj[i] = <PL.Plate key={`ki${i}`} nodecss={`stackable ${themeCSS.stack}`} subject={current.subject} amount={current.amount} unique={i}/>;
      current = current.forwardNode;
      console.log(current);
      i++;
      }

    return linearobj
  }

  function clearLIFOHandler() {
    setStack(new LI.LIFO());
    setSOBJ([]);
    setSsize(0);  
  }

  function clearFIFOHandler() {
    setQueue(new LI.FIFO());
    setQOBJ([]);
    setDqueue([]);  
    setQsize(0);  
  }

  useEffect(() => {
    // Added animation in the new stack
    // NOTE: This step is added only to demonstrate useEffect => this step
    // can be incorporated in the push and dequeue handler
    const nstackable = document.getElementById(`k${key-1}`);
    if ((nstackable !== null) && (isNew)) {
      nstackable.setAttribute("class", `stackable drop-in ${themeCSS.stack} ${themeCSS.nstack}`);
    }

    // Render the display on theme change
    if(themeCSS !== otheme){          
      setOtheme(themeCSS);
      setSOBJ(renderStack());
      setQOBJ(renderQueue());
    }

    return () => {
      const pstackable = document.getElementById(`k${key-1}`);
      if (pstackable !== null) {       
        pstackable.setAttribute("class", `stackable ${themeCSS.stack}`);
      }
    };    
  });

  function pushHandler(sub, amt) {
  
    if (stack.size < 20) {
      const nstack = sobj.slice();            
      stack.push(sub,amt);               
      nstack.push(<PL.Plate key={`k${key}`} nodecss={`stackable ${themeCSS.stack}`} subject={sub} amount={amt} unique={key}/>);      

      setSOBJ(nstack);
      setSsize(ssize+1); 
      setKey(key+1);
      setIsNew(true);
    }
  }

  function popHandler() {

    if (stack.size > 0) {
      const nstack = sobj.slice();
      stack.pop();
      nstack.pop();   
      setSOBJ(nstack);  
      setSsize(ssize-1);
      setIsNew(false);       
    }
  }

  function enqueueHandler(sub, amt) {

    if (queue.size < 20) {
      const q = qobj.slice();
      const dq = dqueue.slice();
      if(dq.length > 0) {
        const prop = dq[dq.length-1].props;
        dq.pop();        
        q.push(<PL.Plate key={`k${key}`} nodecss={`stackable ${themeCSS.stack}`} subject={prop.subject} amount={prop.amount} unique={key}/>);
        queue.enqueue(prop.subject,prop.amount);
        setDqueue(dq);
      }
      else {        
        q.push(<PL.Plate key={`k${key}`} nodecss={`stackable ${themeCSS.stack}`} subject={sub} amount={amt} unique={key}/>);        
        queue.enqueue(sub,amt);
      }      
      
      setQOBJ(q);            
      setQsize(qsize+1);
      setKey(key+1);
      setIsNew(true);       
    }       
  }

  function dequeueHandler() {

    if (queue.size > 0) {
      const q = qobj.slice();
      const dq = dqueue.slice();
      queue.dequeue();
      dq.unshift(q[0]);
      q.shift();
      setQOBJ(q);  
      setQsize(qsize-1);    
      setDqueue(dq);
      setIsNew(false);       
    }
  }

  return (
    <div className={`linearobj ${themeCSS.background}`}>
      <div className="scol">
        <div className={`sMoniter ${themeCSS.foreground}`}>
          <p className="smoniterP1">Stack (LIFO)</p>
          <button className={`smbtn smoniterB3 ${themeCSS.btnFG}`} onClick={() => clearLIFOHandler()}>
            Clear
          </button>          
          <button className={`smbtn smoniterB1 ${themeCSS.btnFG}`} onClick={() => pushHandler("",ssize)}>
            Push
          </button>
          <button className={`smbtn smoniterB2 ${themeCSS.btnFG}`} onClick={() => popHandler()}>
            Pop
          </button>
        </div>        
        <div className={`sbox ${themeCSS.container}`}>
          {sobj}
        </div>        
      </div>

      <div className="scol">
        <div className={`sMoniter ${themeCSS.foreground}`}>
          <p className="smoniterP1">Queue (FIFO)</p>
          <button className={`smbtn smoniterB3 ${themeCSS.btnFG}`} onClick={() => clearFIFOHandler()}>
            Clear
          </button>           
          <button className={`smbtn smoniterB1 ${themeCSS.btnFG}`} onClick={() => enqueueHandler("",qsize)}>
          Enqueue
          </button>
          <button className={`smbtn smoniterB2 ${themeCSS.btnFG}`} onClick={() => dequeueHandler()}>
          Dequeue
          </button>     
        </div>        
        <div className={`sbox ${themeCSS.container}`}>
          {qobj}
        </div>        
      </div>
    </div>
  );
}

export default Linear;