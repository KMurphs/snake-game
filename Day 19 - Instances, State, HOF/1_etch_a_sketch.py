from turtle import Turtle, Screen

turtle = Turtle()
screen = Screen()

def translate(must_go_forward: bool = True):
  move_unit_distance = 10

  def move():
    if must_go_forward: turtle.fd(move_unit_distance)
    else: turtle.bk(move_unit_distance)

  return move
def turn(must_turn_left: bool = True):
  move_unit_angle = 10

  def move():
    if must_turn_left: turtle.left(move_unit_angle)
    else: turtle.right(move_unit_angle)

  return move

def clear():
  turtle.clear()
  turtle.penup()
  turtle.home()
  turtle.pendown()


screen.listen()
screen.onkeypress(translate(True), "w")
screen.onkeypress(translate(False), "s")
screen.onkeypress(turn(True), "a")
screen.onkeypress(turn(False), "d")
screen.onkeypress(clear, "c")


screen.exitonclick()