from typing import List

from redux.types import TAction
from utils.types import Segment
from utils.utils import  draw_rectangle, move_point



class GameDrawer:
  def __init__(self, game_grid, get_snake, get_obsolete_segments, get_game_state, dispatch):
    self.grid = game_grid
    self.get_snake = get_snake
    self.get_obsolete_segments = get_obsolete_segments
    self.get_game_state = get_game_state
    self.dispatch = dispatch



  def run_effects(self): 
    """Main side effect of the snake drawer. It draws the updated snake and cleans up anything on the screen and out of place that belonged to the old one.
    """
    passed, failed, paused = self.get_game_state()
    if( passed or failed or paused): return 

    snake, obsolete_segments, grid = self.get_snake(), self.get_obsolete_segments(), self.grid
    
    draw([snake.head, snake.tail], obsolete_segments, grid)
    
    self.dispatch(TAction("DREW_CURRENT_GAME_STATE", None))
    


def draw(current_segments: List[Segment], obsolete_segments: List[Segment], grid: int):
  """Will draw the current segments on screen. Function will also
  get each one of the obsolete segments to clear themselves before they
  are discarded for good

  Args:
      currentSegments (List[Segment]): Current segment to draw.
      obsoleteSegments (List[Segment]): Segments about to be discarded. They must clear their drawings first.

  Returns:
      None
  """

  [segment.drawer.clear() for segment in obsolete_segments if segment is not None]
  [segment.drawer.clear() for segment in current_segments if segment is not None]
  [
    draw_rectangle(
      segment.drawer, 
      segment.head, 
      # The line below will compute the point that is behind segment.head and at a distance specififed by length
      move_point(segment.head, segment.direction, -1 * (segment.length - 1) * grid), 
      grid
    ) for segment in current_segments if segment is not None
  ]


