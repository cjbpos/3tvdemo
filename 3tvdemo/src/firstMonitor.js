import watermelon from './images/watermelon.png';
import mango from'./images/mango.png';
import banana from './images/banana.png';
import blue from './images/blueberry.png';
import strawberry from './images/strawberry.png';

import vid1 from './images/c1.mp4'

import React from 'react';
import './App.css';

const slides = [watermelon, mango, banana, blue, strawberry];
//const delay = 10000;
//var count = 0;

function FirstMonitor() {
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
                <source src={vid1} type="video/mp4" />
                Your browser does not support video type
            </video>
       </div>
    </div>
    );

 
}

export default FirstMonitor;
