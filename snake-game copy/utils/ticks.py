from typing import Callable, List



class GameTicks():
  """Class setup a scheduling train of tick that happen regularily every 'rate' milliseconds
  """
  def __init__(self, schedule_fct, get_rate_fct):
    self.schedule_fct = schedule_fct
    self.get_rate_fct = get_rate_fct

  def run_onceoff_effects(self, effects: List[Callable]):
    """The tick scheduler runs these effects once.

    Args:
        effects (List[Callable]): A List of effects to run at the next tick
    """
    [effect() for effect in effects]

  def run_effects(self, effects: List[Callable]):
    """The tick scheduler, runs input "effects" once and schedule another run in (the next) 'rate' milliseconds

    Args:
        effects (List[Callable]): A List of effects that must run on every tick
    """
    self.run_onceoff_effects(effects)
    self.schedule_fct(lambda: self.run_effects(effects), self.get_rate_fct())

