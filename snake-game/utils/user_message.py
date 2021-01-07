from turtle import Turtle



class UserMessageWriter:
  def __init__(self, drawer, game_grid, game_grid_count, get_paused_status):
    self.drawer: Turtle = drawer
    self.game_grid: int = game_grid
    self.game_grid_count: int = game_grid_count
    self.get_paused_status = get_paused_status



  def run_effects(self):
    """Displays a message for the user with instructions on which keys allow him to do what during the game.
    The message changes on pause.
    """
    msgs = [
      "Use Arrows to move, 'space' to pause, 'r' to restart ",
      "Press 'space' to resume "
    ]
    
    game_size = self.game_grid * self.game_grid_count
    is_paused = self.get_paused_status()

    self.drawer.clear()
    self.drawer.penup()
    self.drawer.goto(( (-1 * game_size - self.game_grid) // 2, (game_size + self.game_grid) // 2 ))
    self.drawer.pendown()
    self.drawer.write(msgs[1] if is_paused else msgs[0], False, align="left", font=("Arial", 13, "normal"))










  
