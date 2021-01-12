import useClickAnimation from "../custom-hooks/useClickAnimation"

type KeypadProps = {
  onKeyPress: (key: string)=> void,
  isPaused: boolean
}

export default function Keypad({onKeyPress, isPaused}:KeypadProps){

  const animatedClick = useClickAnimation("animating", 500, onKeyPress)
  
  return (

    <div className="game-keypad grid mx-auto w-full">

      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={e => animatedClick(e, "RESET")}><i className="fas fa-reply"></i></button></div>
      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={e => animatedClick(e, "PAUSE")}><i className={`fas fa-${isPaused ? "play" : "pause"}`}></i></button></div>

      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={e => animatedClick(e, "DIRECTION_UP")}><i className="fas fa-play transform -rotate-90"></i></button></div>
      <div className="flex justify-center items-center"></div>

      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={e => animatedClick(e, "DIRECTION_LEFT")}><i className="fas fa-play transform rotate-180"></i></button></div>
      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={e => animatedClick(e, "DIRECTION_RIGHT")}><i className="fas fa-play "></i></button></div>

      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={e => animatedClick(e, "DIRECTION_DOWN")}><i className="fas fa-play transform rotate-90"></i></button></div>
      <div className="flex justify-center items-center"></div>
      
    </div>

  )
}