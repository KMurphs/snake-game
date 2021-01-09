# from collections import namedtuple
from turtle import Turtle
from typing import List, NamedTuple
from enum import Enum






class Direction(Enum):
  """Enum used to encode allowed directions: Up, down, left, right
  """
  UP = 1
  RIGHT = 2
  DOWN = 3
  LEFT = 4


# https://docs.python.org/3/library/collections.html#collections.namedtuple

Point = NamedTuple('Point', [('x', float), ('y', float)])
Rectangle = NamedTuple('Rectange', [('upper_right', float), ('lower_right', float), ('lower_left', float), ('upper_left', float)])

# A segment has a point (of origin) 'head', a length and a direction (up, down, left, right)
# Note that the end point of the segment is not store in this structure. It can be computed using the data inside the structure.
# A segment also has its own drawer. This drawer is the only thing that can draw a segment on screen or erase it
Segment = NamedTuple('Segment', [('head', Point), ('direction', Direction), ('drawer', Turtle),  ('length', int)])

# A snake is a 3 part being (of segments). The head is segment, the body is a collection of segments perpendicular to their direct predecessors/successors, and a tail which is also a segment.
# In all cases, when the snake moves, only the head and the tail must be redrawn on screen. The rest of the body doesn't visibly (on screen) change
Snake = NamedTuple('Snake', [('head', Segment), ('body', List[Segment]), ('tail', Segment)])


