import { Dispatch } from "react";
import { connect, Provider } from "react-redux";
import { createStore, Reducer } from "redux";
import { TAction, TState } from "./type";

const mainReducer: Reducer<TState | undefined, TAction> = (state, action)=>{
  
  if(!state) return state;

  switch(action.type){
    case "UPDATE_USERNAME":
      const { username, ...rest } = state
      const updated_username = action.payload ? { username :  action.payload } : { username }
      return { ...updated_username, ...rest }

    default:
      return state
  }
}


const mapStateToProps = (state: TState)=>{
  return {
    ...state, 
    ...{isLoggedIn: state.username !== ""}
  }
}

const mapDispatchToProps = (dispatch: Dispatch<TAction>)=>{
  return {
    handleNewUsername: ()=> dispatch({type: "UPDATE_USERNAME"})
  }
}






const getInitialState = (): TState => {
  const state: TState =  {
    version: "1.0",
    username: "",
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
  

  
