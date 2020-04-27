import React from 'react';

function Plate(props) {
  return (
    <div className={props.nodecss} id={`k${props.unique}`} key={`k${props.unique}`}>
      <p>{props.subject}</p> <p>{props.amount} </p>      
    </div>
  );
}

export default { Plate };