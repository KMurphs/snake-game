from turtle import Turtle
import random
from .utils import draw_rectangle, get_turtle
from .types import Point, snake_grid
from .borders import game_grids_count

crumb_pen: Turtle = None
current_crumb: Point = None


def crumb_init():
  global crumb_pen
  crumb_pen = get_turtle("#f65f98") if crumb_pen is None else crumb_pen



def crumb_clear():
  global current_crumb
  while crumb_pen.undobufferentries(): crumb_pen.undo()
  crumb_pen.clear()
  current_crumb = None



def crumb_get():
  global current_crumb

  if current_crumb is None:
    current_crumb = Point(
      round((game_grids_count - 1) * (random.random() - 0.5)) * snake_grid , 
      round((game_grids_count - 1) * (random.random() - 0.5)) * snake_grid
    )
    draw_rectangle(crumb_pen, current_crumb, current_crumb, snake_grid)

  return Point(current_crumb.x, current_crumb.y)
  




