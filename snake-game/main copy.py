print('__file__={0:<50} | __name__={1:<20} | __package__={2:<20}'.format(__file__,__name__,str(__package__)))
# https://stackoverflow.com/questions/14132789/relative-imports-for-the-billionth-time
# https://napuzba.com/a/import-error-relative-no-parent/p3
# https://github.com/microsoft/pylance-release/issues/236#issuecomment-727575436
from turtle import Screen, _Screen

from utils.types import Point, Direction, Segment, Snake
from utils.utils import are_directions_opposite, get_turtle
from utils.move import move
from utils.draw import draw
from utils.check import is_game_valid
from utils.borders import game_borders
from utils.crumb import crumb_clear, crumb_get, crumb_init
from utils.header import header_game_msg, header_init, header_paused_msg
from utils.score import score_increase, score_init, score_write_final_results




snake: Snake = None
screen: _Screen = None
current_direction: Direction = None
terminated: bool = False
paused: bool = False
speed: int = 250
reached_max_score: bool = False

def pause(): 
  global paused
  paused = not paused
  if(paused): header_paused_msg()
  else: header_game_msg()

def get_screen():

  screen = Screen()
  screen.delay(0)
  screen.tracer(False)
  screen.bgcolor("#eaf4ff")

  screen.listen()
  screen.onkeypress(schedule_move(Direction.UP), "Up")
  screen.onkeypress(schedule_move(Direction.DOWN), "Down")
  screen.onkeypress(schedule_move(Direction.RIGHT), "Right")
  screen.onkeypress(schedule_move(Direction.LEFT), "Left")
  screen.onkeypress(reset, "r")
  screen.onkeypress(pause, "space")

  return screen



def schedule_move(direction):
  def inner_move():
    global current_direction
    current_direction = current_direction if are_directions_opposite(direction, snake.head.direction) else direction
  return inner_move



def auto_move():
  global snake, current_direction, terminated, speed, reached_max_score
  if paused: 
    return screen.ontimer(auto_move, speed)
    

  if not terminated:
    snake, obsolete_segments, took_crumb = move(snake, snake.head.direction if current_direction is None else current_direction, crumb_get())
    
    if not is_game_valid(snake.head.head, snake.body + ([] if snake.tail is None else [snake.tail]) + game_borders):
      score_write_final_results()
      terminated = True
      return

    if took_crumb: 
      crumb_clear()
      reached_max_score = score_increase()
      if reached_max_score: 
        screen.update()
        speed -= 25
        return
    draw([snake.head, snake.tail], obsolete_segments)
    screen.update()
    current_direction = None
    screen.ontimer(auto_move, speed)

      



def reset():
  global screen, speed

  if not reached_max_score:
    speed = 250

  draw([], [snake.head] + snake.body + ([] if snake.tail is None else [snake.tail]))
  screen.update()
  screen = get_screen()
  start()

  



def start():
  global snake, terminated, reached_max_score

  terminated = False
  reached_max_score = False
  crumb_init()
  header_init()
  score_init()

  snake = Snake(head=Segment(head=Point(0,0), direction=Direction.RIGHT, drawer=get_turtle("#1d72eb"), length=3), body=[], tail=None)
  draw(game_borders + [snake.head], [])

  auto_move()




if __name__ == "__main__":
  screen = get_screen()
  start()
  # screen.exitonclick()
  screen.mainloop()
  







