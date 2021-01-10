





const getProgressionUntil = (delta: number, start: number, end: number): number[] => 
  start < end 
  ? [start, ...getProgressionUntil(delta, start + delta, end)] 
  : []

const getMargin = (items: number, length: number) => 
  Math.max(Math.floor((items - length)/2), 0) 

export const getLogo = (rows: number, cols: number, xWidth: number, yHeight: number)=>{

  const filter = (item: number, index: number) => index >= getMargin(cols, xWidth) && index < cols - getMargin(cols, xWidth)

  // Find row of most top point
  const topMargin = getMargin(rows, yHeight)

  // Find entries on all 3 horizontal lines of the snake on grid
  const row_top = Array(cols).fill(0).map((item, index) => cols * topMargin + index).filter(filter)
  const row_center = Array(cols).fill(0).map((item, index) => cols * Math.floor(topMargin + yHeight * .5) + index).filter(filter)
  const row_bottom = Array(cols).fill(0).map((item, index) => cols * (topMargin + yHeight) + index).filter(filter)

  // Add the vertical bars for our snake logo
  const col_left = getProgressionUntil(cols, row_top[0], row_center[0])
  const col_right = getProgressionUntil(cols, row_center[row_center.length - 1], row_bottom[row_bottom.length - 1])

  const first = row_bottom[0] - cols;
  const last = row_top[row_top.length - 1] + cols;

  // Remove duplicates, sort and return
  const logo = new Set([first, ...row_bottom, ...col_right.reverse(), ...row_center.reverse(), ...col_left.reverse(), ...row_top, last]);
  // const logo = new Set([...row_top, ...row_center, ...row_bottom, ...col_left, ...col_right]);
  return Array.from(logo).reverse();
  // return Array.from(logo).sort((a, b) => a - b);
} 



const increment = (low: number, high: number, curr: number) => curr >= high ? low : curr + 1
    
    
export function* circularIterator(data: number[], start: number){
  let index = ((start > data.length - 1) || (start < 0)) ? 0 : start;
  let counter = 0;
  while(++counter < data.length){
    yield data[index];
    index = increment(0, data.length - 1, index);
  }
  return counter;
}