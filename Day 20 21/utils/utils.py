print('__file__={0:<50} | __name__={1:<20} | __package__={2:<20}'.format(__file__,__name__,str(__package__)))


from turtle import Turtle, Screen
from typing import List
from .types import Point, Rectangle, Direction

def get_straight_line_vector(src_pos: Point, dst_pos: Point):
  if(str(src_pos) == str(dst_pos)): return [0, 0]
  if(src_pos.x == dst_pos.x):
    delta_vertical = dst_pos.y - src_pos.y
    return [delta_vertical, 90] if delta_vertical > 0 else [-1 * delta_vertical, -90]
  elif (src_pos.y == dst_pos.y):
    delta_horizontal = dst_pos.x - src_pos.x
    return [delta_horizontal, 0] if delta_horizontal > 0 else [-1 * delta_horizontal, 180]
  else:
    Exception("Snake can only move vertically")


def get_turtle(color = "black"):
  """Will create and format a turtle for use

  Args:
      color (str, optional): A Color for the turtle drawings. Defaults to "black".

  Returns:
      Turtle: A Formatted turtle ready to use
  """
  turtle = Turtle(visible=False)
  turtle.speed(0)
  turtle.color(color, color)
  
  return turtle

def get_point_corners(p: Point, square_side: int = 10):
  half_square_side = square_side/2
  return Rectangle(
    upper_right = Point(x = p.x + half_square_side, y = p.y + half_square_side),
    lower_right = Point(x = p.x + half_square_side, y = p.y - half_square_side),
    lower_left = Point(x = p.x - half_square_side, y = p.y - half_square_side),
    upper_left = Point(x = p.x - half_square_side, y = p.y + half_square_side),
  )

def get_line_corners(p0: Point, p1: Point, square_side: int = 10):
  half_square_side = square_side/2
  if(p0[0] == p1[0]):
    upper = p0 if p0[1] > p1[1] else p1
    lower = p1 if p0[1] > p1[1] else p0
    upper_corners = get_point_corners(upper, square_side)
    lower_corners = get_point_corners(lower, square_side)
    return Rectangle(
      upper_right = upper_corners.upper_right,
      lower_right = lower_corners.lower_right,
      lower_left = lower_corners.lower_left,
      upper_left = upper_corners.upper_left,
    )
  elif (p0[1] == p1[1]):
    right = p0 if p0[0] > p1[0] else p1
    left = p1 if p0[0] > p1[0] else p0
    right_corners = get_point_corners(right, square_side)
    left_corners = get_point_corners(left, square_side)
    return Rectangle(
      upper_right = right_corners.upper_right,
      lower_right = right_corners.lower_right,
      lower_left = left_corners.lower_left,
      upper_left = left_corners.upper_left,
    )
  else:
    Exception("Snake can only move vertically")


def draw_snake_body(body: List, drawer = None):
  turtle = drawer if drawer is not None else get_turtle()
  first, *rest = body

  if len(rest) == 0: return

  upper_right, lower_right, lower_left, upper_left = get_line_corners(first, rest[0])
  
  turtle.penup()
  turtle.goto(upper_right)
  turtle.pendown()
  

  turtle.begin_fill()
  turtle.goto(lower_right)
  turtle.goto(lower_left)
  turtle.goto(upper_left)
  turtle.goto(upper_right)
  turtle.end_fill()

  draw_snake_body(rest, turtle)

def draw_rectangle(turtle: Turtle, p0: Point, p1: Point, grid_size: int = 10):

  upper_right, lower_right, lower_left, upper_left = get_line_corners(p0, p1, grid_size)
  
  turtle.penup()
  turtle.goto(upper_right)
  turtle.pendown()
  
  turtle.begin_fill()
  turtle.goto(lower_right)
  turtle.goto(lower_left)
  turtle.goto(upper_left)
  turtle.goto(upper_right)
  turtle.end_fill()






def move_point(p: Point, direction: Direction, distance: float):
  """Moves the point 'p' along 'direction' by an amount 'distance'.

  Args:
      p (Point): The Point to move
      direction (Direction): The direction of movement
      distance (float): The distance by which to move the point

  Returns:
      Point: A new point sitting at the destination position (where p would have been moved)
  """

  # Utility functions
  def move_point_horizontally(p: Point, distance: float): return Point(p.x + distance, p.y)
  def move_point_vertically(p: Point, distance: float): return Point(p.x, p.y + distance)

  if(direction == Direction.UP): return move_point_vertically(p, distance)
  if(direction == Direction.DOWN): return move_point_vertically(p, -1 * distance)
  if(direction == Direction.LEFT): return move_point_horizontally(p, -1 * distance)
  if(direction == Direction.RIGHT): return move_point_horizontally(p, distance)
  
  # if direction is not recognized, return the point passed as  input
  return p


def are_directions_opposite(dir1: Direction, dir2: Direction):
  """Given two directions, return true if they are opposite, e.g. up and down

  Args:
      dir1 (Direction): Direction Enum Value
      dir2 (Direction): Direction Enum Value

  Returns:
      boolean: True when directions are opposite else False
  """
  if(dir1 == Direction.UP and dir2 == Direction.DOWN): return True
  if(dir1 == Direction.DOWN and dir2 == Direction.UP): return True
  if(dir1 == Direction.LEFT and dir2 == Direction.RIGHT): return True
  if(dir1 == Direction.RIGHT and dir2 == Direction.LEFT): return True
  return False

def get_opposite_direction(dir1: Direction):
  """Given a directions, return its opposite, e.g. f(up) = down

  Args:
      dir1 (Direction): Direction Enum Value

  Returns:
      Direction: Direction Enum Value
  """
  if(dir1 == Direction.UP): return Direction.DOWN
  if(dir1 == Direction.DOWN): return Direction.UP
  if(dir1 == Direction.LEFT): return Direction.RIGHT
  if(dir1 == Direction.RIGHT): return Direction.LEFT
  return dir1