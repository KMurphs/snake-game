import { useLayoutEffect } from "react";
import { Direction } from "../store/type";




export type Point = {
  x: number,
  y: number
}
export type Snake = {
  body: Point[],
  direction: Direction
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
  const newBody = oldSnake.slice(0, oldSnake.length - 1);
  const tail = oldSnake[oldSnake.length - 1]
  return [[newHead, ...newBody], [tail]]
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
 * Effectful function - Interacts with DOM
 * 
 * Function iterates through all the elements of the "snake" input and add ("addClass" is true) or 
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
  snake.forEach(item => {
    const itemNode = target.querySelector(`.grid-item.row-${item.y}.col-${item.x}`);
    addClass && !itemNode?.classList.contains(cssClass) && itemNode?.classList.add(cssClass);
    !addClass && itemNode?.classList.remove(cssClass);
  })
}


/**
 * Convert a number "n" to an integer than a string. The string is expected to have a minimum 
 * width of "size" and it is padded with "0" to fulfill this requirement.
 * 
 * @date 2021-01-11
 * @param {number} n: number - number to convert to string
 * @param {number} size: number - min width of resulting string
 * @returns {string}: string - "n" as padded string and of width "size" 
 */
const intToPaddedString = (n: number, size: number) => {
  const s = Array(size).fill("0").join("") + parseInt(n + ""); 
  return s.substr(s.length - size, size);
}

/**
 * Convert a number of secs to a time format (i.e. "125" sec is transformed "02:05" secs)
 * 
 * @date 2021-01-11
 * @param {number} secs: number - Number of seconds
 * @returns {string}: string
 */
export const secsToString = (secs: number): string => (Math.floor(secs/60) === 0 ? "" : secsToString(Math.round(secs/60)) + ":") + intToPaddedString(secs % 60, 2);



/**
 * Given two direction, determine whether they are parallel or perpendicular in which case the both directions are different.
 * @date 2021-01-12
 * @param {Direction} dir1:Direction
 * @param {Direction} dir2:Direction
 * @returns {boolean}: boolean
 */
export const hasDirectionChanged = (dir1: Direction, dir2: Direction) => {
  const horizontalDirs = [Direction.LEFT, Direction.RIGHT];
  const verticalDirs = [Direction.UP, Direction.DOWN];
  if(horizontalDirs.includes(dir1) && horizontalDirs.includes(dir2)) return false;
  if(verticalDirs.includes(dir1) && verticalDirs.includes(dir2)) return false;
  return true
}