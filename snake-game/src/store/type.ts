export type TAction = {
  type: string,
  payload?: any
}

export type TState = {
  version: string,
  user: TUser,
}

export type TReducer = (state: TState, action: TAction) => TState


export type TUser = {
  name: string,
  timeScore: number,
  pointScore: number,
}