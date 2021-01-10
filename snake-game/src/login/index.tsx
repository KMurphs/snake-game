import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { TextInput } from "../custom-form-controls/input-with-moving-label"
import Modal from "../custom-misc-controls/modal"
import "./index.css"
import { circularIterator, getLogo } from "./utils"

type Props = {

}


const fromLocalStorage = (key: string, defaultValue: any) => {

  const localString = localStorage.getItem(key);

  if(!localString) return defaultValue;

  if(typeof(defaultValue) === "string") return localString;
  if(typeof(defaultValue) === "number") return parseFloat(localString);

  let obj = defaultValue;
  try{
    obj = JSON.parse(localString);
  }
  catch(err){ }
  return obj;
}



export default function Login({}:Props){

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [dummy, setDummy] = useState(true);
  const triggerRender = () => setDummy(val => !val);
  const handleNewUserResponse = (registerUser : boolean) => {

    setShowModal(false);
  }

  const boardRef = useRef<HTMLElement>(null);


  const [gridData, setGridData] = useState({cols: 1,rows: 1})

  const gridSize = 20;
  const xLength = 6;
  const yLength = 10;
  const {cols: grid_cols, rows: grid_rows} = gridData;
  const grid = Array(grid_rows * grid_cols).fill(0).map((item, index) => ({row: Math.floor(index / grid_cols), col: index % grid_cols, index: index}))

  useLayoutEffect(()=>{
    console.log("Run layout effect once", grid_cols, grid_rows);
    setGridData({
      cols: boardRef.current ? Math.floor(boardRef.current.clientWidth / gridSize) : 1, 
      rows: boardRef.current ? Math.floor(boardRef.current?.clientHeight / gridSize) : 1
    })
  }, [])


  // Get grid indexes that participate in logo drawing
  const logo = getLogo(grid_rows, grid_cols, xLength, yLength)
  console.log({logo, grid_rows, grid_cols, xLength, yLength})
  // logo.forEach(item => grid[item] = {cls:"logo", data: ".5"})

  useEffect(()=>{
    // let counter = 0
    const markGridItem = (index: number, cls: string, unMark: boolean = false) =>{
      const target = boardRef.current?.querySelector(`.grid-item.idx-${index}`)
      !unMark && target && !target.classList.contains(cls) && target.classList.add(cls)
      // !unMark && target && (target.innerHTML = `${counter++}`)
      unMark && target && target.classList.remove(cls)
    }
    logo.forEach(index => markGridItem(index, "logo-bg", false))

    return ()=>logo.forEach(index => markGridItem(index, "logo-bg", true))
  }, [logo])

  const circularIncrement = (low: number, high: number, curr: number) => curr >= high ? low : curr + 1
  const linearIncrement = (start: number, end: number, intervals: number, index: number) => start + index * (end - start) / intervals
  useEffect(()=>{
    let currPos = 0;
    const snakeLength = logo.length //20
    
    const interval = setInterval(()=>{

      currPos = circularIncrement(0, logo.length - 1, currPos);
      let processed = 0;
      let current = currPos - 1;
      while(processed < logo.length - 1){
        processed++;
        current = circularIncrement(0, logo.length - 1, current);

        const target = boardRef.current?.querySelector(`.grid-item.idx-${logo[current]}`);
        if(!target) continue;
        target.classList.remove("logo-snake");
        if(processed < snakeLength)target.classList.add("logo-snake");
        if(processed < snakeLength)(target as HTMLElement).style.opacity = `${linearIncrement(0, 1, snakeLength, processed)}`;
      }
      
    }, 100) 
    return () => clearInterval(interval)
  })


  return (
    <section id="login" className="grid w-full height-100vh p-6">
      <header className="logo-container" ref={boardRef}>
        {
          grid.map((item, index) => (<div key={index} className={`grid-item idx-${item.index} row-${item.row} col-${item.col}`}></div>))
        }
      </header>
      <main className="main-text pt-8">
        <h1 className="text-3xl pb-2 text-gray-600">Snake Game</h1>
        <h2 className="text-gray-500">A most addictive game. <br/>Enter username to start playing.</h2>
      </main>
      <footer className="form-container mt-4">
        <TextInput value={username} setValue={val => setUsername(val + "")} label="Enter Username" fontawesomeClass="fas fa-user"/>
        <button className="btn w-full mt-16" onClick={()=>setShowModal(true)}>Start</button>
      </footer>

      <Modal show={showModal} onClose={()=>setShowModal(false)} containerExtraClasses="new-user-container">
        <NewUser onResponse={ handleNewUserResponse }/>
      </Modal>
    </section>
  )
}






type NewUserProps = {
  onResponse: (isResponsePositive: boolean)=>void
}

function NewUser({onResponse}: NewUserProps){
  return (
    <div className="new-user p-4 rounded-lg">

      <div>
        <h1 className="text-lg font-bold mb-8">New User</h1>
        <p> User "bloalglf" is a new user.<br/></p>
        <p> Would you like to register user "dfsfdsd"<br/></p>
      </div>

      <div className="flex bg-white color-main justify-between flex-wrap ">
        <button onClick={() => onResponse(true)} className="btn btn-secondary p-4 mt-8 mx-2">No, Return</button>
        <button onClick={() => onResponse(false)} className="btn mt-8 mx-2">Yes, Register</button>
      </div>

    </div>
  )
}