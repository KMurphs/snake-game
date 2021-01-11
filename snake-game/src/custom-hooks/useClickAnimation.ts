

export default function useClickAnimation(

    animationClass: string = "animating", 
    animationPeriod: number = 300, 
    callback?: (data?: any)=>void
  
  ){

  const onAnimatedClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, data?: any)=>{
    
    // Get a handle on the element click, and being animating
    const target = ev.currentTarget;
    !target.classList.contains(animationClass) && target.classList.add(animationClass);

    setTimeout(()=>{

      // A few moments have passed. Force stop the animation
      // and execute the callback if any
      target.classList.remove(animationClass);
      callback && callback(data);
      
    }, animationPeriod)
  }

  return onAnimatedClick;
}