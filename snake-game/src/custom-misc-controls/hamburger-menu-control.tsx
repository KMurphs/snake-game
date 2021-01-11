import "./hamburger-menu-control.css"

export default function Hamburger(){


  return (
    <div className="hamburger-menu-container">
      <input type="checkbox" id="hamburger-menu-checkbox"/>
      <label htmlFor="hamburger-menu-checkbox" className="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  )
}