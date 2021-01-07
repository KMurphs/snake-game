from turtle import Turtle
import random

from redux.types import TAction
from utils.utils import draw_rectangle
from utils.types import Point


def create_crumb(game_grid: int, game_grids_count: int):
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
    suscribe(lambda state, action: self.run_clear_effect(get_crumb() == None) )



  def run_effects(self): 
    passed, failed, paused = self.get_game_state()
    if( passed or failed or paused): return 
    
    grid_count, crumb, grid = self.grid_count, self.get_crumb(), self.grid

    if crumb == None:
      crumb = create_crumb(grid, grid_count)
      self.dispatch(TAction("CREATED_CRUMB", crumb))
      draw_rectangle(self.drawer, crumb, crumb, grid)



  def run_clear_effect(self, do_clear):
    if not do_clear: return
    while self.drawer.undobufferentries(): self.drawer.undo()
    self.drawer.clear()













