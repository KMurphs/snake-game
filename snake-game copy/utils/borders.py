# from turtle import Turtle
from utils.types import Direction, Point, Segment
from utils.utils import  get_square_corners_from_center, get_turtle





class GameBorders():
  def __init__(self, game_grid: int, game_grids_count: int):
    """Build Game borders as Segment and collect them. 
    
    Drawing is a side effect and is left to be executed somewhere else. This function strives to behave as a pure function as much as possible.

    Args:
        game_grid (int): Size of the atomic square of the game grid
        game_grids_count (int): Number of game_grid squares along each side of the (square) game board
    """
    game_size = game_grids_count * game_grid

    self.drawer = get_turtle("#5f6f8b")

    game_corners = get_square_corners_from_center(Point(0, 0), game_size)

    self.borders = [
      Segment(head = game_corners.upper_right, direction = Direction.UP,    drawer = self.drawer, length = game_grids_count),
      Segment(head = game_corners.lower_right, direction = Direction.RIGHT, drawer = self.drawer, length = game_grids_count),
      Segment(head = game_corners.lower_left,  direction = Direction.DOWN,  drawer = self.drawer, length = game_grids_count),
      Segment(head = game_corners.upper_left,  direction = Direction.LEFT,  drawer = self.drawer, length = game_grids_count),
    ]


