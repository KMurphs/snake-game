from turtle import Turtle, Screen
import random
import colorgram
from typing import List

def reset_screen(my_turtle_screen: Turtle, my_turtle: Turtle):
  my_turtle.home()
  my_turtle_screen.clearscreen()
  
  

def get_turtle():
  # https://cs111.wellesley.edu/labs/lab01/colors
  # https://trinket.io/docs/colors
  my_turtle = Turtle()
  my_turtle.shape("turtle")
  my_turtle.color("red")

  screen = Screen()
  return (my_turtle, screen)

def randomly_color_turtle(my_turtle: Turtle, from_list: bool = False):
  colours = ["CornflowerBlue", "DarkOrchid", "IndianRed", "DeepSkyBlue", "LightSeaGreen", "wheat", "SlateGray", "SeaGreen"]
  my_turtle.color(random.choice(colours) if from_list else (random.random(), random.random(), random.random()))
  return my_turtle

def random_walk(my_turtle: Turtle):
  my_turtle.width(5)
  my_turtle.hideturtle()
  my_turtle.speed('fast')
  for _ in range(200):
    my_turtle.forward(20)
    my_turtle.right(random.choice([0, 90, 180, 270]))
    my_turtle = randomly_color_turtle(my_turtle)

def draw_square(my_turtle: Turtle):
  for _ in range(4):
    my_turtle.forward(100)
    my_turtle.right(90)

def draw_iso_polygone(my_turtle: Turtle, side: int):
  remaining_angle = 360
  turn_angle = 360 / side
  while(remaining_angle > 0):
    my_turtle.forward(100)
    my_turtle.right(turn_angle)
    remaining_angle -= turn_angle

def draw_dashed_square(my_turtle: Turtle):
  for _ in range(4):
    dashed_forward(my_turtle, 100)
    my_turtle.right(90)


def dashed_forward(my_turtle: Turtle, length: int, up: int = 5, down: int = 5):
  remaining_length = length
  steps = 0
  while(remaining_length):

    if(steps % 2 == 0): move_length = down if remaining_length >= down else remaining_length
    else: move_length = up if remaining_length >= up else remaining_length

    my_turtle.forward(move_length)
    remaining_length -= move_length

    if(steps % 2 == 0): my_turtle.penup()
    else: my_turtle.pendown()

    steps += 1

  return steps

def dotted_forward(my_turtle: Turtle, n_dots: int = 10, dot_size: int = 20, spacing: int = 50, colors: List = ["blue"]):

  for _ in range(n_dots):
    my_turtle.dot(20, random.choice(colors))
    my_turtle.penup()
    my_turtle.forward(spacing)
 


def extract_colors_from_image(img: str = 'imgs/image.jpg', n_colors: int = 30):
  rgb_colors = []
  colors = colorgram.extract(img, n_colors)
  for color in colors:
      rgb_colors.append((color.rgb.r, color.rgb.g, color.rgb.b))
  
  return rgb_colors