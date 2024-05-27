import React, { useRef } from 'react';
import { Howl } from 'howler';
import { useRecoilValue, useRecoilState } from 'recoil'
import { loadingProgress, enterClicked } from '../../state/atoms';

const LoadingScreen = () => {





    const laodingScreenRef = useRef(null);
    const [enterClick, setEnterClicked] = useRecoilState(enterClicked);
  
    const handleClick = () => {
      setEnterClicked(true);
  
      // Check if the ref has been initialized and the current property exists
      if (laodingScreenRef.current && laodingScreenRef.current.style) {
        // Manipulate the translateY property
        laodingScreenRef.current.style.transform = 'translateY(-100%)';
        
        // Optionally, you can add transition or animation properties here
        laodingScreenRef.current.style.transition = 'transform 0.3s ease-out';
      }
  
      // Set display to 'none' after some time
      setTimeout(() => {
        if (laodingScreenRef.current && laodingScreenRef.current.style) {
          laodingScreenRef.current.style.display = 'none';
        }
      }, 300); // 300 milliseconds, adjust as needed
    };




    const progress = useRecoilValue(loadingProgress);

    const playSound = () => {
        const newSound = new Howl({
          src: ['./audios/click_sound.mp3'],
          volume: 0.5,
        });
      
        newSound.play();
          };
      
  return (
    <div ref={laodingScreenRef} className='bg-black absolute z-10 w-screen h-screen flex justify-center items-center flex-col gap-20 '>
      <div className="keycaps flex">
        <div onClick={playSound} className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/1.png" alt="" />
        </div>
        <div onClick={playSound} className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/2.png" alt="" />
        </div>
        <div onClick={playSound} className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/3.png" alt="" />
        </div>
        <div onClick={playSound} className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/4.png" alt="" />
        </div>
        <div onClick={playSound} className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/5.png" alt="" />
        </div>
        <div onClick={playSound} className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/6.png" alt="" />
        </div>
        <div onClick={playSound} className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/7.png" alt="" />
        </div>
        <div onClick={playSound} className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/8.png" alt="" />
        </div>
        <div onClick={playSound} className="key w-24  transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/9.png" alt="" />
        </div>
      </div>


    <div className="cube-loader">
      <div className="cube-top"></div>
      <div className="cube-wrapper">
        <span style={{ '--i': 0 }} className="cube-span"></span>
        <span style={{ '--i': 1 }} className="cube-span"></span>
        <span style={{ '--i': 2 }} className="cube-span"></span>
        <span style={{ '--i': 3 }} className="cube-span"></span>
      </div>
    </div>

    <button id='loading-enter-btn' onClick={progress === 100 ? handleClick : null}>
  {progress === 100 ? "Enter Experience" : Math.floor(progress) + "%"}
</button>


    </div>
  );
};

export default LoadingScreen;
