
export const fromLocalStorage = (key: string, defaultValue: any) => {

  const localString = localStorage.getItem(key);

  if(!localString) return defaultValue;

  if(typeof(defaultValue) === "string") return localString;
  if(typeof(defaultValue) === "number") return parseFloat(localString);

  let obj = defaultValue;
  try{ obj = JSON.parse(localString); }
  catch(err){ }
  return obj;
}



export const toLocalStorage = (key: string, value: any) => {
  const dataStr = typeof(value) !== "object" ? value + "" : JSON.stringify(value)
  localStorage.setItem(key, dataStr)
}