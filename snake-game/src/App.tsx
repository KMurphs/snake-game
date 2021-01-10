import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './login';
import Game from './game';
import { isOnProductionHost } from './custom-hooks/generalHelpers';
import { useResetToBaseURIOnLoad, useAppURI } from './custom-hooks/scrollHelpers';
import { useCustomCss_vh } from './custom-hooks/useCustomCss_vh';
import { TState } from './store/type';

type Props = {
  isLoggedIn: boolean,
  version: string,
  handleIncrement: ()=>void
}

function App({isLoggedIn, version}: Props) {

  console.log(`Current App version: ${version}`);


  useCustomCss_vh();
  useResetToBaseURIOnLoad("snake-game", ()=>!isOnProductionHost());
  const uri = useAppURI("snake-game");

  return (
    <Router basename={`${uri}`}>



      <Switch>


        {/* https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4 */}
        {/* https://www.codegrepper.com/code-examples/javascript/Programmatically+navigate+using+react+router */}
        <Route path={`/login`} render={({})=>(
          <Login /*onStartExploring={()=>history.push(`/data`)}*/ />
        )}/>

          
        <Route path={`/play`} render={({history})=>(
          isLoggedIn ? <Game /*backToWelcome={()=>history.push(`/welcome`)} *//> : <Redirect to={`/login`} />
        )}/>




        {/* Redirects */}
        <Route path={`/`}>
          <Redirect to={`/play`} />
        </Route>
        <Route path={`/*`}>
          <Redirect to={`/login`} />
        </Route>



      </Switch>
    </Router>  

    // <div className="App">
    //   {counter}
    //   <button onClick={handleIncrement}>Click me</button>
    // </div>
  );
}

export default App;
