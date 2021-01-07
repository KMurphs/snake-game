




# def auto_move():
  # global snake, current_direction, terminated, speed, reached_max_score
  # if paused: 
  #   return screen.ontimer(auto_move, speed)
    

  # if not terminated:
  #   snake, obsolete_segments, took_crumb = move(snake, snake.head.direction if current_direction is None else current_direction, crumb_get())
    
  #   if not is_game_valid(snake.head.head, snake.body + ([] if snake.tail is None else [snake.tail]) + game_borders):
  #     score_write_final_results()
  #     terminated = True
  #     return

  #   if took_crumb: 
  #     crumb_clear()
  #     reached_max_score = score_increase()
  #     if reached_max_score: 
  #       screen.update()
  #       speed -= 25
  #       return
  # draw([snake.head, snake.tail], obsolete_segments)
  # screen.update()
  # current_direction = None
  # screen.ontimer(auto_move, 250)







from typing import Callable, List


class GameTicks():
  def __init__(self, schedule_fct, get_snake_fct):
    self.schedule_fct = schedule_fct
    self.get_snake_fct = get_snake_fct

  def run_onceoff_effects(self, effects: List[Callable]):
    [effect() for effect in effects]

  def run_effects(self, effects: List[Callable]):
    self.run_onceoff_effects(effects)
    self.schedule_fct(lambda: self.run_effects(effects), 250)

