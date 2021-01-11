import useClickAnimation from "../custom-hooks/useClickAnimation"



export default function Keypad(){

  const animatedClick = useClickAnimation("animating", 500)
  
  return (

    <div className="game-keypad grid mx-auto w-full">

      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={animatedClick}><i className="fas fa-reply"></i></button></div>
      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={animatedClick}><i className="fas fa-pause"></i></button></div>

      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={animatedClick}><i className="fas fa-play transform -rotate-90"></i></button></div>
      <div className="flex justify-center items-center"></div>

      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={animatedClick}><i className="fas fa-play transform rotate-180"></i></button></div>
      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={animatedClick}><i className="fas fa-play "></i></button></div>

      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center"><button className="game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center" onClick={animatedClick}><i className="fas fa-play transform rotate-90"></i></button></div>
      <div className="flex justify-center items-center"></div>
      
    </div>

  )
}