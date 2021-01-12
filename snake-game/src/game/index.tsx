import React, { useState } from "react";
import Hamburger from "../custom-misc-controls/hamburger-menu-control";
import { Direction, TUser } from "../store/type";
import logo from "./assets/snake-game-logo-sm.gif"
import Board from "./board";
import "./index.css"
import Keypad from "./keypad";
import { secsToString } from "./utils";
type Props = {
  user: TUser,
  nextSnakeDirection: Direction | null,
  changePauseState: () => void,
  setNextDirection: (dir: Direction)=>void,
  grabNextDirection: () => Direction | null,
  resetGame: ()=>void,
  isPaused: boolean,
}



export default function Game({user, nextSnakeDirection, changePauseState, resetGame, setNextDirection, isPaused, grabNextDirection}:Props){

  const [isPaneOpen, setIsPaneOpen] = useState(false)
  

  const handleKeyPress = (key: string) => {
    if(key === "PAUSE") return changePauseState();
    if(key === "RESET") return resetGame();
    if(key === "DIRECTION_UP") return setNextDirection(Direction.UP);
    if(key === "DIRECTION_DOWN") return setNextDirection(Direction.DOWN);
    if(key === "DIRECTION_LEFT") return setNextDirection(Direction.LEFT);
    if(key === "DIRECTION_RIGHT") return setNextDirection(Direction.RIGHT);
    if(key === "ArrowUp") return setNextDirection(Direction.UP);
    if(key === "ArrowDown") return setNextDirection(Direction.DOWN);
    if(key === "ArrowLeft") return setNextDirection(Direction.LEFT);
    if(key === "ArrowRight") return setNextDirection(Direction.RIGHT);
  }


  return (
    <section id="game" className="flex flex-col w-full height-100vh px-6 py-2 m-auto" tabIndex={0} onKeyDown={e=>handleKeyPress(e.key)}>


      <header className="flex justify-between items-center h-8 mb-6 relative">
        <img src={logo} alt="Gif of a snake drawing a S" className="h-6"/>
        <div className="">
          <span className="text-lg">{user.name}</span>
          <span className="ml-4">{secsToString(user.timeScore)}</span>
          <span className="text-gray-400 ml-4">{user.pointScore}</span>
        </div>
        <Hamburger state={isPaneOpen} onChange={setIsPaneOpen}/>
      </header>


      <main className="flex-auto">
        <Board grabNextDirection={grabNextDirection}/>
        <div className={`side-pane fixed top-0 bottom-0 right-0 w-full p-4 pt-12 z-10 container-frozen ${isPaneOpen ? "" : "-right-full"}`}>
          Hello
        </div>
      </main>


      <footer className="game-footer -rotate-90mx-auto w-full mt-6">
        <Keypad onKeyPress={handleKeyPress} isPaused={isPaused}/>
      </footer>
    
    </section>
  )
}