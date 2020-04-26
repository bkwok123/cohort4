import React from 'react';

function Plate(props) {
  return (
    <div className={props.nodecss}>
      <p>{props.subject}</p> <p>{props.amount}</p>      
    </div>
  );
}

export default { Plate };