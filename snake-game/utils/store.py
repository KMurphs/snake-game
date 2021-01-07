from typing import Dict
from redux.redux import TAction
from utils.utils import get_turtle
from utils.types import Point, Direction, Segment, Snake


def get_initial_state():
  return {
    "game": {
      "snake": Snake(head=Segment(head=Point(0,0), direction=Direction.RIGHT, drawer=get_turtle("#1d72eb"), length=3), body=[], tail=None),
      "current_direction": None,
      "is_paused": False,
      "is_invalid": False,
      "speed": 250,
      "obsolete_segments": []
    },
    "score": {
      "pen": get_turtle("#1d72eb"),
      "max": 5,
      "current": 0,
      "is_max": False
    },
    "msg": { "pen": get_turtle("#777") },
    "grid": { "square": 20, "count": 30 },
    "border": { "pen": get_turtle("#5f6f8b"), "corners": [] },
    "crumb": { "pen": get_turtle("#f65f98"), "point": None }
  }


def reducer(state: Dict, action: TAction):
  if action.type == "CHANGE_DIRECTION":
    if action.payload:
      state["game"]["current_direction"] = action.payload
    return state

  if action.type == "INITIALIZE_SCREEN":
    if action.payload:
      state["game"]["screen"] = action.payload
    return state

  if action.type == "CREATED_CRUMB":
    if action.payload:
      state["crumb"]["point"] = action.payload
    return state

  if action.type == "DREW_CURRENT_GAME_STATE":
    state["game"]["obsolete_segments"] = []
    return state
    
  if action.type == "GAME_IS_INVALID":
    state["game"]["is_invalid"] = True
    return state

  if action.type == "RESET_GAME":
    is_max_score = state["score"]["is_max"]
    prev_game_speed = state["game"]["speed"]
    state = get_initial_state()
    if(is_max_score):
      state["game"]["speed"] = prev_game_speed - 50
    return state

  if action.type == "TOGGLE_PAUSE":
    state["game"]["is_paused"] = not state["game"]["is_paused"] 
    return state

  if action.type == "MOVE_SNAKE":
    if action.payload:
      state["game"]["snake"] = action.payload["snake"]
      state["game"]["obsolete_segments"] = state["game"]["obsolete_segments"] + action.payload["obsolete"]
      state["game"]["current_direction"] = None

      if(action.payload["took_crumb"]): 
        state["crumb"]["point"] = None
        state["score"]["current"] = state["score"]["current"] + 1
        state["score"]["is_max"] = state["score"]["current"] == state["score"]["max"]
    return state

  return state


