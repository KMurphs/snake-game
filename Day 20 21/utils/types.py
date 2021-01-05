# from collections import namedtuple
from turtle import Turtle
from typing import List, NamedTuple
from enum import Enum


# https://docs.python.org/3/library/collections.html#collections.namedtuple



snake_grid = 20

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



Point = NamedTuple('Point', [('x', float), ('y', float)])
Rectangle = NamedTuple('Rectange', [('upper_right', float), ('lower_right', float), ('lower_left', float), ('upper_left', float)])
Segment = NamedTuple('Segment', [('head', Point), ('direction', Direction), ('drawer', Turtle),  ('length', int)])
Snake = NamedTuple('Snake', [('head', Segment), ('body', List[Segment]), ('tail', Segment)])


