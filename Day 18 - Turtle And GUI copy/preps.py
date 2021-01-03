import turtle_utils as tu
import random

(my_turtle, my_turtle_screen) = tu.get_turtle()


# # 1
# tu.draw_square(my_turtle)
# tu.reset_screen(my_turtle_screen, my_turtle)

# # 2
# tu.draw_dashed_square(my_turtle)
# tu.reset_screen(my_turtle_screen, my_turtle)

# # 3
# for side in range(3, 11):
#   # my_turtle.color((random.random(), random.random(), random.random()))
#   my_turtle = tu.randomly_color_turtle(my_turtle)
#   tu.draw_iso_polygone(my_turtle, side)
# tu.reset_screen(my_turtle_screen, my_turtle)


# # 4
# my_turtle_screen.delay(5)
# tu.random_walk(my_turtle)
# tu.reset_screen(my_turtle_screen, my_turtle)

# 5 Draw a Spirograph
circles_count = 100
radius = 100
my_turtle_screen.delay(5)
my_turtle.speed('fastest')
for i in range(0, circles_count):
  tu.randomly_color_turtle(my_turtle)
  my_turtle.circle(radius)
  my_turtle.setheading(i * 360/circles_count)




my_turtle_screen.exitonclick()





