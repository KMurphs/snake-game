from typing import List
from functools import reduce

from redux.types import TAction
from utils.types import Direction, Point, Segment
from utils.utils import  move_point

class GameArbitror():
  def __init__(self, grid, game_borders, get_snake, dispatch, suscribe):
    self.grid = grid
    self.get_snake = get_snake
    self.dispatch = dispatch
    self.game_borders = game_borders
    suscribe(lambda state, action: (action.type == "MOVE_SNAKE") and self.check_game())


  def check_game(self):
    snake = self.get_snake()
    
    if not is_game_valid(snake.head.head, snake.body + ([] if snake.tail is None else [snake.tail]) + self.game_borders, self.grid):
      self.dispatch(TAction("GAME_IS_INVALID", None))




def is_game_valid(head: Point, segments: List[Segment], grid):
  """Will verify that the current point 'p' does not 
  intersect wth any of the segment from 'segments'

  Args:
      p (Point): Point being checked.
      segments (List[Segment]): Segments that must not intercept p in order for the function to return true

  Returns:
      None
  """

  return reduce(lambda acc, segment: acc and are_disjoint(head, segment, grid), segments, True)


def are_disjoint(p: Point, segment: Segment, snake_grid: int):
  if(segment.direction in [Direction.UP, Direction.DOWN]):
    if(segment.head.x != p.x): return True

    head, tail = segment.head, move_point(segment.head, segment.direction, -1 * segment.length * snake_grid)
    high, low = [head, tail] if head.y > tail.y else [tail, head]
    if(high.y >= p.y and low.y <= p.y): return False

    return True

  if(segment.direction in [Direction.LEFT, Direction.RIGHT]):
    if(segment.head.y != p.y): return True

    head, tail = segment.head, move_point(segment.head, segment.direction, -1 * segment.length * snake_grid)
    high, low = [head, tail] if head.x > tail.x else [tail, head]
    if(high.x >= p.x and low.x <= p.x): return False

    return True









