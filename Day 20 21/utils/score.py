from turtle import Turtle
from .utils import get_turtle
from .types import snake_grid
from .borders import game_size, upper_right, upper_left, lower_left, lower_right

score: int = 0
max_score: int = 5
score_pen: Turtle = None



def score_init():
  global score, score_pen
  score = 0
  score_pen = get_turtle("#1d72eb") if score_pen is None else score_pen
  score_pen.clear()



def score_write_current():
  
  score_pen.clear()
  score_pen.penup()
  score_pen.color("#1d72eb")
  score_pen.goto((1 * game_size//2 - snake_grid // 2, game_size//2 + snake_grid // 2))
  score_pen.pendown()
  score_pen.write("Score: " + str(score) + " / " + str(max_score), False, align="right", font=("Arial", 16, "normal"))

  return score == max_score







def score_write_final_results():
  score_pen.clear()
  score_pen.color("#1d72eb" if score == max_score else "#f65f98")
  score_pen.penup()

  score_pen.begin_fill()
  score_pen.goto(upper_right)
  score_pen.goto(upper_left)
  score_pen.goto(lower_left)
  score_pen.goto(lower_right)
  score_pen.goto(upper_right)
  score_pen.end_fill()

  score_pen.goto((0, 0))
  score_pen.color("white")
  score_pen.write(
    f"Congratulations!\n\nTotal Score: {str(score)}\nPress 'r' to increase difficulty level" 
      if score == max_score 
      else f"Sorry!\nYou miserably Failed!! \n\nScore: {str(score)} / {str(max_score)}", 
    True, 
    align="center", 
    font=("Arial", 16, "normal")
  )


def score_increase(by_amount: int = 1):
  global score
  score += by_amount

  if score == max_score: 
    score_write_final_results()
  else:
    score_write_current()

  return score == max_score
  
