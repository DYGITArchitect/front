import React, { useState } from "react";

const Counter = function () {
  const [counts, setCounter] = useState(0);

  function increase() {
    setCounter(counts + 1);
  }

  function decrease() {
    setCounter(counts - 1);
  }

  return (
    <div>
      <h1>{counts}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
};

export default Counter;
