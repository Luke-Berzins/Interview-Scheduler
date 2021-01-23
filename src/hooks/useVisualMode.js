import React, { useState } from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace) {
      history[history.length-1] = newMode;
    } else {
      setHistory([...history, newMode]) 
    }
    console.log("history is", history)
    console.log("transition to: ", newMode)
    setMode(newMode) 
  }
  
  const back = () => {
    if (history.length === 1) return;
    let newHistory = history.slice(0, history.length -1)
    console.log("newhistory in back is:", newHistory)
    setHistory([...newHistory])
    // setHistory(prev => ([...prev, newHistory]))
    console.log("history is", history)
    console.log("backing to: ", history[history.length - 2])
    setMode(history[history.length - 2])
  };
  return { mode, transition, back };

}
