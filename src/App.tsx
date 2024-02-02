import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import Smiley from "./assets/smiley-sunglasses.webp";
import ChillCat from "./assets/chill_cat.jpg";
import Wazup from "./assets/wazzup.gif";
import Releaved from "./assets/releaved.png";
import Serious from "./assets/serious.png";
import Embarrassed1 from "./assets/embarrassed1.png";
import Embarrassed2 from "./assets/embarrassed2.png";
import Embarrassed3 from "./assets/embarrassed3.png";
import BabyShark from "./assets/babyShark.gif";
import NoWords from "./assets/noWords.jpg";
import Forgive from "./assets/Forgive.jpg";
import Valentine from "./assets/valentine.gif";

const messagesWithTimers = [
  { text: "Hey boo", image: Smiley },
  { text: "Whats up girl?", image: ChillCat },
  { text: "WAAAAAAAZUUU UUUUPPPPPPPPPPP", image: Wazup },
  { text: "sorry...", image: Releaved },
  { text: "I have an important question to ask you", image: Serious },
  { text: "Do...", image: Embarrassed1 },
  { text: "Do...", image: Embarrassed2 },
  { text: "Do...", image: Embarrassed3 },
  { text: "BABY SHARK, DOO, DOO, DOO, DOO, DOO, DOO", image: BabyShark },
  { text: "...", image: NoWords },
  { text: "pls forgive me...", image: Forgive },
  { text: "Do you want to be my valentine?", image: Valentine },
];

function App() {
  const [index, setIndex] = useState(0);

  const showNextMessage = () => {
    setIndex((ind) => ind + 1);
  };

  return (
    <>
      <div className={styles.background}></div>
      {index < messagesWithTimers.length ? (
        <Text
          text={messagesWithTimers[index].text}
          imgSrc={messagesWithTimers[index].image}
          onReachHeight={showNextMessage}
        />
      ) : (
        <div>
          <h1>What do you say monna mor?</h1>
          <button>No</button>
          <button>Yes</button>
        </div>
      )}
    </>
  );
}

const Text = ({
  text,
  imgSrc,
  onReachHeight,
}: {
  text: string;
  imgSrc: string;
  onReachHeight: () => void;
}) => {
  const [position, setPosition] = useState(-200);

  useEffect(() => {
    const height = window.innerHeight;
    const intervalId = setInterval(() => {
      if (position < height + 50) {
        setPosition((pos) => pos + 5);
      } else {
        clearInterval(intervalId); // Stop the interval when position reaches 600
        onReachHeight(); // Trigger the callback to show the next message
        setPosition(-200);
      }
    }, 10);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [position, onReachHeight]);

  return (
    <div
      className={styles.container}
      style={{ position: "absolute", top: `${position}px` }}
    >
      <img className={styles.img} src={imgSrc}></img>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default App;
