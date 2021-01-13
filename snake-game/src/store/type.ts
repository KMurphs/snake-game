export type TAction = {
  type: string,
  payload?: any
}

export enum Direction {
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
}

export type TState = {
  version: string,
  user: ReduxUser,
  nextSnakeDirection: Direction | null,
  isPaused: boolean,
  hasLost: boolean,
  hasWon: boolean,
  maximumScore: number
  chronometerStart: number | null
  chronometerCurrent: number,
  levelScore: number
}

export type TReducer = (state: TState, action: TAction) => TState


export type TUser = {
  name: string,
  last: SessionScore,
  best: SessionScore,
}
export type ReduxUser = {
  name: string,
  current: SessionScore
}

export type SessionScore = {
  timeScore: number,
  pointScore: number,
  level: number,
  id: number,
}