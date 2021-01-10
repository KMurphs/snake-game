import { useState } from "react";

export const useForceRerender = () =>{
  const [, setDummy] = useState<boolean>(true);
  const forceRerender = ()=> setDummy(dummy=>!dummy);
  return forceRerender;
}