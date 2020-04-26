import React, { useState } from 'react';
import PL from '../components/stackable';
import LI from '../scripts/linearobj';
import '../CSS/Linear.css';

function Linear() {
  // Declare a new state variable, which we'll call "count"
  const [ssize, setSsize] = useState(0);
  const [qsize, setQsize] = useState(0);
  const [stack, setStack] = useState(new LI.LIFO());
  const [queue, setQueue] = useState(new LI.FIFO());
  const [dqueue, setDqueue] = useState([]);
  const [sobj, setSOBJ] = useState([]);
  const [qobj, setQOBJ] = useState([]);

  function clearLIFOHandler() {
    for (let i=0; i<stack.size; i++) {
      stack.pop();
    }
    setSOBJ([]);
    setSsize(0);  
  }

  function clearFIFOHandler() {
    for (let i=0; i<stack.size; i++) {
      stack.pop();
    }
    setQOBJ([]);  
    setQsize(0);  
  }

  function pushHandler(sub, amt) {
  
    if (stack.size < 20) {
      const nstack = sobj.slice();            
      stack.push(sub,amt);      
      nstack.push(<PL.Plate nodecss="stackable nstack" subject={sub} amount={amt} />);
      if (nstack.length > 1) {
        const p = nstack[nstack.length-2].props;

        nstack[nstack.length-2] = <PL.Plate nodecss="stackable" subject={p.subject} amount={p.amount} />;
      }
      setSOBJ(nstack);
      setSsize(ssize+1);       
    }
  }

  function popHandler() {

    if (stack.size > 0) {
      const nstack = sobj.slice();
      stack.pop();
      nstack.pop();
      if (nstack.length > 0) {
        const p = nstack[nstack.length-1].props;

        nstack[nstack.length-1] = <PL.Plate nodecss="stackable nstack" subject={p.subject} amount={p.amount} />;
      }      
      setSOBJ(nstack);  
      setSsize(ssize-1);       
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
        q.push(<PL.Plate nodecss="stackable nstack drop-in" subject={prop.subject} amount={prop.amount} />);
        setDqueue(dq);
      }
      else {
        q.push(<PL.Plate nodecss="stackable nstack drop-in" subject={sub} amount={amt} />);
      }      
      
      if (q.length > 1) {
        const p = q[q.length-2].props;

        q[q.length-2] = <PL.Plate nodecss="stackable" subject={p.subject} amount={p.amount} />;
      }
      setQOBJ(q);            
      setQsize(qsize+1);
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
    }
  }

  return (
    <div className="linearobj">
      <div className="scol">
        <div className="sMoniter">
          <p className="smoniterP1">Stack (LIFO)</p>
          <button className="smbtn smoniterB3" onClick={() => clearLIFOHandler("",ssize)}>
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
          <button className="smbtn smoniterB3" onClick={() => clearFIFOHandler("",ssize)}>
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