from collections import namedtuple
from enum import Enum


# https://docs.python.org/3/library/collections.html#collections.namedtuple
# Snake = namedtuple('Snake', 'segments')
Point = namedtuple('Point', ['x', 'y'])
Rectangle = namedtuple('Rectange', ['upper_right', 'lower_right', 'lower_left', 'upper_left'])


class Direction(Enum):
  UP = 1
  RIGHT = 2
  DOWN = 3
  LEFT = 4

  @staticmethod
  def from_heading(heading: float):
    if(int(heading) ==   0): return Direction.RIGHT
    if(int(heading) ==  90): return Direction.UP
    if(int(heading) == -90): return Direction.DOWN
    if(int(heading) == 180): return Direction.LEFT
    if(int(heading) == 270): return Direction.DOWN
    if(int(heading) == 360): return Direction.RIGHT



