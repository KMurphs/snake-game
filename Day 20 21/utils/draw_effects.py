from utils.app_types import Point
from utils.app_utils import *

snake_grid = 20


class SegmentEffect:
  def __init__(self, start: Point, end: Point):
    self.__start = start
    self.__end = end
    self.drawer = get_turtle()

  def get_start_point(self): return self.__start
  def set_start_point(self, p: Point): self.__start = p
  def get_end_point(self): return self.__end
  def set_end_point(self, p: Point): self.__end = p

  def redraw_effect(self, grid):
    self.drawer.clear()
    draw_rectangle(self.drawer, self.__start, self.__end, grid)

  def get_heading(self):
    distance, heading = get_straight_line_vector(self.__end, self.__start)
    return heading


class Snake:
  def __init__(self):
    global snake_grid
    self.segments = [SegmentEffect(Point(0,0), Point(-1 * 3 * snake_grid,0))]

  def move(self, direction: Direction, must_grow = False):
    global snake_grid


    curr_first = self.segments[0]
    new_point = move_point(curr_first.get_start_point(), direction, snake_grid)

    if(SegmentEffect(new_point, curr_first.get_end_point()).get_heading() == curr_first.get_heading()): 
      self.segments[0].set_start_point(new_point)
    else:
      self.segments = [SegmentEffect(new_point, curr_first.get_start_point())] + self.segments


    if not must_grow:
      curr_last = self.segments[len(self.segments) - 1]
      new_point = move_point(curr_last.get_end_point(), Direction.from_heading(curr_last.get_heading()), snake_grid)

      if(str(new_point) == str(curr_last.get_start_point())):
        self.segments.pop()
      else:
        self.segments[len(self.segments) - 1].set_end_point(new_point)


  def redraw_effect(self):
    global snake_grid
    self.segments[0].redraw_effect(snake_grid)
    if len(self.segments) > 1:
      self.segments[len(self.segments) - 1].redraw_effect(snake_grid)