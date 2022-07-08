import "./styles.css";
// Convert the following class component to functional components
import { useEffect, useState } from "react";

const App = () => {
  const [timers, setTimers] = useState([<Timer />]);

  const creatTimer = () => {
    let newList = [...timers];
    newList.push(<Timer />);
    setTimers(newList);
    //setTimers([...timers, <Timer />]);
  };

  const removeTimer = () => {
    let newList = [...timers];
    //newList.splice(0, 1);
    newList = newList.slice(1);
    setTimers(newList);
  };

  return (
    <div className="App">
      <button onClick={creatTimer}>ADD TIMER</button>
      <button onClick={removeTimer}>REMOVE TIMER</button>
      {timers}
    </div>
  );
};

// Timer component
const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let interval = "";

  useEffect(() => {
    // componentDidMount
    if (!isRunning) {
      interval = window.setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      window.clearInterval(interval);
    }

    return () => {
      // componentWillUnmount
      window.clearInterval(interval);
    };
  }, [isRunning]);

  const handelReset = () => {
    window.clearInterval(interval);
    setTimer(0);
    setIsRunning(false);
  };

  const handlePause = () => {
    // toggle between true and false
    setIsRunning(!isRunning);
  };

  return (
    <div className="timer">
      <p>Timer {timer}</p>
      <button onClick={handlePause}>{!isRunning ? "PAUSE" : "START"}</button>
      <button onClick={handelReset}>RESET</button>
    </div>
  );
};

export default App;
