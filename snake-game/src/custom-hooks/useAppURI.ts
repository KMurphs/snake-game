import { useMemo } from "react";

export const useAppURI = (baseAppURI: string = "/") =>{
  const uri = useMemo(()=>{
    const baseCurrURI = window.location.pathname.split("/")[1]
    const uri = (!baseCurrURI || (baseCurrURI === "")) ? `/${baseAppURI}` : `/${baseCurrURI}`; 
    return uri.replaceAll("//", "/");
  }, [1]);
  return uri;
}

