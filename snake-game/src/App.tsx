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
import { TUser } from './store/type';


type Props = {
  isLoggedIn: boolean,
  version: string,
  loginUser: (user: TUser)=>void,
  user: TUser
}

function App({isLoggedIn, version, loginUser, user}: Props) {

  console.log(`Current App version: ${version}`);


  useCustomCss_vh();
  useResetToBaseURIOnLoad("snake-game", ()=>!isOnProductionHost());
  const uri = useAppURI("snake-game");

  return (
    <Router basename={`${uri}`}>



      <Switch>


        {/* https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4 */}
        {/* https://www.codegrepper.com/code-examples/javascript/Programmatically+navigate+using+react+router */}
        <Route path={`/login`}>
          {
            isLoggedIn ? <Redirect to={`/play`} /> : <Login onLogin={loginUser} />
          }
        </Route>

          
        <Route path={`/play`} render={({history})=>(
          isLoggedIn ? <Game user={user}/*backToWelcome={()=>history.push(`/welcome`)} *//> : <Redirect to={`/login`} />
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
