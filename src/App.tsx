import { useEffect, useRef, useState } from "react";
import "./App.css";

const createColor = () => {
  const randomItems = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    const randomLatter = `${randomItems[Math.floor(Math.random() * randomItems.length)]}`;
    color += randomLatter;
  }
  return `#${color}`;
};

const App = () => {
  const [mainColor, setMainColor] = useState("");
  const correct = useRef<null | number>(null);
  const [answer, setAnswer] = useState<null | boolean>(null);
  const status = answer === null ? "idle" : answer ? "winner" : "loser";

  const reset = () => {
    setMainColor(createColor());
    correct.current = Math.floor(Math.random() * 3);
  };

  const handleClick = (idx: number) => {
    setAnswer(idx === correct.current ? true : false);
    reset();
  };

  useEffect(() => {
    setMainColor(createColor());
    correct.current = Math.floor(Math.random() * 3);
  }, []);
  return (
    <main>
      <div className="color-box" style={{ backgroundColor: mainColor }}></div>
      <div className="btns">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <button
              onClick={() => handleClick(idx)}
              key={idx}
              className={`btn ${correct.current === idx ? "correct" : ""}`}
            >
              {correct.current === idx ? mainColor : createColor()}
            </button>
          ))}
      </div>
      <div className={`result`}>
        status: <span className={status}>{status}</span>;
      </div>
    </main>
  );
};

export default App;
