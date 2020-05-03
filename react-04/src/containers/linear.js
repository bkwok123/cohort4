import React, { useState, useEffect, useCallback } from 'react';
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
  const [isNews, setIsNewS] = useState(false);
  const [isNewq, setIsNewQ] = useState(false);
  const themeCSS = React.useContext(ThemeContext);

  const renderStack = useCallback(() => {
    const linearobj = [];
    let current = stack.head;
    let i=0;
    while(current != null) {      
      linearobj[i] = <PL.Plate key={`k${i}`} nodecss={`stackable ${themeCSS.stack}`} subject={current.subject} amount={current.amount} unique={i}/>;
      current = current.forwardNode;
      i++;
    }

    // Change the latest stackable style
    if(isNews && (linearobj.length>0)) {
      const prop = linearobj[linearobj.length-1].props;
      linearobj[linearobj.length-1] = <PL.Plate key={`k${i}`} nodecss={`stackable drop-in ${themeCSS.stack} ${themeCSS.nstack}`} subject={prop.subject} amount={prop.amount} unique={prop.unique}/>;   
    }

    return linearobj
  }, [themeCSS, stack, isNews]);

  const renderQueue = useCallback(() => {
    const linearobj = [];
    let current = queue.head;
    let i=0;
    while(current != null) {      
      linearobj[i] = <PL.Plate key={`k${i}`} nodecss={`stackable ${themeCSS.stack}`} subject={current.subject} amount={current.amount} unique={i}/>;
      current = current.forwardNode;
      i++;
    }

    // Change the latest stackable style
    if(isNewq && (linearobj.length>0)) {
      const prop = linearobj[linearobj.length-1].props;
      linearobj[linearobj.length-1] = <PL.Plate key={`k${i}`} nodecss={`stackable drop-in ${themeCSS.stack} ${themeCSS.nstack}`} subject={prop.subject} amount={prop.amount} unique={prop.unique}/>;   
    }    

    return linearobj
  }, [themeCSS, queue, isNewq]);

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
    setSOBJ(renderStack());
    setQOBJ(renderQueue()); 
  }, [renderStack, renderQueue]);

  function pushHandler(sub, amt) {
  
    if (stack.size < 20) {           
      stack.push(sub,amt);                  
      setSOBJ(renderStack());            
      setSsize(ssize+1); 
      setIsNewS(true);
    }
  }

  function popHandler() {

    if (stack.size > 0) {
      stack.pop();
      setSOBJ(renderStack());  
      setSsize(ssize-1);
      setIsNewS(false);       
    }
  }

  function enqueueHandler(sub, amt) {

    if (queue.size < 20) {
      const dq = dqueue.slice();
      if(dq.length > 0) {
        const prop = dq[dq.length-1].props;
        dq.pop();        
        queue.enqueue(prop.subject,prop.amount);
        setDqueue(dq);
      }
      else {        
        queue.enqueue(sub,amt);
      }      
                  
      setQOBJ(renderQueue());      
      setQsize(qsize+1);
      setIsNewQ(true);       
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
      setIsNewQ(false);       
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