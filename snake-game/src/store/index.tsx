import { Dispatch } from "react";
import { connect, Provider } from "react-redux";
import { createStore, Reducer } from "redux";
import { TAction, TState, TUser } from "./type";

const mainReducer: Reducer<TState | undefined, TAction> = (state, action)=>{
  
  if(!state) return state;

  switch(action.type){
    case "LOGIN_USER":
      const { user, ...rest } = state
      const updated_username = action.payload ? { user :  {...action.payload} } : { user }
      return { ...updated_username, ...rest }

    default:
      return state
  }
}


const mapStateToProps = (state: TState)=>{
  return {
    ...state, 
    ...{isLoggedIn: state.user.name !== ""}
  }
}

const mapDispatchToProps = (dispatch: Dispatch<TAction>)=>{
  return {
    loginUser: (user: TUser)=> dispatch({type: "LOGIN_USER", payload: user})
  }
}






const getInitialState = (): TState => {
  const user: TUser = { name: "", pointScore: 0, timeScore: 0 }
  const state: TState =  {
    version: "1.0",
    user: user,
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
  

  
