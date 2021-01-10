import React, { useState } from "react";
import useClickAnimation from "../custom-hooks/useClickAnimation";
import "./modal.css";

type Props = {
  children: React.ReactNode | React.ReactNode[],
  show: boolean,
  onClose: ()=>void,
  containerExtraClasses?: string 
}



// https://codemyui.com/tag/microinteractions/page/2/
export default function Modal({children, show, onClose, containerExtraClasses}: Props) {

  const onAnimatedClick = useClickAnimation("animating", 300, onClose)


  return (
    <div className={`modal__outer-container fixed left-0 right-0 top-0 bottom-0 bg-gray-800 flex items-center justify-center overflow-hidden container-frozen ${show ? "modal--zoom-in--visible" : "modal--zoom-in--invisible"}`}>
      <div className={`modal__inner-container w-min max-w-11/12 bg-gray-600 p-2 rounded-sm relative ${containerExtraClasses}`}>
        <>
          <button onClick={onAnimatedClick} className={`modal__close-btn bg-inherit inline-flex justify-center items-center w-8 h-8 rounded-full absolute -top-3 -right-3 focus:outline-none`}>
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
          {children}
        </>
      </div>
    </div>
  )
}
