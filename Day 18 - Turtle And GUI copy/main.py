import turtle_utils as tu
import colorgram
import random


(my_turtle, my_turtle_screen) = tu.get_turtle()


# rgb_colors = extract_colors_from_image('imgs/image.jpg', 30)
rgb_colors = [ (202, 164, 110), (240, 245, 241), (236, 239, 243), (149, 75, 50), (222, 201, 136), (53, 93, 123), (170, 154, 41), (138, 31, 
20), (134, 163, 184), (197, 92, 73), (47, 121, 86), (73, 43, 35), (145, 178, 149), (14, 98, 70), (232, 176, 165), (160, 142, 158), (54, 45, 50), (101, 75, 77), (183, 205, 171), (36, 60, 74), (19, 86, 89), (82, 148, 129), (147, 17, 19), (27, 68, 102), (12, 70, 64), (107, 127, 153), (176, 192, 208), (168, 99, 102)] 




# 10 * 10 dots
# dot size: 20
# dot spacing: 50
my_turtle_screen.colormode(255)
my_turtle.speed('fastest')

spacing = 50
n_dots = 10
dot_size = 20

side_length = spacing * (n_dots - 1) + dot_size
x_start = -1 * side_length / 2
y_start = +1 * side_length / 2

for i in range(n_dots):
  my_turtle.penup()
  my_turtle.goto(x_start, y_start - (i * spacing))
  tu.dotted_forward(my_turtle, n_dots = n_dots, dot_size = dot_size, spacing = spacing, colors = rgb_colors)

my_turtle.goto(x_start, y_start)
my_turtle.hideturtle()
my_turtle_screen.exitonclick()





