from typing import Callable

from redux.types import TStore
from redux.redux import create_store

from utils.arbitror import GameArbitror
from utils.user_message import UserMessageWriter
from utils.score import ScoreWriter
from utils.crumb import CrumbDrawer
from utils.move import SnakeMover
from utils.draw import GameDrawer, draw
from utils.types import Direction, Point, Snake
from utils.ticks import GameTicks
from utils.borders import GameBorders
from utils.screen import GameScreen
from utils.store import get_initial_state, reducer





if __name__ == "__main__":
  store = create_store(reducer, get_initial_state())

  # Bunch of one line helper functions
  get_snake: Callable[[TStore], Snake] = lambda: store.get_state()["game"]["snake"]
  get_game_speed: Callable[[TStore], Snake] = lambda: store.get_state()["game"]["speed"]
  get_crumb: Callable[[TStore], Point] = lambda: store.get_state()["crumb"]["point"]
  get_score: Callable[[TStore], int] = lambda: store.get_state()["score"]["current"]
  get_max_score: Callable[[TStore], int] = lambda: store.get_state()["score"]["max"]
  get_direction_from_store: Callable[[TStore], Direction] = lambda: store.get_state()["game"]["current_direction"]
  get_direction: Callable[[TStore], Direction] = lambda: get_snake().head.direction if get_direction_from_store() is None else get_direction_from_store()
  get_paused_status: Callable[[TStore], bool] = lambda: store.get_state()["game"]["is_paused"]
  get_obsolete_segments: Callable[[TStore], bool] = lambda: store.get_state()["game"]["obsolete_segments"]
  get_game_state: Callable[[TStore], bool] = lambda: [store.get_state()["score"]["is_max"], store.get_state()["game"]["is_invalid"], store.get_state()["game"]["is_paused"]]
  game_grid_data = store.get_state()["grid"]




  # Different objects responsible for different effects/functions in the game
  borders = GameBorders(game_grid_data["square"], game_grid_data["count"])
  score = ScoreWriter(store.get_state()["score"]["pen"], game_grid_data["square"], game_grid_data["count"], get_score, get_max_score, get_game_state)
  user_msg = UserMessageWriter(store.get_state()["msg"]["pen"], game_grid_data["square"], game_grid_data["count"], get_paused_status)
  snake_mover = SnakeMover(game_grid_data["square"], get_snake, get_crumb, get_direction, get_game_state, store.dispatch)
  game_drawer = GameDrawer(game_grid_data["square"], get_snake, get_obsolete_segments, get_game_state, store.dispatch)
  crumb_drawer = CrumbDrawer(store.get_state()["crumb"]["pen"], game_grid_data["square"], game_grid_data["count"], get_crumb, get_game_state, store.dispatch, store.suscribe)
  game_arbitror = GameArbitror(game_grid_data["square"], borders.borders, get_snake, store.dispatch, store.suscribe)

  # These two work together to finally get the screen ready, and a clock tick every 'so many milliseconds'.
  # The tick object will collect a list of effects to run on every ticks
  screen = GameScreen(store.dispatch, lambda: [crumb_drawer.run_clear_effect(get_crumb() == None), draw([], [get_snake().head] + get_snake().body + ([] if get_snake().tail is None else [get_snake().tail]), game_grid_data["square"])])
  ticker = GameTicks(screen.screen.ontimer, get_game_speed)





  # Effects that must be run once only
  ticker.run_onceoff_effects([
    lambda snake = get_snake(): draw(borders.borders + [snake.head], [], game_grid_data["square"]),
    lambda: user_msg.run_effects(),
    lambda: score.run_effects(),
    screen.screen.update
  ])

  # Effects that must be run repeatedly at a fixed rate
  ticker.run_effects([
    lambda: snake_mover.run_effects(),
    lambda: game_drawer.run_effects(),
    lambda: crumb_drawer.run_effects(),
    lambda: score.run_effects(),
    screen.screen.update
  ])

  # Launch the screen and enter an infinite loop
  screen.run_effects(store)
  







