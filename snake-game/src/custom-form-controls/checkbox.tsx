import "./checkbox.css";

type Props = {
  type?: number
  onText?: string
  offText?: string
  constantText?: string
  extraClasses?: string
  value: boolean
  onChange: (newVal: boolean)=>void
}
type CheckoxProps = {
  onText?: string
  offText?: string
  constantText?: string
  extraClasses?: string
  value: boolean
  onChange: (newVal: boolean)=>void
}
export default function Checkbox({type, ...props}: Props) {
  if(type === 1) return <Checkbox1 {...props}/> 
  return <Checkbox0 {...props}/> 
}
(Checkbox as React.FC).defaultProps = {
  type: 0,
  onText: "",
  offText: "",
  constantText: "",
  extraClasses: "",
  value: false,
}



function Checkbox0({value, onChange, onText, offText, constantText, extraClasses}: CheckoxProps) {

  return (
    <label htmlFor="custom-checkbox" className={`custom-checkbox__container custom-checkbox__container-0 ${extraClasses}`}>
       <input type="checkbox" id="custom-checkbox" name="custom-checkbox" checked={value} onChange={evt=>onChange(evt.target.checked)} />
       <div className="custom-checkbox__background">
          <span className="custom-checkbox__thumb"></span>
       </div>
       <p className="custom-checkbox__text">{constantText}<span>{offText}</span> <span>{onText}</span></p>     
    </label>
  )
}

function Checkbox1({value, onChange, onText, offText, constantText, extraClasses}: CheckoxProps) {

  return (
    <label htmlFor="custom-checkbox" className={`custom-checkbox__container custom-checkbox__container-1 ${extraClasses}`}>
      <input type="checkbox" id="custom-checkbox" name="custom-checkbox" checked={value} onChange={evt=>onChange(evt.target.checked)} />
      <div className="custom-checkbox__background">
        <span className="custom-checkbox__thumb"></span>
      </div>
      <p className="custom-checkbox__text">
        <span className="custom-checkbox__constantText">{constantText}</span>
        <span className="custom-checkbox__offText">{offText}</span> 
        <span className="custom-checkbox__onText">{onText}</span>
      </p>     
    </label>
  )
}






// function CheckboxSource() {

//   return (
//     <label htmlFor="custom-checkbox" className="custom-checkbox-container">
//        <input type="checkbox" value="1" id="custom-checkbox" name="" />
//        <div className="custom-checkbox-background">
//           <span></span>
//        </div>
//        <p>Checkbox <span>Deselected</span> <span>Selected</span></p>     
//     </label>
//   )
// }