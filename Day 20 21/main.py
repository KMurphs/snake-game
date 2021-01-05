print('__file__={0:<50} | __name__={1:<20} | __package__={2:<20}'.format(__file__,__name__,str(__package__)))
# https://stackoverflow.com/questions/14132789/relative-imports-for-the-billionth-time
# https://napuzba.com/a/import-error-relative-no-parent/p3
# https://github.com/microsoft/pylance-release/issues/236#issuecomment-727575436
from turtle import Screen
from utils.types import Point, Direction, Segment, Snake
from utils.utils import get_turtle
from utils.move import move
from utils.draw import draw
from utils.borders import game_borders

# turtle = Turtle()
screen = Screen()
screen.delay(0)
screen.tracer(False)


snake = Snake(head=Segment(head=Point(0,0), direction=Direction.RIGHT, drawer=get_turtle(), length=3), body=[], tail=None)
draw(game_borders + [snake.head], [])


def outer_move(direction):
  def inner_move():
    global snake, screen
    snake, obsolete_segments = move(snake, direction)
    draw([snake.head, snake.tail], obsolete_segments)
    screen.update()
  return inner_move

screen.listen()
screen.onkeypress(outer_move(Direction.UP), "w")
screen.onkeypress(outer_move(Direction.DOWN), "s")
screen.onkeypress(outer_move(Direction.RIGHT), "d")
screen.onkeypress(outer_move(Direction.LEFT), "a")




screen.exitonclick()