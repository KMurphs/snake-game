import { useLayoutEffect } from "react";



export enum Direction {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
}
export type Point = {
  x: number,
  y: number
}

/**
 * Takes a point 'p' and return a new point that is positioned where the old point would
 * have been if it had moved one step/grid square along "direction" 
 * @date 2021-01-11
 * @param {Point} p: Point
 * @param {Direction} direction: Direction (up, down, left, right)
 * @returns {Point}: Point
 */
export const translate = (p: Point, direction: Direction): Point => {
  if(direction === Direction.UP) return {x: p.x, y: p.y - 1};
  if(direction === Direction.DOWN) return {x: p.x, y: p.y + 1};
  if(direction === Direction.LEFT) return {x: p.x - 1, y: p.y};
  return {x: p.x + 1, y: p.y};
}

/**
 * Get the coordinate of an initial state. Typically, 3 squares in an 
 * horizontal line starting from the center of the board and going back 
 * towards the left.
 * 
 * @date 2021-01-11
 * @param {any} rows: number - The number of rows in the board
 * @param {any} cols: number - The number of columns in the board
 * @returns {any}
 */
export const getInitialSnake = (rows: number, cols: number)=>{
  const length = 3
  const center: Point = { x: Math.floor(rows / 2), y: Math.floor(cols / 2) }
  const snake = Array(length).fill(0).reduce((acc: Point[]) => [...acc, translate(acc[acc.length - 1], Direction.LEFT)], [center])
  return snake;
} 

/**
 * The current snake needs to step one step along "direction".
 * 
 * The function will create a new point (head) in that direction, extract the last element from the current snake.
 * The new snake returned is "head" and the rest of the current snake without its last point.
 * The last element is returned to be erased from the ui.
 * 
 * @date 2021-01-11
 * @param {Point[]} oldSnake: Point[]
 * @param {Direction} direction: Direction (up, down, left, right)
 * @returns {Point[]}: Point[]
 */
export const getNewSnake = (oldSnake: Point[], direction: Direction) => {
  const newHead = translate(oldSnake[0], direction);
  const newTail = oldSnake.splice(0, oldSnake.length - 2);
  const tail = oldSnake[oldSnake.length - 1]
  return [[newHead, ...newTail], [tail]]
}

/**
 * Effect that runs once that layout is settled to measure the actual width and height of "target" element.
 * Once these values have been captured, the callback function cb is called with these: cb(width, height)
 * 
 * @date 2021-01-11
 * @param { HTMLElement } target: HTMLElement whose dimensions must be taken
 * @param { Function } cb: Function called when dimensions are measured
 * @returns { void }: None
 */
export const useBoardDimension = (target: HTMLElement | null, cb: (clientWidth: number, clientHeight: number) => void)=>{
  useLayoutEffect(()=>{
    !target && cb(1, 1);
    target && cb(target.clientWidth, target.clientHeight);
  }, [target, cb])
}

/**
 * Iterates through all the elements of the "snake" input and add ("addClass" is true) or 
 * remove ("addClass" is false) the input css class "cssClass" from the corresponding node/square grid on the ui.
 * 
 * The function relies on having a reference to the parent HTML node "target" that contains the game grid
 * @date 2021-01-11
 * @param {HTMLElement|null} target: HTMLElement|null - Parent HMTL node containing the grid elements
 * @param {Point[]} snake: Point[] - Current snake
 * @param {astringny} cssClass: string - the css class to add to the snake square. This class is used to style the body of the snake in css.
 * @param {boolean} addClass: boolean = false - By default, the function adds the css class to the snake elements
 * @returns {void}: None
 */
export const markSnake = (target: HTMLElement | null, snake: Point[], cssClass: string, addClass: boolean = false) => {
  if(!target) return;
  snake.map(item => {
    const itemNode = target.querySelector(`.grid-item.row-${item.y}.col-${item.x}`);
    addClass && !itemNode?.classList.contains(cssClass) && itemNode?.classList.add(cssClass);
    !addClass && itemNode?.classList.remove(cssClass);
  })
}
