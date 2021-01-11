import React from "react";
import Hamburger from "../custom-misc-controls/hamburger-menu-control";
import { TUser } from "../store/type";
import logo from "./assets/snake-game-logo-sm.gif"
import Board from "./board";
import "./index.css"
import Keypad from "./keypad";
type Props = {
  user: TUser
}
const intToPaddedString = (n: number, size: number) => {
  const s = Array(size).fill("0").join("") + parseInt(n + ""); 
  return s.substr(s.length - size, size);
}
const secsToString = (secs: number): string => (Math.floor(secs/60) === 0 ? "" : secsToString(Math.round(secs/60)) + ":") + intToPaddedString(secs % 60, 2);
export default function Game({user}:Props){

  

  return (
    <section id="game" className="flex flex-col w-full height-100vh px-6 py-2 m-auto">


      <header className="flex justify-between items-center h-8 mb-6">
        <img src={logo} alt="Gif image of a snake drawing a S" className="h-6"/>
        <div className="">
          <span className="text-lg">{user.name}</span>
          <span className="ml-4">{secsToString(user.timeScore)}</span>
          <span className="text-gray-400 ml-4">{user.pointScore}</span>
        </div>
        <Hamburger/>
      </header>


      <main className="flex-auto">
        <Board/>
      </main>


      <footer className="game-footer -rotate-90mx-auto w-full mt-6">
        <Keypad/>
      </footer>
    
    </section>
  )
}