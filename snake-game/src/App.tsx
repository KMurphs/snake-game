import React from 'react';
import './App.css';

type Props = {
  counter: number,
  handleIncrement: ()=>void
}

function App({counter, handleIncrement}: Props) {
  console.log("888888888888888")
  return (
    <div className="App">
      {counter}
      <button onClick={handleIncrement}>Click me</button>
    </div>
  );
}

export default App;
