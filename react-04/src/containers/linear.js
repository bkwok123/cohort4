import React, { useState, useEffect } from 'react';
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
    // It is imperative to have "changes" in stack or queue (such as CSS) to
    // force the virtual DOM to update the DOM to render new display.
    // Without cleaning up in the useEffect, the virtual DOM does not detect
    // any changes in the stack or queue and results in all stackables to be NEW
    // despite of the stack or queue elements contain the correct CSS className.
    const nstackable = document.getElementById(`k${key-1}`);
    if ((nstackable !== null) && (isNew)) {
      nstackable.setAttribute("class", "stackable nstack drop-in");
    }
    
    return () => {
      const pstackable = document.getElementById(`k${key-1}`);
      if (pstackable !== null) {       
        pstackable.setAttribute("class", "stackable");
      }
    };    
  });

  function pushHandler(sub, amt) {
  
    if (stack.size < 20) {
      const nstack = sobj.slice();            
      stack.push(sub,amt);               
      nstack.push(<PL.Plate nodecss="stackable" subject={sub} amount={amt} unique={key}/>);      

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
      queue.enqueue(sub,amt);
      if(dq.length > 0) {
        const prop = dq[dq.length-1].props;
        dq.pop();
        q.push(<PL.Plate nodecss="stackable" subject={prop.subject} amount={prop.amount} unique={key}/>);
        setDqueue(dq);
      }
      else {
        q.push(<PL.Plate nodecss="stackable" subject={sub} amount={amt} unique={key}/>);
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
    <div className="linearobj">
      <div className="scol">
        <div className="sMoniter">
          <p className="smoniterP1">Stack (LIFO)</p>
          <button className="smbtn smoniterB3" onClick={() => clearLIFOHandler()}>
            Clear
          </button>          
          <button className="smbtn smoniterB1" onClick={() => pushHandler("",ssize)}>
            Push
          </button>
          <button className="smbtn smoniterB2" onClick={() => popHandler()}>
            Pop
          </button>
        </div>        
        <div className="sbox">
          {sobj}
        </div>        
      </div>

      <div className="scol">
        <div className="sMoniter">
          <p className="smoniterP1">Queue (FIFO)</p>
          <button className="smbtn smoniterB3" onClick={() => clearFIFOHandler()}>
            Clear
          </button>           
          <button className="smbtn smoniterB1" onClick={() => enqueueHandler("",qsize)}>
          Enqueue
          </button>
          <button className="smbtn smoniterB2" onClick={() => dequeueHandler()}>
          Dequeue
          </button>     
        </div>        
        <div className="sbox">
          {qobj}
        </div>        
      </div>
    </div>
  );
}

export default Linear;