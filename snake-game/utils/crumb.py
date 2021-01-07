from turtle import Turtle
import random

from redux.types import TAction
from utils.utils import draw_rectangle
from utils.types import Point


def create_crumb(game_grid: int, game_grids_count: int):
  """Create a random crumb anywhere on the screen within the boundaries defined by the game borders.

  Args:
      game_grid (int): size of the grid square of the game board  
      game_grids_count (int): the game board is assumed to be a square itself. Each side has 'game_grids_count' grid squares

  Returns:
      [Point]: A Point anywhere in the game board but within the boundaries
  """
  return Point(
    round((game_grids_count - 1) * (random.random() - 0.5)) * game_grid , 
    round((game_grids_count - 1) * (random.random() - 0.5)) * game_grid
  )



class CrumbDrawer:
  def __init__(self, drawer, game_grid, game_grid_count, get_crumb, get_game_state, dispatch, suscribe):
    self.drawer: Turtle = drawer
    self.grid = game_grid
    self.grid_count = game_grid_count
    self.get_crumb = get_crumb
    self.get_game_state = get_game_state
    self.dispatch = dispatch

    # Erase the current crumb on screen when the state store indicates that the current one has been "swallowed"
    suscribe(lambda state, action: self.run_clear_effect(get_crumb() == None) )



  def run_effects(self): 
    """Crumb's main side effect. 
    If the current crumb was erased, generate and draw a new random one, and push this new crumb to the state store
    """
    passed, failed, paused = self.get_game_state()
    if( passed or failed or paused): return 
    
    grid_count, crumb, grid = self.grid_count, self.get_crumb(), self.grid

    
    if crumb == None:
      crumb = create_crumb(grid, grid_count)
      draw_rectangle(self.drawer, crumb, crumb, grid)
      self.dispatch(TAction("CREATED_CRUMB", crumb))
      



  def run_clear_effect(self, do_clear):
    """Erases the crumb drawing from the board.

    Args:
        do_clear ([bool]): little hack to allow this function to be used with lambdas
    """
    if not do_clear: return
    while self.drawer.undobufferentries(): self.drawer.undo()
    self.drawer.clear()













