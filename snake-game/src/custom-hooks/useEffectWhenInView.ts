import { useLayoutEffect } from "react";

/**
 * Generalization of the "lazy loading" functionality. 
 * 
 * The function uses an Intersection Observer to determine 
 * when a html target element (identified by the "cssSelector" argument)
 * enters in view.
 * 
 * When that happens the callback (effect) is fired.
 * 
 * 
 * @param  {string} cssSelector
 * @param  {Function} callback
 */
export const useEffectWhenInView = (cssSelector: string, callback: Function)=>{

  useLayoutEffect(()=>{

    const el = document.querySelector(cssSelector);
    const intObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => callback && (entry.intersectionRatio > 0) && callback(entry))
    }, {threshold: [.9]})

    el && intObserver.observe(el)

    return el ? () => intObserver.unobserve(el) : ()=>{};

  }, [cssSelector, callback])

}