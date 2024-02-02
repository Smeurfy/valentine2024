import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

const messagesWithTimers = [
  { text: "Hey boo", timer: 1000 },
  { text: "Whats up girl?", timer: 1500 },
  { text: "WHAAAAAATSSS UUUUUPPPPP", timer: 2000 },
  { text: "sorry...", timer: 1000 },
  { text: "I have an important question to ask you", timer: 2500 },
  { text: "Do...", timer: 1000 },
  { text: "Do...", timer: 1000 },
  { text: "Do...", timer: 1000 },
  { text: "BABY SHARK, DOO, DOO, DOO, DOO, DOO, DOO", timer: 3000 },
  { text: "...", timer: 500 },
  { text: "Seriously.", timer: 1000 },
  { text: "Do you want to be my valentine?", timer: 3000 },
];
function App() {
  const [index, setIndex] = useState(0);

  const showNextMessage = () => {
    setIndex((ind) => ind++);
  };
  return (
    <>
      <div className={styles.background}></div>
      <Text
        text={messagesWithTimers[index].text}
        onReachHeight={showNextMessage}
      ></Text>
    </>
  );
}

const Text = ({
  text,
  onReachHeight,
}: {
  text: string;
  onReachHeight: () => void;
}) => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    setInterval(() => {
      if (position < 600) {
        setPosition((pos) => pos++);
      }
    }, 10000);
  }, []);

  return <p style={{ position: "absolute", top: `${position}` }}>{text}</p>;
};

export default App;
