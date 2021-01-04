from collections import namedtuple

# https://docs.python.org/3/library/collections.html#collections.namedtuple
Snake = namedtuple('Snake', ['heading', 'body'])
Point = namedtuple('Point', ['x', 'y'])
Rectangle = namedtuple('Rectange', ['upper_right', 'lower_right', 'lower_left', 'upper_left'])