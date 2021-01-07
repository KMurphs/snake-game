from turtle import Turtle
from .utils import get_turtle
from .types import snake_grid
from .borders import game_size

header_pen: Turtle = None



def header_init():
  global header_pen
  header_pen = get_turtle("#777")
  header_game_msg()


def header_write(msg: str):
  
  if header_pen == None: header_init()

  header_pen.clear()
  header_pen.penup()
  header_pen.goto((-1 * game_size//2 - snake_grid // 2, game_size//2 + snake_grid // 2))
  header_pen.pendown()
  header_pen.write(msg, False, align="left", font=("Arial", 13, "normal"))


def header_game_msg(): header_write("Use Arrows to move, 'space' to pause, 'r' to restart ")
def header_paused_msg(): header_write("Press 'space' to resume ")
  
