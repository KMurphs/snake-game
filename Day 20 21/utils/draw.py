from typing import List
from .types import Segment, snake_grid
from .utils import  draw_rectangle, move_point



def draw(current_segments: List[Segment], obsolete_segments: List[Segment]):
  """Will draw the current segments on screen. Function will also
  get each one of the obsolete segments to clear themselves before they
  are discarded for good

  Args:
      currentSegments (List[Segment]): Current segment to draw.
      obsoleteSegments (List[Segment]): Segments about to be discarded. They must clear their drawings first.

  Returns:
      None
  """
  grid = snake_grid

  [segment.drawer.clear() for segment in obsolete_segments if segment is not None]
  [segment.drawer.clear() for segment in current_segments if segment is not None]
  [
    draw_rectangle(
      segment.drawer, 
      segment.head, 
      move_point(segment.head, segment.direction, -1 * (segment.length - 1) * grid), 
      grid
    ) for segment in current_segments if segment is not None
  ]


