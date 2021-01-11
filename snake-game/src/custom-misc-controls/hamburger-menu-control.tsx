import "./hamburger-menu-control.css"


type Props = {
  onChange: (newState: boolean) => void
}
export default function Hamburger({onChange}:Props){


  return (
    <div className="hamburger-menu-container">
      <input type="checkbox" id="hamburger-menu-checkbox" onChange={e=>onChange(!e.target.checked)}/>
      <label htmlFor="hamburger-menu-checkbox" className="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  )
}