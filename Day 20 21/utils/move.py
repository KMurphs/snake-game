from functools import reduce
from typing import List, Tuple
from .types import Point, Segment, Snake, Direction, snake_grid
from .utils import are_directions_opposite, get_opposite_direction, get_turtle, move_point



def move(snake: Snake, direction: Direction, crumb: Point) :#-> Tuple[Snake, List[Segment]]:
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
  grid = snake_grid
  current_length = reduce(lambda acc, x: acc + x.length , [snake.head] + snake.body  + ([] if snake.tail is None else [snake.tail]), 0)


  # Do not attempt to move down a snake that's moving up
  # if(are_directions_opposite(snake.head.direction, direction)): return (snake, [])
  
  # If the direction of motion is tha tof the snake, increease the length
  # of the head segment of the snake
  moved_head = move_point(snake.head.head, direction, grid)

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





  # If there is a new head, the old head joins the body
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




  # INVARIANT: length before 'current_length' must be length after 'new_length'
  new_length = 0
  i = -1
  while(new_length < current_length):
    i += 1
    new_length = new_length + tmp_body[i].length
    

  # Case 1: new_length = current_length, get rid of everything from i + 1 upward
  # Case 2: new_length > current_length, get rif of everything from i + 1 upward, cut i to fit invariant length
  
  # Length tocut out from i
  extra_length = new_length - current_length
  
  # Body of segments whose total length equal current_length
  adjusted_body = map(
    lambda args: args[1] if args[0] != i else Segment(head = args[1].head, direction = args[1].direction, drawer = args[1].drawer, length = args[1].length - extra_length), 
    enumerate(tmp_body[0 : i + 1])
  )

  # Destructure to get head, tail and body
  new_head, *rest = adjusted_body
  *new_body, new_tail = rest if len(rest) > 0 else [None]

  return (Snake(head = new_head, body = new_body, tail = new_tail), tmp_body[i + 1:], crumb == moved_head)