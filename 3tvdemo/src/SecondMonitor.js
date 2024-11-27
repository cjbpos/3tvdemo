import './App.css';
import React from 'react';
import useWebSocket from './useWebSocket';

import meat from './images/meat.png';
import chicken from './images/chicken.png';
import bbq from './images/bbq.png';
import rib from './images/ribs.png';
import steak from './images/steak.png';

import vid2 from './images/c2.mp4';


const slides = [meat, chicken, bbq, rib, steak]

function SecondMonitor() {
    

    useWebSocket('ws://192.168.88.92:8080');
    
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [showVideo, setShowVideo] = React.useState(false);
  const videoRef = React.useRef(null);


  React.useEffect(() => {
    let slideInterval;
    let videoTimeout;

    const startSlideshow = () => {
        slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 10000);
    };

    const startVideoPlayback = () => {
        setShowVideo(true);
        clearInterval(slideInterval);
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.error('Error playing the video:', error);
                });
            }
        }
    };

    const handleVideoEnd = () => {
        setShowVideo(false);
        if (videoRef.current) {
            //videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        startSlideshow();
        videoTimeout = setTimeout(startVideoPlayback, 60000);
    };

    startSlideshow();
    videoTimeout = setTimeout(startVideoPlayback, 60000);

    if (videoRef.current) {
        videoRef.current.addEventListener('ended', handleVideoEnd);
    }

    return () => {
        clearInterval(slideInterval);
        clearTimeout(videoTimeout);
        if (videoRef.current) {
            videoRef.current.removeEventListener('ended', handleVideoEnd);
        }
    };
    }, [slides.length]);

  return (
  <div className="newSlideshow">
      {slides.map((slide,index) => (
          <div key={index}
          className={`newSlide ${index === currentSlide && !showVideo ? 'active' : ''}`}>
              <img src={slide} alt={`Slide ${index+1}`} />
          </div>    
      ))}
      <div className={`video-container ${showVideo? 'visible': 'hidden'}`}>
          <video 
          ref={videoRef}
          muted>
              <source src={vid2} type="video/mp4" />
              Your browser does not support video type
          </video>
     </div>
  </div>
  );

}

export default SecondMonitor;