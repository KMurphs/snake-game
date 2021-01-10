import { assert } from "console";

export const isOnProductionHost = () => /(localhost|127.0.0.1|127.0.0.0|0.0.0.0)/.exec(window.location.origin) === null;


export const addThousandSeparator = (inp: string, separator: string = " ", pos?: number): string => { 
  
  // Ensure we only deal with integers as strings
  if(`${parseInt(inp.replaceAll(" ",""))}` !== inp) return inp;

  // When pos is not defined, the recursion is about to start
  // set position to the far right of the string
  pos = pos || inp.length; 
  if(pos - 3 <= 0) return inp;
  
  // Add the separator, and recurse
  inp = `${inp.substr(0, pos - 3)}${separator}${inp.substr(pos - 3)}`;
  return addThousandSeparator(inp, separator, pos - 3);
}

