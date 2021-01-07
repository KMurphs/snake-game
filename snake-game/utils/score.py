from turtle import Turtle
from utils.utils import get_square_corners_from_center
from utils.types import Point



class ScoreWriter:
  def __init__(self, drawer, game_grid, game_grid_count, get_score, get_max_score, get_game_state):
    self.drawer: Turtle = drawer
    self.game_grid: int = game_grid
    self.game_grid_count: int = game_grid_count
    self.get_score = get_score
    self.get_max_score = get_max_score
    self.get_game_state = get_game_state



  def run_effects(self):
    """Main effect of score writer. Depending on the current score, state of the game write text on screen.
    """
    
    score = self.get_score()
    max_score = self.get_max_score()
    game_size = self.game_grid * self.game_grid_count
    passed, failed, paused = self.get_game_state()
    

    # Game is its normal state, update score displayed
    if not (passed or failed):
      self.drawer.clear()
      self.drawer.penup()
      self.drawer.color("#1d72eb")
      self.drawer.goto( (game_size - self.game_grid) // 2, (game_size + self.game_grid) // 2 )
      self.drawer.pendown()
      self.drawer.write("Score: " + str(score) + " / " + str(max_score), False, align="right", font=("Arial", 16, "normal"))

    # Game has either failed or succeeded. Write the appropriate message for the user
    else:
      game_corners = get_square_corners_from_center(Point(0, 0), game_size)

      self.drawer.clear()
      self.drawer.color("#1d72eb" if passed else "#f65f98")
      self.drawer.penup()

      self.drawer.begin_fill()
      self.drawer.goto(game_corners.upper_right)
      self.drawer.goto(game_corners.upper_left)
      self.drawer.goto(game_corners.lower_left)
      self.drawer.goto(game_corners.lower_right)
      self.drawer.goto(game_corners.upper_right)
      self.drawer.end_fill()

      self.drawer.goto((0, 0))
      self.drawer.color("white")
      self.drawer.write(
        f"Congratulations!\n\nTotal Score: {str(score)}\nPress 'r' to increase difficulty level" 
          if passed 
          else f"Sorry!\nYou miserably Failed!! \n\nScore: {str(score)} / {str(max_score)}", 
        True, 
        align="center", 
        font=("Arial", 16, "normal")
      )



