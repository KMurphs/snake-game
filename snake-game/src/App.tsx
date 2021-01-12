import React, { useCallback } from 'react';
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
import { Direction, TUser } from './store/type';


type Props = {
  isLoggedIn: boolean,
  version: string,
  loginUser: (user: TUser)=>void,
  changePauseState: ()=>void,
  setNextDirection: (dir: Direction | null)=>void,
  resetGame: ()=>void,
  user: TUser,
  nextSnakeDirection: Direction | null,
  isPaused: boolean
}

function App({isLoggedIn, version, loginUser, user, nextSnakeDirection, resetGame, changePauseState, setNextDirection, isPaused}: Props) {

  console.log(`Current App version: ${version}`);

  const grabNextDirection = ()=>{
    nextSnakeDirection && setNextDirection(null);
    return nextSnakeDirection;
  }


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
          isLoggedIn ? <Game user={user} 
                             nextSnakeDirection={nextSnakeDirection}
                             resetGame={resetGame}
                             changePauseState={changePauseState}
                             setNextDirection={setNextDirection}
                             grabNextDirection={grabNextDirection}
                             isPaused={isPaused}
                             /*backToWelcome={()=>history.push(`/welcome`)} *//> 
                     : <Redirect to={`/login`} />
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
