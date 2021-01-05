from turtle import Screen, Turtle


# https://stackoverflow.com/questions/59007245/python-turtle-creating-flickering-images-when-using-tracer0-0
def one_step():
    turtle.clear()

    turtle.penup()
    turtle.goto(1, 12)
    turtle.pendown()
    turtle.goto(4, 67)
    turtle.penup()
    turtle.goto(50, 3)
    turtle.pendown()
    turtle.goto(4, 73)

    screen.update()
    screen.ontimer(one_step, 50)

screen = Screen()
screen.tracer(False)

turtle = Turtle()
turtle.hideturtle()

one_step()

screen.mainloop()