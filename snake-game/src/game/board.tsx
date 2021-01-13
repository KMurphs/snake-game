import { useCallback, useEffect, useRef, useState } from "react"
import { Direction, ReduxUser } from "../store/type";
import { arePointsEqual, getInitialSnake, getNewCrumb, getNewSnake, hasDirectionChanged, markSnake, Point, Snake, useBoardDimension } from "./utils";


type Props = {
  grabNextDirection: ()=> Direction | null,
  notifyGameFailure: ()=> void,
  onTimerTick: ()=> void,
  notifyScorePoint: ()=> void,
  isPaused: boolean,
  hasLost: boolean,
  hasWon: boolean,
  user: ReduxUser
}

export default function Board({grabNextDirection, isPaused, hasLost, hasWon, notifyGameFailure, notifyScorePoint, user, onTimerTick}: Props){

  const [gridData, setGridData] = useState({cols: 1,rows: 1})
  const gridSize = 20;
  const {cols: grid_cols, rows: grid_rows} = gridData;
  const grid = Array(grid_rows * grid_cols).fill(0).map((item, index) => ({row: Math.floor(index / grid_cols), col: index % grid_cols, index: index}))



  // Get the dimensions of the board, the first time the layout is settled. Store these in gridData
  const boardRef = useRef<HTMLDivElement>(null);
  const getBoardDimension = useCallback((width, height) => setGridData({cols: Math.floor(width / gridSize), rows: Math.floor(height / gridSize)}), [])
  useBoardDimension(boardRef.current, getBoardDimension)
  



  const snakeCSSClass = "is-of-body";
  const crumbCSSClass = "is-crumb";
  const gameControls = useRef<{snake: Snake, crumb: Point | null}>({
    snake: getInitialSnake(grid_rows, grid_cols),
    crumb: null
  });
  // This effect draws the initial snake on screen. Should only run once or twice
  useEffect(()=>{
    gameControls.current.snake = getInitialSnake(grid_rows, grid_cols);
    markSnake(boardRef.current, gameControls.current.snake.body, snakeCSSClass, true);

    // Cleanup current snake on screen
    return () => markSnake(boardRef.current, gameControls.current.snake.body, snakeCSSClass, false);
  }, [grid_rows, grid_cols, user.current.id])







  const getManagementControls = ()=>({
    getNextDirection: grabNextDirection,
    getPausedState: () => isPaused,
    getLostState: () => hasLost,
    getWonState: () => hasWon,
    notifyGameFailure: notifyGameFailure,
    notifyCrumbAssimilation: notifyScorePoint,
    getLevelSpeed: () => 500 - 50 * user.current.level,
    onTimerTick: onTimerTick,
  })
  // Provide a way for the setInterval to reference the updated grabNextDirection and not 
  // the original value by closure
  const managementControls = useRef(getManagementControls());
  // Supporting effect, to update container for grabNextDirection so that the interval
  // function always has the latest value
  useEffect(()=>{
    managementControls.current = getManagementControls()
  }, [grabNextDirection, isPaused, notifyGameFailure, user.current.id])

  // Tick effect, runs every so many millisecond. It is responsible for forcing
  // the snake into movement. If the user hasnot provided a direction from (obtained from "grabNextDirection")
  // the snake will move along its current heading
  useEffect(()=>{
    const interval = setInterval(()=>{
      
      // If state is paused or terminated, do nothing
      if(managementControls.current.getPausedState()) return;
      if(managementControls.current.getLostState()) return;
      if(managementControls.current.getWonState()) return;

      // Notify store to update user game time score
      managementControls.current.onTimerTick();

      // Make sure we have a crumb on the board
      if(gameControls.current.crumb === null) {
        const crumb = getNewCrumb(grid_rows, grid_cols, gameControls.current.snake.body);
        gameControls.current.crumb = crumb;
        const crumbNode = boardRef.current?.querySelector(`.grid-item.row-${crumb.y}.col-${crumb.x}`);
        crumbNode?.classList.add(crumbCSSClass);
      };
      const crumb = gameControls.current.crumb;

      // Get Snake direction
      const nextDirection = managementControls.current.getNextDirection();
      if(hasDirectionChanged(nextDirection || gameControls.current.snake.direction, gameControls.current.snake.direction)){
        gameControls.current.snake.direction = nextDirection || gameControls.current.snake.direction;   
      }
  

      // Build new body, and get tail
      const [newSnake, tail] = getNewSnake(gameControls.current.snake.body, gameControls.current.snake.direction, crumb);
      gameControls.current.snake.body = newSnake;
      

      // Draw snake head at new coordinates after movement
      const headNode = boardRef.current?.querySelector(`.grid-item.row-${newSnake[0].y}.col-${newSnake[0].x}`);
      const isInvalidHead = !headNode || headNode.classList.contains(snakeCSSClass) || (newSnake[0].x < 0) ||(newSnake[0].x >= grid_cols) || (newSnake[0].y < 0)|| (newSnake[0].y >= grid_rows);
      // If new head is invalid, either because it sitting on top of another part of the body snake, 
      // or if it exists outside the borders of the board
      isInvalidHead && managementControls.current.notifyGameFailure();
      // Otherwise, we are good, draw it
      !isInvalidHead && headNode?.classList.add(snakeCSSClass);



      // // Handle the case where the snake assimilates the current crumb on screen
      const assimilatedCrumb = arePointsEqual(newSnake[0], gameControls.current.crumb);
      if(assimilatedCrumb){ 
        const crumb = gameControls.current.crumb;
        gameControls.current.crumb = null;
        const crumbNode = boardRef.current?.querySelector(`.grid-item.row-${crumb.y}.col-${crumb.x}`);
        crumbNode?.classList.remove(crumbCSSClass);
        managementControls.current.notifyCrumbAssimilation();
        return;
      }


      // // Erase last snake element
      if(tail.length === 0) return;
      const tailNode = boardRef.current?.querySelector(`.grid-item.row-${tail[0].y}.col-${tail[0].x}`);
      tailNode?.classList.remove(snakeCSSClass);

    }, managementControls.current.getLevelSpeed());

    return () => clearInterval(interval);
  }, [grid_cols, grid_rows, user.current.id])






  return (
    <div className="logo-inner-container" ref={boardRef}>
    {
      grid.map((item, index) => (
        <div key={index} className={`grid-item idx-${item.index} row-${item.row} col-${item.col}`}></div>
      ))
    }
    </div>
  )
}





