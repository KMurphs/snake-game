import { Dispatch } from "react";
import { connect, Provider } from "react-redux";
import { createStore, Reducer } from "redux";
import { Direction, ReduxUser, TAction, TState, TUser } from "./type";


const copyUser = (userTemplate: ReduxUser, pointScoreInc?: number, timeScoreInc?: number, levelInc?: number) => ({
  name: userTemplate.name,
  current: { pointScore: userTemplate.current.pointScore + (pointScoreInc || 0), timeScore: userTemplate.current.timeScore + (timeScoreInc || 0), level: userTemplate.current.level + (levelInc || 0), id: userTemplate.current.id }
})

const mainReducer: Reducer<TState | undefined, TAction> = (state, action)=>{
  
  if(!state) return state;

  switch(action.type){
    case "LOGIN_USER":
      action.payload && (state.user = getNewReduxUser());
      action.payload && (state.user.name = action.payload.name);
      return { ...state };
    case "LOGOUT_USER":
      action.payload && (state.user = getNewReduxUser());
      action.payload && (state.user.name = "");
      return { ...state };


      


    case "CHANGE_DIRECTION":
      action.payload && (state.nextSnakeDirection = action.payload);
      return { ...state };

    case "PAUSE_RESUME_GAME":
      const {user: user1, ...rest1} = {...state};
      const newUser1 = copyUser(user1, 0, rest1.chronometerCurrent/1000);

      rest1.isPaused && (rest1.chronometerStart = new Date().getTime());
      rest1.isPaused && (rest1.chronometerCurrent = 0);
      !rest1.isPaused && (rest1.chronometerStart = null);
      !rest1.isPaused && (rest1.chronometerCurrent = 0);
      rest1.isPaused = !rest1.isPaused;

      return { user: newUser1, ...rest1 };




    case "RESET_GAME":
      const newState1 = getInitialState();
      newState1.user.name = state.user.name;
      newState1.user.current = {pointScore: 0, timeScore: 0, level: 0, id: new Date().getTime()};
      return newState1

    case "NEXT_LEVEL":
      const newState2 = mainReducer(state, { type:"RESET_GAME", payload: null });
      if(!newState2) return newState2;
      newState2.user.name = state.user.name;
      newState2.user.current = {pointScore: state.user.current.pointScore, timeScore: state.user.current.timeScore, level: state.user.current.level + 1, id: new Date().getTime()};
      return {...newState2}

    case "RESTART_GAME":
      if(state.hasWon) return mainReducer(state, { type:"NEXT_LEVEL", payload: null });
      return mainReducer(state, { type:"RESET_GAME", payload: null });
      





    case "SCORE_POINT":
      const {user: user3, ...rest3} = {...state};
      const newUser3 = copyUser(user3, 1);
      rest3.levelScore += 1;
      if(rest3.levelScore >= rest3.maximumScore) return mainReducer({ user: newUser3, ...rest3 }, {type: "WIN_GAME", payload: null});
      return { user: newUser3, ...rest3 };

    case "WIN_GAME":
      const {user: user4, ...rest4} = {...state};
      const newUser4 = copyUser(user4, 0, rest4.chronometerCurrent/1000);
      rest4.hasWon = true;
      rest4.chronometerCurrent = 0;
      rest4.chronometerStart = null;
      return { user: newUser4, ...rest4 };

    case "LOSE_GAME":
      const {user: user5, ...rest5} = {...state};
      const newUser5 = copyUser(user5, 0, rest5.chronometerCurrent/1000);
      rest5.hasLost = true;
      rest5.chronometerCurrent = 0;
      rest5.chronometerStart = null;
      return { user: newUser5, ...rest5 };

    case "UPDATE_TIME_SCORE":
      if(!state.chronometerStart) return state;
      state.chronometerCurrent = state.chronometerStart ? new Date().getTime() - state.chronometerStart : 0;
      return { ...state };

    default:
      return state
  }
}


const mapStateToProps = (state: TState)=>{
  return {
    ...state, 
    ...{isLoggedIn: state.user.name !== ""},
    ...{gameTimeScore: state.user.current.timeScore + state.chronometerCurrent/1000},
    ...{getNewUser: getNewUser}
  }
}

const mapDispatchToProps = (dispatch: Dispatch<TAction>)=>{
  return {
    onUserLogin: (user: TUser) => dispatch({type: "LOGIN_USER", payload: user}),
    onLogout: (user: TUser) => dispatch({type: "LOGOUT_USER", payload: user}),
    onNextDirection: (dir: Direction | null) => dispatch({type: "CHANGE_DIRECTION", payload: dir}),
    onChangePauseState: () => dispatch({type: "PAUSE_RESUME_GAME", payload: null}),
    onResetGame: () => dispatch({type: "RESET_GAME", payload: null}),
    onLostGame: () => dispatch({type: "LOSE_GAME", payload: null}),
    onScorePoint: () => dispatch({type: "SCORE_POINT", payload: null}),
    onTimerTick: () => dispatch({type: "UPDATE_TIME_SCORE", payload: null}),
    onResultFeedback: () => dispatch({type: "RESTART_GAME", payload: null}),
  }
}



const capitalizeFirstLetter = (word: string) => word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
const getNewReduxUser = (name?: string): ReduxUser => ({ name: capitalizeFirstLetter(name || ""), current: { pointScore: 0, timeScore: 0, level: 0, id: new Date().getTime() }});
const getNewUser = (name?: string): TUser => ({ name: capitalizeFirstLetter(name || ""), last: { pointScore: 0, timeScore: 0, level: 0, id: new Date().getTime() }, best: { pointScore: 0, timeScore: 0, level: 0, id: new Date().getTime() }});

const getInitialState = (): TState => {
  const state: TState =  {
    version: "1.0",
    user: getNewReduxUser(),
    nextSnakeDirection: null,
    isPaused: true,
    hasLost: false,
    hasWon: false,
    maximumScore: 3,
    chronometerStart: null,
    chronometerCurrent: 0,
    levelScore: 0,
  }
  return state;
}
const store = createStore(mainReducer, getInitialState());



export const connectToStore = (Component: React.FC<any>) => ()=>{
  const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
  return (
    <Provider store = {store}>
      <ConnectedComponent/>
    </Provider>
  )
}
  

  
