from functools import reduce

from redux.types import TAction
from utils.types import Point, Segment, Snake, Direction
from utils.utils import get_opposite_direction, get_turtle, move_point



class SnakeMover:
  def __init__(self, game_grid, get_snake, get_crumb, get_current_direction, get_game_state, dispatch):
    self.grid = game_grid
    self.get_snake = get_snake
    self.get_crumb = get_crumb
    self.get_current_direction = get_current_direction
    self.get_game_state = get_game_state
    self.dispatch = dispatch



  def run_effects(self): 
    """Main side effect of the snake mover. Given the current direction (pressed by user, or defaults to current snake heading), update the snake model 
    to reflect the fact that it has moved/steped
    """
    passed, failed, paused = self.get_game_state()
    if( passed or failed or paused): return 

    snake, crumb, current_direction, grid = self.get_snake(), self.get_crumb(), self.get_current_direction(), self.grid
    
    new_snake, obsolete_segments, took_crumb = move(snake, current_direction, crumb, grid)
    
    # Obsolete segments are uploaded to store so that someone else responsible for drawing effects can clear them
    # Also notify the store that the current crumb on screen has been swallowed (Eventually, a new one must be provisioned and drawn on screen)
    self.dispatch(TAction("MOVE_SNAKE", {"snake": new_snake, "obsolete": obsolete_segments, "took_crumb": took_crumb}))




def move(snake: Snake, direction: Direction, crumb: Point, grid: int) :#-> Tuple[Snake, List[Segment]]:
  """Will move a snake forward in the direction specified by the 'direction'
  input argument.

  Args:
      snake (Snake): Snake to move
      direction (Direction): Direction in which to move the snake

  Returns:
      [moved_snake, segment_garbage_list]: The segment_garbage must be discarded but 
      might still have things drawn on the screen. Clearing its portion of the screen
      is an effect best handled anywhere but here
  """

  current_length = reduce(lambda acc, x: acc + x.length , [snake.head] + snake.body  + ([] if snake.tail is None else [snake.tail]), 0)

  # Move the head point of the snake in the direction of motion by a distance of 1 unit square
  moved_head = move_point(snake.head.head, direction, grid)

  # If the direction of motion is that of the snake, increase the length
  # of the head segment of the snake
  if(snake.head.direction in [direction, get_opposite_direction(direction)]):
    tmp_head = Segment(
      head = moved_head, 
      direction = direction, 
      drawer = snake.head.drawer, 
      length = snake.head.length + 1
    )
    old_head_container = []

  # Create a new head in a different direction, will push current head to body
  # This ensures that a Segment is always a rectangle
  else:
    tmp_head = Segment(
      head = moved_head, 
      direction = direction, 
      drawer = get_turtle("#1d72eb"), 
      length = 1
    )
    old_head_container = [snake.head]  





  # If there is a new head (i.e. direction changed), the old head joins the body
  tmp_body = [tmp_head] + old_head_container + snake.body + ([] if snake.tail is None else [snake.tail])



  # Handle crumb
  # Get the last valid segment and increase its length
  if crumb == moved_head:
    current_length += 1 # The invariance relationship must target 'current_length + 1' that's how long the snake is now
    i = len(tmp_body) - 1
    while(tmp_body[i] == None): i -= 1
    tmp_body[i] = Segment(
      head = tmp_body[i].head, 
      direction = tmp_body[i].direction, 
      drawer = tmp_body[i].drawer, 
      length = tmp_body[i].length + 1
    )




  # INVARIANT: length before ('current_length') must be length after ('new_length')
  new_length = 0
  i = -1
  while(new_length < current_length):
    i += 1
    new_length = new_length + tmp_body[i].length
    

  # Case 1: new_length = current_length, get rid of everything from i + 1 upward
  # Case 2: new_length > current_length, get rif of everything from i + 1 upward, cut i to fit invariant length
  
  # Length to cut out from i for the total length of the snake to remain constant
  extra_length = new_length - current_length
  
  # Grouping of segments whose total length equal current_length
  adjusted_body = map(
    lambda args: args[1] if args[0] != i else Segment(head = args[1].head, direction = args[1].direction, drawer = args[1].drawer, length = args[1].length - extra_length), 
    enumerate(tmp_body[0 : i + 1])
  )

  # Destructure to get head, tail and body
  new_head, *rest = adjusted_body
  *new_body, new_tail = rest if len(rest) > 0 else [None]

  return (Snake(head = new_head, body = new_body, tail = new_tail), tmp_body[i + 1:], crumb == moved_head)