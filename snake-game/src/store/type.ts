export type TAction = {
  type: string,
  payload?: any
}

export type TState = {
  version: string,
  username: string,
}

export type TReducer = (state: TState, action: TAction) => TState


export type TUser = {
  name: string,
  score: number,
  time: number
}