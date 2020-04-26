import React, { useState } from 'react';
import '../CSS/Linear.css';

function Linear() {
  // Declare a new state variable, which we'll call "count"
  const [size, setSize] = useState(0);

  return (
    <div className="linearobj">
      <p>You clicked {size} times</p>
      <button onClick={() => setSize(size + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Linear;