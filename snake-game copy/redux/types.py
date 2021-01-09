from typing import Any, Callable, Dict, NamedTuple


class TStore:
  def __init__(self, **kwargs):
    # self.__dict__.update(kwargs)
    self.get_state: Callable[[], Dict] = kwargs["get_state"]
    self.suscribe:  Callable[[Callable[[Dict, TAction], None]], None] = kwargs["suscribe"]
    self.dispatch: Callable[[TAction], None] = kwargs["dispatch"]

TAction = NamedTuple("TAction", [
  ("type", str),
  ("payload", Any)
])
TReducer = Callable[[Dict, TAction], Dict]
TSuscriber = Callable[[Dict, TAction], None]