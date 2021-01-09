import { Dispatch } from "react";
import { connect, Provider } from "react-redux";
import { createStore, Reducer } from "redux";
import { TAction, TState } from "./type";

export const mainReducer: Reducer<TState | undefined, TAction> = (state, action)=>{
  switch(action.type){
    case "INCREMENT":
        return { counter: state ? state.counter + 1 : 1 }

    default:
      return state
  }
}


export const mapStateToProps = (state: TState)=>{
  return state
}

export const mapDispatchToProps = (dispatch: Dispatch<TAction>)=>{
  return {
    handleIncrement: ()=> dispatch({type: "INCREMENT"})
  }
}









export const store = createStore(mainReducer)
export const connectToStore = (Component: React.FC<any>) => ()=>{
  const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
  return (
    <Provider store = {store}>
      <ConnectedComponent/>
    </Provider>
  )
}
  

  
