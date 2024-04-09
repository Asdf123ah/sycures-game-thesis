import React from "react";
import { useNavigate } from "react-router-dom";
import gamePictureLogo from "./Photos/gamePictureLogo.png";
import "./SplashScreen.css";

function SplashScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="splash-screen" onClick={handleStart}>
      <img className="image-splash" src={gamePictureLogo} alt="Game Logo" loading="eager"/>
      <p className="instruction-text">Click anywhere to continue</p>
    </div>
  );
}

export default SplashScreen;
