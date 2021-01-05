from turtle import Turtle, Screen
from utils.app_types import Snake, Point
from utils.draw_body import draw_snake_body

# turtle = Turtle()
screen = Screen()


snake = Snake(heading = 0, body=[Point(0,0), Point(-50,0), Point(-50,-50)])





draw_snake_body(snake.body)


screen.exitonclick()