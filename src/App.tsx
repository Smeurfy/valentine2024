import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

const messagesWithTimers = [
  { text: "Hey boo", image: "" },
  { text: "Whats up girl?", image: "" },
  { text: "WHAAAAAATSSS UUUUUPPPPP", image: "" },
  { text: "sorry...", image: "" },
  { text: "I have an important question to ask you", image: "" },
  { text: "Do...", image: "" },
  { text: "Do...", image: "" },
  { text: "Do...", image: "" },
  { text: "BABY SHARK, DOO, DOO, DOO, DOO, DOO, DOO", image: "" },
  { text: "...", image: "" },
  { text: "Seriously.", image: "" },
  { text: "Do you want to be my valentine?", image: "" },
];

function App() {
  const [index, setIndex] = useState(0);

  const showNextMessage = () => {
    setIndex((ind) => ind + 1);
  };

  return (
    <>
      <div className={styles.background}></div>
      {index < messagesWithTimers.length && (
        <Text
          text={messagesWithTimers[index].text}
          onReachHeight={showNextMessage}
        />
      )}
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
    const height = window.innerHeight;
    const intervalId = setInterval(() => {
      if (position < height + 50) {
        setPosition((pos) => pos + 1);
      } else {
        clearInterval(intervalId); // Stop the interval when position reaches 600
        onReachHeight(); // Trigger the callback to show the next message
        setPosition(0);
      }
    }, 10);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [position, onReachHeight]);

  return (
    <p
      className={styles.text}
      style={{ position: "absolute", top: `${position}px` }}
    >
      {text}
    </p>
  );
};

export default App;
