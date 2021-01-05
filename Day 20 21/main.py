from turtle import Turtle, Screen
from utils.app_types import Point, Direction
from utils.draw_effects import Snake

# turtle = Turtle()
screen = Screen()
screen.delay(0)
screen.tracer(False)

# snake = Snake(heading = 0, body=[Point(0,0), Point(-50,0), Point(-50,-50)])
snake = Snake()
snake.redraw_effect()

print(Direction.from_heading(0))

def move(direction):
  def inner_move():
    snake.move(direction)
    snake.redraw_effect()
    screen.update()
  return inner_move

screen.listen()
screen.onkeypress(move(Direction.UP), "w")
screen.onkeypress(move(Direction.DOWN), "s")
screen.onkeypress(move(Direction.RIGHT), "d")
screen.onkeypress(move(Direction.LEFT), "a")

# draw_snake_body(snake.body)


screen.exitonclick()