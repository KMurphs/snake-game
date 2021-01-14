import React, { useEffect, useState } from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './login';
import Game from './game';
import { useCustomCss_vh } from './custom-hooks/useCustomCss_vh';
import { Direction, TUser, SessionScore, ReduxUser } from './store/type';
import { fromLocalStorage, toLocalStorage } from './custom-utils/local-storage';
import { secsToString } from './game/utils';



type Props = {
  isLoggedIn: boolean,
  version: string,
  onUserLogin: (user: TUser)=>void,
  onChangePauseState: ()=>void,
  onNextDirection: (dir: Direction | null)=>void,
  onResetGame: ()=>void,
  onLostGame: ()=>void,
  onScorePoint: ()=>void,
  onTimerTick: ()=>void,
  onLogout: ()=>void,
  onResultFeedback: ()=>void,
  getNewUser: (name?: string)=>TUser,
  user: ReduxUser,
  nextSnakeDirection: Direction | null,
  isPaused: boolean,
  hasLost: boolean,
  hasWon: boolean
  level: number,
  gameTimeScore: number,
}

/**
 * Returns the "best" inputs between "session1" and "session2"
 * @date 2021-01-13
 * @param {SessionScore} session1:SessionScore
 * @param {SessionScore} session2:SessionScore
 * @returns {SessionScore}
 */
const getBestSession = (session1: SessionScore, session2: SessionScore) => {
  if(session1.level !== session2.level) { return session1.level > session2.level ? session1 : session2 } 
  if((session1.timeScore * session1.pointScore) < (session2.timeScore * session2.pointScore)) { return session2; } 
  return session1;
}

/**
 * Returns true if the input "session1" is "greater" that the input "session2"
 * @date 2021-01-13
 * @param {SessionScore} session1:SessionScore
 * @param {SessionScore} session2:SessionScore
 * @returns {boolean}
 */
const orderSessions = (session1: SessionScore, session2: SessionScore) => getBestSession(session1, session2) === session1;



function App({
  isLoggedIn, version, user, gameTimeScore, nextSnakeDirection, 
  isPaused, hasLost, hasWon, level,
  onUserLogin, onLogout, onResetGame, onChangePauseState, onNextDirection, getNewUser, onResultFeedback, 
  onLostGame, onScorePoint, onTimerTick}: Props) {



  /**
   * Utility function that ensures that once the current direction from
   * the user is read, the store must reset its copy to null.
   * This allows the board to fallback on the current snake heading
   * if the user does not react or provide a direction
   * @date 2021-01-13
   * @returns {Direction|null}
   */
  const grabNextDirection = ()=>{
    nextSnakeDirection && onNextDirection(null);
    return nextSnakeDirection;
  }


  /**
   * Effect will run once and will display the current App version
   */ 
  useEffect(()=>{
    console.log(`Current App version: ${version}`);
  },[version])
  



  /**
   * CSS Effect to help with full screen on mobiles
   */ 
  useCustomCss_vh();


  
  /**
   * Local storage effect. Commit "users" state/cache object to storage.
   * Set "users" to updated storage content
   */
  const [users, setUsers] = useState<TUser[]>([]);
  useEffect(()=>{
    (users.length > 0) && toLocalStorage("users", users);
    const storageUsers = fromLocalStorage("users", []);
    (users.length !== storageUsers.length) && setUsers(storageUsers);
  }, [users])
  


  /**
   * Users DB CRUD Ops
   */
  const createUser = (newUsername: string) => {
    const newUser = getNewUser(newUsername);
    setUsers(users => [...users, newUser]);
    return newUser;
  }
  const updateUser = (username: string, session: SessionScore) => setUsers(users => users.map(u => {
    (u.name === username) && (u.last = {...session});
    (u.name === username) && (u.best = getBestSession(u.best, u.last));
    return u;
  }));
  // const deleteUser = (obsoleteUser: TUser) => setUsers(users => users.filter(u => u.name !== obsoleteUser.name));
  const getUserByName = (username: string) => users.find(u => u.name.toLowerCase() === username.toLowerCase());
  const getBestUser = () => users.sort((a,b) => orderSessions(a.best, b.best) ? 1 : -1)[0];



  /**
   * Effect that runs when game is terminated either because user won or lost. The user with its current score
   * is pushed into the users application cache. The Local storage effect will be run subsequently, to commit 
   * to local storage
   */
  useEffect(()=>{
    updateUser(user.name, user.current);
  }, [hasLost, hasWon])


  /**
   * This component is rendered under "Game". Instead of loading the interface with Game with things that Game
   * does not actually need, this component is fully built and is passed as Props to Game to be rendered.
   */
  const DetailsWithProps = () => <Details currentUser={getUserByName(user.name)} bestUser={getBestUser()} onLogout={onLogout}/>


  return (
    <Router>
      <Switch>


        {/* https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4 */}
        {/* https://www.codegrepper.com/code-examples/javascript/Programmatically+navigate+using+react+router */}
        <Route path={`/login`}>
          {
            isLoggedIn ? <Redirect to={`/play`} /> : <Login onLogin={onUserLogin} getUserByName={getUserByName} addUser={createUser}/>
          }
        </Route>

          
        <Route path={`/play`} render={({history})=>(
          isLoggedIn ? <Game user={user} 
                             nextSnakeDirection={nextSnakeDirection}
                             onResetGame={onResetGame}
                             onChangePauseState={onChangePauseState}
                             onNextDirection={onNextDirection}
                             grabNextDirection={grabNextDirection}
                             notifyGameFailure={onLostGame}
                             notifyScorePoint={onScorePoint}
                             onTimerTick={onTimerTick}
                             onResultFeedback={onResultFeedback}
                             isPaused={isPaused}
                             hasLost={hasLost}
                             DetailsFC={DetailsWithProps}
                             hasWon={hasWon}
                             level={level}
                             gameTimeScore={gameTimeScore}
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
  );
}

export default App;







type ResultProps = {
  currentUser: TUser|undefined,
  bestUser: TUser|undefined,
  onLogout: ()=>void
}

/**
 * React Functional Component that appears in the side Panel on mobile
 */
function Details({currentUser, bestUser, onLogout}: ResultProps){
  return (
    <div id="details" className=" p-4 pt-8 rounded-lg h-full flex flex-col justify-between items-stretch">

      <div>
        <h1 className="text-xl pb-2"><span>Current: </span><strong>{currentUser ? currentUser.name: "None"}</strong></h1>
        {currentUser && (
          <ul>
            <li><span>Score: </span>{currentUser?.last.pointScore} points</li>
            <li><span>Time: </span>{secsToString(currentUser?.last.timeScore)} sec</li>
            <li><span>Level: </span>Level {currentUser?.last.level}</li>
          </ul>
        )}
      </div>

      <div>
        <h1 className="text-xl pb-2"><span>Best Overall: </span><strong>{bestUser ? bestUser.name: "None"}</strong></h1>
        {bestUser && (
          <ul>
            <li><span>Score: </span>{bestUser?.best.pointScore} points</li>
            <li><span>Time: </span>{secsToString(bestUser?.best.timeScore)} sec</li>
            <li><span>Level: </span>Level {bestUser?.best.level}</li>
          </ul>
        )}
      </div>

      <div className="flex color-main justify-between flex-wrap ">
        <button onClick={onLogout} className="btn mt-8 mx-2 w-full bg-red-600">Logout</button>
      </div>

    </div>
  )
}