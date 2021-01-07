from types import SimpleNamespace
from typing import Any, Callable, Dict, NamedTuple, Tuple


class TStore:
  def __init__(self, **kwargs):
    # self.__dict__.update(kwargs)
    self.get_state: Callable[[], Dict] = kwargs["get_state"]
    self.suscribe:  Callable[[Callable[[Dict, TAction], None]], None] = kwargs["suscribe"]
    self.dispatch: Callable[[TAction], None] = kwargs["dispatch"]

TAction = NamedTuple("TAction", [
  ("type", str),
  ("payload", Any)
], defaults=(None,None))
TReducer = Callable[[Dict, TAction], Dict]
TSuscriber = Callable[[Dict, TAction], None]

# https://stackoverflow.com/a/39440252/9034699
def create_store(reducer: TReducer, initial_state: Dict):
  current_state = frozenset(initial_state.items())
  suscribers: Tuple[TSuscriber] = tuple()
  is_dispatching = False


  def get_state(): return dict(current_state) 

  def suscribe(f):
    nonlocal suscribers
    suscribers = suscribers + tuple([f])

  def dispatch(action: TAction):
    nonlocal is_dispatching, suscribers, current_state

    if is_dispatching: Exception("Store is still dispatching previous action")
    is_dispatching = True

    try: 
      next_state = reducer(dict(current_state), action)
      if next_state:
        current_state = frozenset(next_state.items())
        [suscriber(dict(current_state), action) for suscriber in suscribers]

    finally: 
      is_dispatching = False
      
    
  return TStore(
    get_state = get_state,
    suscribe = suscribe,
    dispatch = dispatch
  )







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



if __name__ == "__main__":
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
