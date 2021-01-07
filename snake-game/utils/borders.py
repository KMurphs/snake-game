# from turtle import Turtle
from utils.types import Direction, Point, Segment
from utils.utils import  get_square_corners_from_center, get_turtle





class GameBorders():
  def __init__(self, game_grid: int, game_grids_count: int):
    game_size = game_grids_count * game_grid

    self.drawer = get_turtle("#5f6f8b")

    game_corners = get_square_corners_from_center(Point(0, 0), game_size)

    # self.upper_right = Point(game_size//2, game_size//2)
    # self.lower_right = move_point(self.upper_right, Direction.DOWN, game_size)
    # self.lower_left = move_point(self.lower_right, Direction.LEFT, game_size)
    # self.upper_left = move_point(self.lower_left, Direction.UP, game_size)

    # self.upper_right = game_corners.upper_right
    # self.lower_right = game_corners.lower_right
    # self.lower_left = game_corners.lower_left
    # self.upper_left = game_corners.upper_left

    self.borders = [
      Segment(head = game_corners.upper_right, direction = Direction.UP,    drawer = self.drawer, length = game_grids_count),
      Segment(head = game_corners.lower_right, direction = Direction.RIGHT, drawer = self.drawer, length = game_grids_count),
      Segment(head = game_corners.lower_left,  direction = Direction.DOWN,  drawer = self.drawer, length = game_grids_count),
      Segment(head = game_corners.upper_left,  direction = Direction.LEFT,  drawer = self.drawer, length = game_grids_count),
    ]


