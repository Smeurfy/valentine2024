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
import Confused from "./assets/confused.jpg";
import Yespls from "./assets/yespls.jpg";
import FinalMeme from "./assets/finalMeme.webp";
import MainAudio from "./assets/mainMusic.mp3";
import WazzupSound from "./assets/Wazzup.mp3";
import BabySharkSound from "./assets/BabyShark.mp3";

const messagesWithTimers = [
  { text: "Hey boo", image: Smiley },
  { text: "Whats up girl?", image: ChillCat },
  { text: "WAAAAAAAZUUU UUUUPPPPPPPPPPP", image: Wazup, audio: WazzupSound },
  { text: "sorry...", image: Releaved },
  { text: "I have an important question to ask you", image: Serious },
  { text: "Do...", image: Embarrassed1 },
  { text: "Do...", image: Embarrassed2 },
  { text: "Do...", image: Embarrassed3 },
  {
    text: "BABY SHARK, DOO, DOO, DOO, DOO, DOO, DOO",
    image: BabyShark,
    audio: BabySharkSound,
  },
  { text: "...", image: NoWords },
  { text: "pls forgive me...", image: Forgive },
  { text: "Do you want to be my valentine?", image: Valentine },
];

function App() {
  const [index, setIndex] = useState(0);
  const [victory, setVictory] = useState(false);

  const showNextMessage = () => {
    setIndex((ind) => ind + 1);
  };

  return (
    <>
      <audio controls autoPlay>
        <source src={MainAudio} type="audio/mp3"></source>
      </audio>
      <div className={styles.background}></div>
      {!victory &&
        (index < messagesWithTimers.length ? (
          <MoveElements
            text={messagesWithTimers[index].text}
            imgSrc={messagesWithTimers[index].image}
            audioSrc={messagesWithTimers[index].audio ?? ""}
            onReachHeight={showNextMessage}
          />
        ) : (
          <FinalMessage onYesClick={() => setVictory(true)} />
        ))}
      {victory && (
        <div className={styles.victoryContainer}>
          <h1>{"Love you <3!!!"}</h1>
          <img src={FinalMeme} alt="Final Meme" />
        </div>
      )}
    </>
  );
}

const FinalMessage = ({ onYesClick }: { onYesClick: () => void }) => {
  const [scale, setScale] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [finalImg, setFinalImg] = useState(false);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (scale < 50) {
        setScale((scale) => scale + 0.2);
      }
      if (scale > 5) setFinalImg(true);
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [scale]);
  return (
    <div className={styles.finalContainer}>
      <h1>What do you say monna mor?</h1>
      <h2>Wanna be my valentine?</h2>
      <div className={styles.buttonsContainer}>
        <button disabled={disabled} onClick={() => setDisabled(true)}>
          No
        </button>
        <button
          style={{ transform: `scale(${scale})` }}
          onClick={() => onYesClick()}
        >
          Yes
        </button>
      </div>
      {disabled && <img src={Confused}></img>}
      {finalImg && <img src={Yespls}></img>}
    </div>
  );
};

const MoveElements = ({
  text,
  imgSrc,
  audioSrc,
  onReachHeight,
}: {
  text: string;
  imgSrc: string;
  audioSrc?: string;
  onReachHeight: () => void;
}) => {
  const [position, setPosition] = useState(-200);

  useEffect(() => {
    const height = window.innerHeight;
    const intervalId = setTimeout(() => {
      if (position < height + 50) {
        setPosition((pos) => pos + 1);
      } else {
        clearInterval(intervalId); // Stop the interval when position reaches 600
        onReachHeight(); // Trigger the callback to show the next message
        setPosition(-200);
      }
    }, 10);

    return () => clearTimeout(intervalId);

    // Cleanup the interval on component unmount
  }, [position, onReachHeight]);

  return (
    <div
      className={styles.container}
      style={{ position: "absolute", top: `${position}px` }}
    >
      {audioSrc && (
        <audio autoPlay>
          <source src={audioSrc} type="audio/mp3"></source>
        </audio>
      )}
      <img className={styles.img} src={imgSrc}></img>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default App;
