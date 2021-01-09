import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { connectToStore } from './store';


const Wrapper = connectToStore(App)

ReactDOM.render(

  <React.StrictMode>
    <Wrapper />
    {/* <div>1</div> */}
    {
      // ()=>connectToStore(App)
    }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
