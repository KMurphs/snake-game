import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { getInitialSnake, markSnake, useBoardDimension } from "./utils";




export default function Board(){

  const [gridData, setGridData] = useState({cols: 1,rows: 1})
  const gridSize = 20;
  const {cols: grid_cols, rows: grid_rows} = gridData;
  const grid = Array(grid_rows * grid_cols).fill(0).map((item, index) => ({row: Math.floor(index / grid_cols), col: index % grid_cols, index: index}))



  // Get the dimensions of the board, the first time the layout is settled. Store these in gridData
  const boardRef = useRef<HTMLDivElement>(null);
  const getBoardDimension = useCallback((width, height) => setGridData({cols: Math.floor(width / gridSize), rows: Math.floor(height / gridSize)}), [])
  useBoardDimension(boardRef.current, getBoardDimension)
  


  const cssClass = "is-of-body";
  const snake = useRef(getInitialSnake(grid_rows, grid_cols));
  // This effect draws the initial snake on screen. Should only run once or twice
  useEffect(()=>{
    snake.current = getInitialSnake(grid_rows, grid_cols);
    markSnake(boardRef.current, snake.current, cssClass, true);

    return () => markSnake(boardRef.current, snake.current, cssClass, false);
  }, [grid_rows, grid_cols])




  
  // useEffect(()=>{
  //   const interval = setInterval(()=>{
      

  //     const [newSnake, tail] = getNewSnake(snake.current, Direction.RIGHT);
  //     snake.current = newSnake;

  //     const tailNode = boardRef.current?.querySelector(`.grid-item.row-${tail[0].x}.col-${tail[0].y}`);
  //     tailNode?.classList.remove(cssClass);

  //     const headNode = boardRef.current?.querySelector(`.grid-item.row-${newSnake[0].x}.col-${newSnake[0].y}`);
  //     const isInvalidHead = headNode?.classList.contains(cssClass);
  //     !isInvalidHead && headNode?.classList.add(cssClass);
      
  //   }, 500) 
  //   return () => clearInterval(interval)
  // })




  return (
    <div className="logo-inner-container" ref={boardRef}>
    {
      grid.map((item, index) => (<div key={index} className={`grid-item idx-${item.index} row-${item.row} col-${item.col}`}></div>))
    }
    </div>
  )
}