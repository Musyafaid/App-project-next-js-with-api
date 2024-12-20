"use client";

import Lottie from 'react-lottie-player';
import animationData from '../../public/animations/loading.json';

const Loading = ({ fit = false }) => {
  const isFullScreen = !fit; // Jika `fit` tidak diberikan, gunakan fullscreen

  return (
    <div
      className={`${
        isFullScreen
          ? 'fixed top-0 left-0 w-full h-full' // Fullscreen
          : 'w-full h-full' // Fit parent
      } flex items-center justify-center z-10`}
    >
      {isFullScreen && (
        <div className="absolute bg-blue-50 w-full h-full z-0 blur-2xl"></div>
      )}

      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default Loading;
