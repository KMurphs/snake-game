
from turtle import Turtle
from utils.types import Point, Rectangle, Direction






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




def get_square_corners_from_center(p: Point, square_side: int = 10):
  """Given a point with coordinates x, y, draw a grid square of size 'square_side' around the point (as center)
  and return the coordinates of its four corners.

  Args:
      p (Point): Coordinate of the center of the individual grid square
      square_side (int, optional): The size of the square that must be drawn around the center. Defaults to 10.

  Returns:
      Rectangle: Coordinates of the four corners of the grid square drawn (and centered around the argument p)
  """
  half_square_side = square_side/2
  return Rectangle(
    upper_right = Point(x = p.x + half_square_side, y = p.y + half_square_side),
    lower_right = Point(x = p.x + half_square_side, y = p.y - half_square_side),
    lower_left = Point(x = p.x - half_square_side, y = p.y - half_square_side),
    upper_left = Point(x = p.x - half_square_side, y = p.y + half_square_side),
  )


def get_line_corners(p0: Point, p1: Point, square_side: int = 10):
  """Given a two points sitting in the middle of their respective grid squares,
  return the four corners of the grid line that join both grid squares.

  Args:
      p0 (Point): Center of first grid square
      p1 (Point): Center of second grid square
      square_side (int, optional): The size of the square that must be drawn around both centers. Defaults to 10.

  Returns:
      Rectangle: Coordinates of the four corners of the grid line drawn (and whose extremities are centered around the arguments p0 and p1)
  """

  if(p0[0] == p1[0]):
    upper = p0 if p0[1] > p1[1] else p1
    lower = p1 if p0[1] > p1[1] else p0
    upper_corners = get_square_corners_from_center(upper, square_side)
    lower_corners = get_square_corners_from_center(lower, square_side)
    return Rectangle(
      upper_right = upper_corners.upper_right,
      lower_right = lower_corners.lower_right,
      lower_left = lower_corners.lower_left,
      upper_left = upper_corners.upper_left,
    )

  elif (p0[1] == p1[1]):
    right = p0 if p0[0] > p1[0] else p1
    left = p1 if p0[0] > p1[0] else p0
    right_corners = get_square_corners_from_center(right, square_side)
    left_corners = get_square_corners_from_center(left, square_side)
    return Rectangle(
      upper_right = right_corners.upper_right,
      lower_right = right_corners.lower_right,
      lower_left = left_corners.lower_left,
      upper_left = left_corners.upper_left,
    )

  else:
    Exception("Snake can only move vertically")




def draw_rectangle(turtle: Turtle, p0: Point, p1: Point, grid_size: int = 10):
  """Given a two points sitting in the middle of their respective grid squares,
  draw the grid line whose grid square extremities have p0 and p1 as centers.

  Args:
      turtle (Turtle): Drawer object
      p0 (Point): Center of first extremity
      p1 (Point): Center of second extremity
      grid_size (int, optional): The size of the square that must be drawn as the grid. Defaults to 10.
  """

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





def are_directions_parallel(dir1: Direction, dir2: Direction):
  """Given two directions, return true if they are parallel to each other, e.g. up and down

  Args:
      dir1 (Direction): Direction Enum Value
      dir2 (Direction): Direction Enum Value

  Returns:
      boolean: True when directions are opposite else False
  """
  horizontal_directions = [ Direction.UP, Direction.DOWN ]
  vertical_directions = [ Direction.LEFT, Direction.RIGHT ]
  if((dir1 in horizontal_directions) and (dir2 in horizontal_directions)): return True
  if((dir1 in vertical_directions) and (dir2 in vertical_directions)): return True
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