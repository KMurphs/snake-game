import { useCallback, useEffect, useRef, useState } from "react"
import { Direction } from "../store/type";
import { getInitialSnake, getNewSnake, hasDirectionChanged, markSnake, Snake, useBoardDimension } from "./utils";


type Props = {
  grabNextDirection: ()=> Direction | null,
}

export default function Board({grabNextDirection}: Props){

  const [gridData, setGridData] = useState({cols: 1,rows: 1})
  const gridSize = 20;
  const {cols: grid_cols, rows: grid_rows} = gridData;
  const grid = Array(grid_rows * grid_cols).fill(0).map((item, index) => ({row: Math.floor(index / grid_cols), col: index % grid_cols, index: index}))



  // Get the dimensions of the board, the first time the layout is settled. Store these in gridData
  const boardRef = useRef<HTMLDivElement>(null);
  const getBoardDimension = useCallback((width, height) => setGridData({cols: Math.floor(width / gridSize), rows: Math.floor(height / gridSize)}), [])
  useBoardDimension(boardRef.current, getBoardDimension)
  



  const cssClass = "is-of-body";
  const snake = useRef<Snake>({ body: getInitialSnake(grid_rows, grid_cols), direction: Direction.RIGHT});
  // This effect draws the initial snake on screen. Should only run once or twice
  useEffect(()=>{
    const target = boardRef.current
    snake.current.body = getInitialSnake(grid_rows, grid_cols);
    markSnake(target, snake.current.body, cssClass, true);

    // Cleanup current snake on screen
    return () => markSnake(target, snake.current.body, cssClass, false);
  }, [grid_rows, grid_cols])








  // Provide a way for the setInterval to reference the updated grabNextDirection and not 
  // the original value by closure
  const getNextDirection = useRef({ f: grabNextDirection });
  // Supporting effect, to update container for grabNextDirection so that the interval
  // function always has the latest value
  useEffect(()=>{
    getNextDirection.current.f = grabNextDirection;
  }, [grabNextDirection])

  // Tick effect, runs every so many millisecond. It is responsible for forcing
  // the snake into movement. If the user hasnot provided a direction from (obtained from "grabNextDirection")
  // the snake will move along its current heading
  useEffect(()=>{
    const interval = setInterval(()=>{
      
      // Get Snake direction
      const nextDirection = getNextDirection.current.f();
      console.log(nextDirection)
      if(hasDirectionChanged(nextDirection || snake.current.direction, snake.current.direction)){
        snake.current.direction = nextDirection || snake.current.direction;   
      }
  
      // Build new body, and get tail
      const [newSnake, tail] = getNewSnake(snake.current.body, snake.current.direction);
      snake.current.body = newSnake;
  
      // Draw snake head at new coordinates after movement
      const tailNode = boardRef.current?.querySelector(`.grid-item.row-${tail[0].y}.col-${tail[0].x}`);
      tailNode?.classList.remove(cssClass);
  
      // Erase last snake element
      const headNode = boardRef.current?.querySelector(`.grid-item.row-${newSnake[0].y}.col-${newSnake[0].x}`);
      const isInvalidHead = headNode?.classList.contains(cssClass);
      !isInvalidHead && headNode?.classList.add(cssClass);
      
    }, 500);

    return () => clearInterval(interval)
  }, [])





  
  return (
    <div className="logo-inner-container" ref={boardRef}>
    {
      grid.map((item, index) => (<div key={index} className={`grid-item idx-${item.index} row-${item.row} col-${item.col}`}></div>))
    }
    </div>
  )
}





// export const BoardWithStore = (function(fc: React.FC<Props>){

// })(Board)