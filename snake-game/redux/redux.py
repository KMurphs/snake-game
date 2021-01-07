from typing import Dict, Tuple
from redux.types import TAction, TReducer, TStore, TSuscriber




# https://stackoverflow.com/a/39440252/9034699
def create_store(reducer: TReducer, initial_state: Dict):
  current_state = initial_state
  suscribers: Tuple[TSuscriber] = tuple()
  is_dispatching = False


  def get_state(): return current_state.copy()

  def suscribe(f):
    nonlocal suscribers
    suscribers = suscribers + tuple([f])

  def dispatch(action: TAction):
    nonlocal is_dispatching, suscribers, current_state

    if is_dispatching: Exception("Store is still dispatching previous action")
    is_dispatching = True

    try: 
      next_state = reducer(current_state.copy(), action)
      if next_state:
        # current_state = frozenset(next_state.items())
        current_state = next_state.copy()
        [suscriber(next_state, action) for suscriber in suscribers]

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
