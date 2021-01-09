export type TAction = {
  type: string,
  payload?: any
}

export type TState = {
  counter: number
}

export type TReducer = (state: TState, action: TAction) => TState