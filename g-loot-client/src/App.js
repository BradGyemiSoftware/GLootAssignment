import React, { useState } from 'react';
import './App.css';
import TitleComponent from './components/TitleComponent.js';
import AnimatedStripe from './components/AnimatedStripe.js';
import CommunicationBox from './components/CommunicationBox.js';
import {MenuBox} from './components/MenuBox.js';

function App() {

  /*** I REALISE THAT THE MOUSE MOVING THE
       BACKGROUND GRADIENT CAUSES A LOT OF
       RE-RENDERS. GIVEN MORE TIME I WOULD FIX THIS ***/

  // Keep Track of Mouse Position
  const [mouseX, setMouseX] = useState(0);

  // Update Mouse State on Mouse Move
  function handleMouseMove(event) {
    setMouseX(event.clientX);
  }

  // This function updates the angle associated with the background gradient
  // It is used to overwrite the backgroundImage property of the background
  function linearGradientStyle() {
    var w = window.innerWidth;
    var pct = 360*(+mouseX)/w;
    var bg = "linear-gradient(" + Math.floor(pct) + "deg, #00d9ff -200% , #2f2554 100%)";
    return bg;
  }

  // Render The App
  return (
    <div className="App">
      <header className="App-header">
        <div className="linear-gradient"
             style={{backgroundImage: linearGradientStyle()}}
             onMouseMove={(e) => handleMouseMove(e)}
        >
          <TitleComponent />
          <CommunicationBox />
          <AnimatedStripe />
          <MenuBox />

          <img className="neon-man-1" src="neon-man-1-2.png" alt="custom edited neon man"/>
        </div>

      </header>
    </div>
  );
}

export default App;
