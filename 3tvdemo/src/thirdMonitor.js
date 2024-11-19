import celery from './images/celery.png';
import broccoli from './images/broccoli.png';
import bell from './images/bell.png';
import carrot from './images/carrots.png';
import lettuce from './images/lettuce.png';

import vid3 from './images/c3.mp4';

import './App.css';
import React from 'react';

const slides = [celery, broccoli, bell, carrot, lettuce];
//const delay = 10000;
//var count = 0;


function ThirdMonitor() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
    const [showVideo, setShowVideo] = React.useState(false);
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        let slideInterval;
        
        const startSlideshow = () => {
            slideInterval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide+1) % slides.length);
            }, 10000);
        };

        startSlideshow();

        const videoTimeout = setTimeout(() => {
            setShowVideo(true);
            clearInterval(slideInterval);
            if(videoRef.current) {
                videoRef.current.play();
            }
        }, 60000);
    
        const handleVideoEnd = () => {
            setShowVideo(false);
        
            if(videoRef.current){
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
            startSlideshow();
            setTimeout(() => {
                setShowVideo(true);
                clearInterval(slideInterval);
                if(videoRef.current){
                    videoRef.current.play()
                }
            }, 60000)
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('ended', handleVideoEnd)
        }
        return () => {
            clearInterval(slideInterval);
            clearInterval(videoTimeout);
            if (videoRef.current) {
                videoRef.current.removeEventListener('ended', handleVideoEnd)
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
                <source src={vid3} type="video/mp4" />
                Your browser does not support video type
            </video>
       </div>
    </div>
    );
  
}

export default ThirdMonitor;
