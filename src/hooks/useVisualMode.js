import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace) {
      // Replace makes it so certain transitions such as Error, aren't logged in history
      history[history.length-1] = newMode;
    } else {
      setHistory([...history, newMode]) 
    }
    setMode(newMode) 
  }
  
  const back = () => {
    // Prevents from backing past the first state
    if (history.length === 1) return;
    let newHistory = history.slice(0, history.length -1)
    setHistory([...newHistory])
    // Set the mode to the one previous to the current state
    setMode(history[history.length - 2])
  };
  return { mode, transition, back };
}
