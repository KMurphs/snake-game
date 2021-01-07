print('__file__={0:<50} | __name__={1:<20} | __package__={2:<20}'.format(__file__,__name__,str(__package__)))
# https://stackoverflow.com/questions/14132789/relative-imports-for-the-billionth-time
# https://napuzba.com/a/import-error-relative-no-parent/p3
# https://github.com/microsoft/pylance-release/issues/236#issuecomment-727575436



from typing import Callable
from utils.arbitror import GameArbitror
from redux.types import TStore
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

from redux.redux import create_store










      




if __name__ == "__main__":
  store = create_store(reducer, get_initial_state())

  get_snake: Callable[[TStore], Snake] = lambda: store.get_state()["game"]["snake"]
  get_crumb: Callable[[TStore], Point] = lambda: store.get_state()["crumb"]["point"]
  get_score: Callable[[TStore], int] = lambda: store.get_state()["score"]["current"]
  get_max_score: Callable[[TStore], int] = lambda: store.get_state()["score"]["max"]
  get_direction_from_store: Callable[[TStore], Direction] = lambda: store.get_state()["game"]["current_direction"]
  get_direction: Callable[[TStore], Direction] = lambda: get_snake().head.direction if get_direction_from_store() is None else get_direction_from_store()
  get_paused_status: Callable[[TStore], bool] = lambda: store.get_state()["game"]["is_paused"]
  get_obsolete_segments: Callable[[TStore], bool] = lambda: store.get_state()["game"]["obsolete_segments"]
  get_game_state: Callable[[TStore], bool] = lambda: [store.get_state()["score"]["is_max"], store.get_state()["game"]["is_invalid"], store.get_state()["game"]["is_paused"]]


  game_grid_data = store.get_state()["grid"]
  borders = GameBorders(game_grid_data["square"], game_grid_data["count"])

  score = ScoreWriter(store.get_state()["score"]["pen"], game_grid_data["square"], game_grid_data["count"], get_score, get_max_score, get_game_state)
  user_msg = UserMessageWriter(store.get_state()["msg"]["pen"], game_grid_data["square"], game_grid_data["count"], get_paused_status)
  snake_mover = SnakeMover(game_grid_data["square"], get_snake, get_crumb, get_direction, get_game_state, store.dispatch)
  game_drawer = GameDrawer(game_grid_data["square"], get_snake, get_obsolete_segments, get_game_state, store.dispatch)
  crumb_drawer = CrumbDrawer(store.get_state()["crumb"]["pen"], game_grid_data["square"], game_grid_data["count"], get_crumb, get_game_state, store.dispatch, store.suscribe)
  game_arbitror = GameArbitror(game_grid_data["square"], borders.borders, get_snake, store.dispatch, store.suscribe)

  screen = GameScreen(store.dispatch, lambda: [crumb_drawer.run_clear_effect(get_crumb() == None), draw([], [get_snake().head] + get_snake().body + ([] if get_snake().tail is None else [get_snake().tail]), game_grid_data["square"])])
  ticker = GameTicks(screen.screen.ontimer, get_snake)


  ticker.run_onceoff_effects([
    lambda snake = get_snake(): draw(borders.borders + [snake.head], [], game_grid_data["square"]),
    lambda: user_msg.run_effects(),
    lambda: score.run_effects(),
    screen.screen.update
  ])

  ticker.run_effects([
    lambda: snake_mover.run_effects(),
    lambda: game_drawer.run_effects(),
    lambda: crumb_drawer.run_effects(),
    lambda: score.run_effects(),
    screen.screen.update
  ])

  screen.run_effects(store)
  







