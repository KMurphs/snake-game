# from turtle import Turtle
from .types import Direction, Point, Segment, snake_grid
from .utils import  get_turtle, move_point

game_grid = snake_grid
game_grids_count = 30
game_size = game_grids_count * game_grid
# game_size = 100

# turtle = Turtle()
# turtle.goto((game_size//2, game_size//2))

upper_right = Point(game_size//2, game_size//2)
lower_right = move_point(upper_right, Direction.DOWN, game_size)
lower_left = move_point(lower_right, Direction.LEFT, game_size)
upper_left = move_point(lower_left, Direction.UP, game_size)

drawer = get_turtle("Blue")

game_borders = [
  Segment(head = upper_right, direction = Direction.UP, drawer = drawer, length = game_grids_count),
  Segment(head = lower_right, direction = Direction.RIGHT, drawer = drawer, length = game_grids_count),
  Segment(head = lower_left, direction = Direction.DOWN, drawer = drawer, length = game_grids_count),
  Segment(head = upper_left, direction = Direction.LEFT, drawer = drawer, length = game_grids_count),
]
