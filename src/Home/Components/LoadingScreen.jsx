import React, { useRef } from "react";
import { Howl } from "howler";
import { useSnapshot } from "valtio";
import state from "../../state/state"; // Import the shared state

const LoadingScreen = () => {
  const loadingScreenRef = useRef(null);

  const snapshot = useSnapshot(state);
  let CLICKED_ENTER = snapshot.step;

  const handleClick = () => {
    CLICKED_ENTER = true;
    state.enterClicked = CLICKED_ENTER;

    // Check if the ref has been initialized and the current property exists
    if (loadingScreenRef.current && loadingScreenRef.current.style) {
      // Manipulate the translateY property
      loadingScreenRef.current.style.transform = "translateY(-100%)";

      // Optionally, you can add transition or animation properties here
      loadingScreenRef.current.style.transition = "transform 0.3s ease-out";
    }

    // Set display to 'none' after some time
    setTimeout(() => {
      if (loadingScreenRef.current && loadingScreenRef.current.style) {
        loadingScreenRef.current.style.display = "none";
      }
    }, 300); // 300 milliseconds, adjust as needed
  };

  const playSound = () => {
    const newSound = new Howl({
      src: ["./audios/click_sound.mp3"],
      volume: 0.5,
    });

    newSound.play();
  };

  return (
    <div
      ref={loadingScreenRef}
      className="bg-black absolute z-50 w-screen h-screen flex justify-center items-center flex-col gap-20 "
    >
   <div className="keycaps flex w-72 lg:w-[600px]">
  <div
    onClick={playSound}
    className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1"
  >
    <img src="./dialedweb_keys/1.png" alt="" className="glow-effect" />
  </div>
  <div
    onClick={playSound}
    className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1"
  >
    <img src="./dialedweb_keys/2.png" alt="" className="glow-effect" />
  </div>
  <div
    onClick={playSound}
    className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1"
  >
    <img src="./dialedweb_keys/3.png" alt="" className="glow-effect" />
  </div>
  <div
    onClick={playSound}
    className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1"
  >
    <img src="./dialedweb_keys/4.png" alt="" className="glow-effect" />
  </div>
  <div
    onClick={playSound}
    className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1"
  >
    <img src="./dialedweb_keys/5.png" alt="" className="glow-effect" />
  </div>
  <div
    onClick={playSound}
    className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1"
  >
    <img src="./dialedweb_keys/6.png" alt="" className="glow-effect" />
  </div>
  <div
    onClick={playSound}
    className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1"
  >
    <img src="./dialedweb_keys/7.png" alt="" className="glow-effect" />
  </div>
  <div
    onClick={playSound}
    className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1"
  >
    <img src="./dialedweb_keys/8.png" alt="" className="glow-effect" />
  </div>
  <div
    onClick={playSound}
    className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1"
  >
    <img src="./dialedweb_keys/9.png" alt="" className="glow-effect" />
  </div>
</div>

      <button
        id="loading-enter-btn"
        className="text-4xl uppercase fontHorizon"
        onClick={snapshot.loadingProgress === 100 ? handleClick : null}
      >
        {snapshot.loadingProgress === 100
          ? "Enter Experience"
          : Math.floor(snapshot.loadingProgress) + "%"}
      </button>
    </div>
  );
};

export default LoadingScreen;
