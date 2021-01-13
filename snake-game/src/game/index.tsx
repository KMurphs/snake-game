import React, { useEffect, useRef, useState } from "react";
import Hamburger from "../custom-misc-controls/hamburger-menu-control";
import Modal from "../custom-misc-controls/modal";
import { Direction, ReduxUser } from "../store/type";
import logo from "./assets/snake-game-logo-sm.gif"
import Board from "./board";
import "./index.css"
import Keypad from "./keypad";
import { secsToString } from "./utils";
type Props = {
  user: ReduxUser,
  nextSnakeDirection: Direction | null,
  onChangePauseState: () => void,
  onNextDirection: (dir: Direction)=>void,
  grabNextDirection: () => Direction | null,
  onResetGame: ()=>void,
  notifyGameFailure: ()=>void,
  notifyScorePoint: ()=>void,
  onResultFeedback: ()=>void,
  onTimerTick: ()=>void,
  isPaused: boolean,
  hasLost: boolean,
  hasWon: boolean,
  level: number
  gameTimeScore: number
}



export default function Game({user, notifyGameFailure, onChangePauseState, onResetGame, onNextDirection, gameTimeScore, isPaused, hasLost, hasWon, grabNextDirection, onResultFeedback, notifyScorePoint, level, onTimerTick}:Props){

  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleKeyPress = (key: string) => {
    if(key === " ") return onChangePauseState();
    if(key === "PAUSE") return onChangePauseState();
    if(key === "RESET") return onResetGame();
    if(key === "r") return onResetGame();
    if(key === "DIRECTION_UP") return onNextDirection(Direction.UP);
    if(key === "DIRECTION_DOWN") return onNextDirection(Direction.DOWN);
    if(key === "DIRECTION_LEFT") return onNextDirection(Direction.LEFT);
    if(key === "DIRECTION_RIGHT") return onNextDirection(Direction.RIGHT);
    if(key === "ArrowUp") return onNextDirection(Direction.UP);
    if(key === "ArrowDown") return onNextDirection(Direction.DOWN);
    if(key === "ArrowLeft") return onNextDirection(Direction.LEFT);
    if(key === "ArrowRight") return onNextDirection(Direction.RIGHT);
  }

  const onResultFeedbackWrapper = ()=>{
    setShowModal(false);
    onResultFeedback();
  }

  const modalClass = hasLost ? "has-lost" : hasWon ? "has-won" : "";
  useEffect(()=>{
    hasLost && setShowModal(true);
    hasWon && setShowModal(true);
  }, [hasLost, hasWon])

  return (
    <section id="game" className={`flex flex-col w-full height-100vh px-6 py-2 m-auto ${modalClass}`} tabIndex={0} onKeyDown={e=>handleKeyPress(e.key)}>


      <header className="flex justify-between items-center h-8 mb-6 relative">
        <img src={logo} alt="Gif of a snake drawing a S" className="h-6"/>
        <div className="">
          <span className="text-lg">{user.name}</span>
          <span className="ml-4">{secsToString(gameTimeScore)}</span>
          <span className="text-gray-400 ml-4">{user.current.pointScore}</span>
        </div>
        <Hamburger state={isPaneOpen} onChange={setIsPaneOpen}/>
      </header>


      <main className="flex-auto">
        <Board grabNextDirection={grabNextDirection} isPaused={isPaused} user={user} hasLost={hasLost} hasWon={hasWon} notifyGameFailure={notifyGameFailure} onTimerTick={onTimerTick} notifyScorePoint={notifyScorePoint}/>
        <div className={`side-pane fixed top-0 bottom-0 right-0 w-full p-4 pt-12 z-10 container-frozen ${isPaneOpen ? "" : "-right-full"}`}>
          Hello
        </div>
      </main>


      <footer className="game-footer -rotate-90mx-auto w-full mt-6">
        <Keypad onKeyPress={handleKeyPress} isPaused={isPaused}/>
      </footer>

      
      <Modal show={showModal} onClose={onResultFeedbackWrapper} containerExtraClasses="new-user-container">
        <Results hasWon={hasWon} hasLost={hasLost} onResponse={onResultFeedbackWrapper} user={user}/> 
      </Modal>


    </section>
  )
}


type ResultProps = {
  hasLost: boolean,
  hasWon: boolean,
  user: ReduxUser,
  onResponse: ()=>void
}

function Results({hasWon, hasLost, onResponse, user}: ResultProps){
  return (
    <div className="new-user p-4 rounded-lg">

      <div>
        {
          hasWon && (
            <>    
              <h1 className="text-lg font-bold mb-8">Congratulations <strong>{user.name}</strong></h1>
              <p> You have won at this level of difficulty. Congrats again!!</p>
              <p> Score: {user.current.pointScore}<br/></p>
              <p> Time: {secsToString(user.current.timeScore)}<br/></p>
              <p> Difficulty Level: Level {user.current.level + 1}<br/><br/><br/></p>
              <p> Do you want to move to next level?</p>
            </>
          )
        }
        {
          hasLost && (
            <>    
              <h1 className="text-lg font-bold mb-8">Sorry <strong>{user.name}</strong></h1>
              <p> It seems that the current difficulty level was too great.</p>
              <p> Score: {user.current.pointScore}<br/></p>
              <p> Time: {secsToString(user.current.timeScore)}<br/></p>
              <p> Difficulty Level: Level {user.current.level + 1}<br/><br/><br/></p>
              <p> Do you want to restart?</p>
            </>
          )
        }
      </div>

      <div className="flex bg-white color-main justify-between flex-wrap ">
        {hasWon && (<button onClick={() => onResponse()} className="btn mt-8 mx-2">Yes! On to next Level</button>)}
        {hasLost && (<button onClick={() => onResponse()} className="btn mt-8 mx-2">Let's Restart</button>)}
      </div>

    </div>
  )
}