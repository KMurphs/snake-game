from typing import List
from functools import reduce
from .types import Direction, Point, Segment, snake_grid
from .utils import  draw_rectangle, move_point



def is_point_valid(p: Point, segments: List[Segment]):
  """Will verify that the current point 'p' does not 
  intersect wth any of the segment from 'segments'

  Args:
      p (Point): Point being checked.
      segments (List[Segment]): Segments that must not intercept p in order for the function to return true

  Returns:
      None
  """
  grid = snake_grid

  reduce(lambda acc, segment: acc and are_disjoint(p, segment, grid), segments, True)


def are_disjoint(p: Point, segment: Segment, snake_grid: int):
  if(segment.direction in [Direction.UP, Direction.DOWN]):
    if(segment.head.x != p.x): return False

    head, tail = segment.head, move_point(segment.head, segment.direction, segment.length * snake_grid)
    high, low = [head, tail] if head.y > tail.y else [tail, head]
    if(high.y >= p.y and low.y <= p.y): return True

    return False

  if(segment.direction in [Direction.LEFT, Direction.RIGHT]):
    if(segment.head.y != p.y): return False

    head, tail = segment.head, move_point(segment.head, segment.direction, segment.length * snake_grid)
    high, low = [head, tail] if head.x > tail.x else [tail, head]
    if(high.x >= p.x and low.x <= p.x): return True

    return False