import React, { useEffect, useState } from "react"
import { TextInput } from "../custom-form-controls/input-with-moving-label"
import Modal from "../custom-misc-controls/modal"
import { TUser } from "../store/type"
import "./index.css"
import LogoBoard from "./logo"

type Props = {
  onLogin: (user: TUser)=>void
}


const fromLocalStorage = (key: string, defaultValue: any) => {

  const localString = localStorage.getItem(key);

  if(!localString) return defaultValue;

  if(typeof(defaultValue) === "string") return localString;
  if(typeof(defaultValue) === "number") return parseFloat(localString);

  let obj = defaultValue;
  try{ obj = JSON.parse(localString); }
  catch(err){ }
  return obj;
}

const toLocalStorage = (key: string, value: any) => {
  const dataStr = typeof(value) !== "object" ? value + "" : JSON.stringify(value)
  localStorage.setItem(key, dataStr)
}

const isUsernameValid = (value: string | null | undefined)=> value && value !== "" && value !== null && value !== undefined
const capitalizeFirstLetter = (word: string) => word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase()
export default function Login({onLogin}:Props){

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [showValidatedFrom, setShowValidatedFrom] = useState(false);
  
  /**
   * User wants to login as "username". Verify that "username" is registered in users db object ("users" arguments from local storage)
   * If user is registered, proceed to login user.
   * If user is not registered, pull modal to get from user, how we should proceed.
   */
  const handleOnLogin = (users: TUser[], username: string)=>{
    setShowValidatedFrom(true);
    if(!isUsernameValid(username)) return
    const [user] = users.filter(curr => curr.name.toLowerCase() === username.toLowerCase());
    user && onLogin(user);
    !user && setShowModal(true);
  }
  /**
   * User "username" is not registered in users db object.
   * User either indicated that this new user must be registered ("doRegisterUser" is true), 
   * or we should abort the login process ("doRegisterUser" is false).
   * If doRegisterUser is True, login, schedule an effect to update storage and app cache
   */
  const handleUnkownUserResponse = (username: string, doRegisterUser : boolean) => {
    if(!username || username === "" || username === null || username === undefined) return
    const user: TUser = { name: capitalizeFirstLetter(username), pointScore: 0, timeScore: 0 }
    doRegisterUser && setUsers(u => [...u, user]);
    !doRegisterUser && setUsername("");
    setShowModal(false);
    doRegisterUser && onLogin(user);
  }
  /**
   * Local storage effect. Commit "users" state/cache object to storage.
   * Set "users" to updated storage content
   */
  const [users, setUsers] = useState<TUser[]>([]);
  useEffect(()=>{
    users.length > 0 && toLocalStorage("users", users);
    const storageUsers = fromLocalStorage("users", []);
    (users.length !== storageUsers.length) && setUsers(storageUsers);
  }, [users])



  

  return (
    <section id="login" className="flex flex-col w-full height-100vh p-6 m-auto flex-wrap justify-center max-w-lg md:max-w-screen-xl">

      <header className="logo-container flex-auto md:flex-full md:w-5/12 md:mr-10 lg:mr-20 lg:flex lg:items-center">
        <LogoBoard/>
      </header>

      <main className="main-text pt-8 flex-initial md:w-5/12 md:max-w-sm md:mx-4 lg:mr-auto lg:max-w-screen-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl pb-2 md:pb-8 text-gray-600 ">Snake Game</h1>
        <h2 className="text-gray-500 md:text-xl lg:text-2xl">A most addictive game. <br/>Enter username to start playing.</h2>
      </main>

      <footer className="form-container mt-4 flex-initial md:mt-20 md:max-w-sm md:mx-4">
        <TextInput value={username} setValue={val => setUsername(val + "")} label="Enter Username" fontawesomeClass="fas fa-user" extraClasses={showValidatedFrom && !isUsernameValid(username) ? "invalid" : ""}/>
        <button className="btn w-full mt-16" onClick={()=>handleOnLogin(users, username)}>Start</button>
      </footer>

      <Modal show={showModal} onClose={()=>setShowModal(false)} containerExtraClasses="new-user-container">
        <UnknownUser name={username} onResponse={ res => handleUnkownUserResponse(username, res) }/>
      </Modal>
    </section>
  )
}






type UnknownUserProps = {
  name: string,
  onResponse: (registerUser: boolean)=>void
}

function UnknownUser({onResponse, name}: UnknownUserProps){
  return (
    <div className="new-user p-4 rounded-lg">

      <div>
        <h1 className="text-lg font-bold mb-8">New User</h1>
        <p> We could not find user "<strong>{name}</strong>" in our records.<br/></p>
        <p> Would you like to register "<strong>{name}</strong>" as a new user?<br/></p>
      </div>

      <div className="flex bg-white color-main justify-between flex-wrap ">
        <button onClick={() => onResponse(false)} className="btn btn-secondary p-4 mt-8 mx-2">No, Return</button>
        <button onClick={() => onResponse(true)} className="btn mt-8 mx-2">Yes, Register</button>
      </div>

    </div>
  )
}