// https://javascriptio.com/view/4915713/react-navigation-that-will-smooth-scroll-to-section-of-the-page
// https://codesandbox.io/s/falling-https-jwrj3?file=/src/App.tsx:636-686
// https://stackoverflow.com/a/16171238/9034699

import { useEffect, useMemo } from "react";
/**
 * When using multiple components on the same with different react router 'routes',
 * this hook will use (smooth) transition to get to bring the component with 'targetID' to
 * the top left of the page.
 * 
 * 
 * @param  {string} targetID
 * @param  {any} clickEvent?
 * @param  {string} targetURI?
 * @param  {boolean=false} smooth
 */
export const scrollIDIntoViewHelper = (targetID: string, clickEvent?: any, targetURI?: string, smooth: boolean = false)=>{
  
  // We are essentially hijacking the click event which does not really work with react router
  clickEvent && clickEvent.preventDefault && clickEvent.preventDefault();

  // Scroll element with provided id into view
  const targetElmt = document.getElementById(targetID);
  targetElmt && targetElmt.scrollIntoView(smooth ? { behavior: "smooth", block: "start" } : { block: "start" });

  // Update the url
  targetURI && window.history.pushState(targetID, targetID, `/${targetURI ? targetURI : targetID}`);
}

// useEffect(scrollURLIDIntoViewHelper) use with interval?
/**
 * When using multiple components on the same with different react router 'routes',
 * this hook will use (smooth) transition to get to bring the component with 'targetID' to
 * the top left of the page.
 * This hook assumes that the route is actually the id of the component to scroll to
 * 
 * @param  {boolean=false} smooth
 */
export const scrollURLIDIntoViewHelper = (smooth: boolean = false)=>{
  
  // This function assumes that the last uri corresponds to the id of the element
  // that must be scrolled into view
  const url = window.location.href.split("/");
  const target = url[url.length - 1];//.toLowerCase();
  const element = document.getElementById(target);

  // Adjust view to display component with id from uri
  element && element.scrollIntoView(smooth ? { behavior: "smooth", block: "start" } : { block: "start" });
}

/**
 * This function will ensure that the application is redirected to 
 * the "uri" input argument on load/page refresh.
 * 
 * @param  {string="Home"} uri
 */
export const useResetURIOnLoad = (uri: string = "Home") => {
  const handleResetURI = () => window.history.pushState(uri, uri, `/${uri}`);
  
  useEffect(() => {
    window.addEventListener("load", handleResetURI);

    return () => {
      // Clean up the listener
      window.removeEventListener("load", handleResetURI);
    };
  });
}


/**
 * Attempts to extract the base URI of the application.
 * When used with react router, this is done before react router
 * start meddling with the urls.
 * 
 * This function is probably not in its final form. But this will do while
 * I find something better instead.
 * 
 * @param  {string="/"} baseAppURI: Optional input if the logic to extract the uri fails.
 */
export const useAppURI = (baseAppURI: string = "/") =>{
  const uri = useMemo(()=>{
    const baseCurrURI = window.location.pathname.split("/")[1]
    const uri = (!baseCurrURI || (baseCurrURI === "")) ? `/${baseAppURI}` : `/${baseCurrURI}`; 
    return uri.replaceAll("//", "/");
  }, [1]);
  return uri;
}
/**
 * When using react router with github pages and an application that lives at '<host>/baseUri/' , 
 * refeshing the page causes github to send back a 404 Page.
 * This function will make sure to redirect the application the '<host>/baseUri/' after refreshing.
 * 
 * onCondition is provided to avoid performing the redirection when 'condition()' evaluates to false.
 * This function is used until I find a better solution.
 * 
 * @param  {string="Home"} baseAppURI
 * @param  {()=>boolean} onCondition?
 */
export const useResetToBaseURIOnLoad = (baseAppURI?: string, onCondition?: ()=>boolean) => {
  const uri = useAppURI(baseAppURI || "/");
  
  const handleResetURI = () => {
    const condition = onCondition ? onCondition() : true;
    // condition && window.history.pushState(uri, uri, `${uri}`)
    window.history.pushState(uri, uri, `${uri}`);
    console.log(uri, uri, `${uri}`, condition);
  };
  
  useEffect(() => {
    window.addEventListener("load", handleResetURI);

    return () => {
      // Clean up the listener
      window.removeEventListener("load", handleResetURI);
    };
  });
}
// export const useSyncURIAndDisplay = ()=>{
  
//   // This function assumes that the last uri corresponds to the id of the element
//   // that must be scrolled into view
//   let url = window.location.href.split("/");
//   let target = url[url.length - 1].toLowerCase();
//   let element = document.getElementById(target);

//   // Adjust view to display component with id from uri
//   element && element.scrollIntoView(smooth ? { behavior: "smooth", block: "start" } : { block: "start" });
// }