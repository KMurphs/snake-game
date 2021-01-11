import React, { useState } from "react";
import Hamburger from "../custom-misc-controls/hamburger-menu-control";
import { TUser } from "../store/type";
import logo from "./assets/snake-game-logo-sm.gif"
import Board from "./board";
import "./index.css"
import Keypad from "./keypad";
import { secsToString } from "./utils";
type Props = {
  user: TUser
}



export default function Game({user}:Props){

  const [isPaneOpen, setIsPaneOpen] = useState(false)
  




  return (
    <section id="game" className="flex flex-col w-full height-100vh px-6 py-2 m-auto">


      <header className="flex justify-between items-center h-8 mb-6 relative">
        <img src={logo} alt="Gif of a snake drawing a S" className="h-6"/>
        <div className="">
          <span className="text-lg">{user.name}</span>
          <span className="ml-4">{secsToString(user.timeScore)}</span>
          <span className="text-gray-400 ml-4">{user.pointScore}</span>
        </div>
        <Hamburger onChange={setIsPaneOpen}/>
      </header>


      <main className="flex-auto">
        <Board/>
        <div className={`side-pane fixed top-0 bottom-0 right-0 w-full p-4 pt-12 z-10 container-frozen ${isPaneOpen ? "" : "-right-full"}`}>
          Hello
        </div>
      </main>


      <footer className="game-footer -rotate-90mx-auto w-full mt-6">
        <Keypad onKeyPress={key => {}}/>
      </footer>
    
    </section>
  )
}