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
  user: TUser,
  nextSnakeDirection: Direction | null,
  isPaused: boolean
}

export type TReducer = (state: TState, action: TAction) => TState


export type TUser = {
  name: string,
  timeScore: number,
  pointScore: number,
}