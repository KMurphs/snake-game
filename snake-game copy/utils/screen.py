from turtle import Screen, _Screen
from utils.types import Direction, Snake
from redux.types import TAction, TStore
from utils.utils import are_directions_parallel



def get_screen():
  
  screen = Screen()
  screen.delay(0)
  screen.tracer(False)
  screen.bgcolor("#eaf4ff")

  return screen



def schedule_move(store: TStore, direction):
  """Binds the inner function to a specific direction. This inner function will become the callback that responds to the user input/event

  Args:
      store (TStore): Data store
      direction ([type]): direction that matches the key pressed by the user
  """
  def inner_move():
    """Notify the store, that the user wants the snakes to move in a specific function at the next game tick
    """
    
    curr = store.get_state()
    snake: Snake = curr["game"]["snake"]

    if(not are_directions_parallel(direction, snake.head.direction)):
      store.dispatch(TAction("CHANGE_DIRECTION", direction))

  return inner_move





class GameScreen():

  def __init__(self, dispatch, on_reset_cb):
    self.screen: _Screen = get_screen()
    self.reset = lambda: [ on_reset_cb(), dispatch(TAction("RESET_GAME", None)) ]
    self.pause = lambda: dispatch(TAction("TOGGLE_PAUSE", None))
  
  def run_effects(self, store):
    """Main effect for the screen object wrapper. Set up the event listeners and enter an infinite while loop

    Args:
        store ([type]): [description]
    """
    self.screen.listen()
    self.screen.onkeypress(schedule_move(store, Direction.UP), "Up")
    self.screen.onkeypress(schedule_move(store, Direction.DOWN), "Down")
    self.screen.onkeypress(schedule_move(store, Direction.RIGHT), "Right")
    self.screen.onkeypress(schedule_move(store, Direction.LEFT), "Left")
    self.screen.onkeypress(self.reset, "r")
    self.screen.onkeypress(self.pause, "space")

    self.screen.mainloop()