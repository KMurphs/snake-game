import { Dispatch } from "react";
import { connect, Provider } from "react-redux";
import { createStore, Reducer } from "redux";
import { Direction, TAction, TState, TUser } from "./type";

const mainReducer: Reducer<TState | undefined, TAction> = (state, action)=>{
  
  if(!state) return state;

  switch(action.type){
    case "LOGIN_USER":
      action.payload && (state.user = {...action.payload});
      return { ...state }

    case "CHANGE_DIRECTION":
      action.payload && (state.nextSnakeDirection = action.payload);
      return { ...state }

    case "PAUSE_RESUME_GAME":
      action.payload && (state.isPaused = !state.isPaused);
      return { ...state }

    case "RESET_GAME":
      action.payload && (state.isPaused = action.payload);
      return { ...state }

    default:
      return state
  }
}


const mapStateToProps = (state: TState)=>{
  return {
    ...state, 
    ...{isLoggedIn: state.user.name !== ""},
  }
}

const mapDispatchToProps = (dispatch: Dispatch<TAction>)=>{
  return {
    loginUser: (user: TUser) => dispatch({type: "LOGIN_USER", payload: user}),
    setNextDirection: (dir: Direction | null) => dispatch({type: "CHANGE_DIRECTION", payload: dir}),
    changePauseState: () => dispatch({type: "PAUSE_RESUME_GAME", payload: null}),
    resetGame: () => dispatch({type: "RESET_GAME", payload: null}),
  }
}






const getInitialState = (): TState => {
  const user: TUser = { name: "", pointScore: 0, timeScore: 0 }
  const state: TState =  {
    version: "1.0",
    user: user,
    nextSnakeDirection: null,
    isPaused: false
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
  

  
