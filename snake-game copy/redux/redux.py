from typing import Dict, Tuple
from redux.types import TAction, TReducer, TStore, TSuscriber




# https://stackoverflow.com/a/39440252/9034699
def create_store(reducer: TReducer, initial_state: Dict):
  """Very simple implementation of redux for python. A "initial_state" dictionary
  is provided when creating the store along with a reducer.

  Principle:

  When an action is dispatched, the store uses the reducer with the current state to 
  compute the next state. 
  Once the next state is obtained, the store updates its internal current state and 
  notifies anyone who suscribed to changes

  The store returns 3 functions:
    - get_state: Function that returns a copy of the current state.
    - dispatch: Function that component use to trigger a state change. The dispatch is called with an action (event) to which the store and the reducer will respond to before the state is updated.
    - suscribe: Function that acts as a callback for the component that uses it. When state is updated all the functions passed to suscribe (stored in List) are called.

  Args:
      reducer (TReducer): Function that computes the next state given the current state and a particular action (type and payload) dispatched to the store
      initial_state (Dict): Initial value of the state

  Returns:
      [TStore]: Class instance with attribute get_state, dispatch, suscribe
  """
  current_state = initial_state
  suscribers: Tuple[TSuscriber] = tuple()
  is_dispatching = False


  def get_state(): return current_state.copy()

  def suscribe(f):
    nonlocal suscribers
    suscribers = suscribers + tuple([f])

  def dispatch(action: TAction):
    nonlocal is_dispatching, suscribers, current_state

    # Do not process more actions until we are done with the current one
    if is_dispatching: Exception("Store is still dispatching previous action")
    is_dispatching = True

    try: 
      next_state = reducer(current_state.copy(), action)
      if next_state:
        current_state = next_state.copy()

        # Notify anyone who suscribed, of the state change. Send out updated state, and the action the store responded
        [suscriber(next_state, action) for suscriber in suscribers]

    # Ensure we can always unlock the store to process new dispatch actions
    finally: 
      is_dispatching = False
      
    
  return TStore(
    get_state = get_state,
    suscribe = suscribe,
    dispatch = dispatch
  )











if __name__ == "__main__":

  
  def reducer(state: Dict, action: TAction):
    if action.type == "INCREASE_KEY_1":
      state["key1"] = state["key1"] + 1
      return state
    if action.type == "INCREASE_KEY_2":
      state["key2"] = state["key2"] + 1
      return state
    if action.type == "INCREASE_KEY_1_BY":
      state["key1"] = state["key1"] + action.payload
      return state
    if action.type == "INCREASE_KEY_2_BY":
      state["key2"] = state["key2"] + action.payload
      return state
    return state


  store = create_store(reducer, {
    "key1": 1,
    "key2": 1,
  })

  store.suscribe(lambda state, action: print("Halleluiah"))
  store.suscribe(lambda state, action: print("Halleluiah", state, action))
  print(store.get_state())
  store.dispatch(TAction("INCREASE_KEY_1", None))
  print(store.get_state())
  store.dispatch(TAction("INCREASE_KEY_2", None))
  print(store.get_state())
  store.dispatch(TAction("INCREASE_KEY_1_BY", -2))
  print(store.get_state())
  store.dispatch(TAction("INCREASE_KEY_2_BY", 2))
  print(store.get_state())
