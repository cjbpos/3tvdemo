import watermelon from './images/watermelon.png';
import mango from'./images/mango.png';
import banana from './images/banana.png';
import blue from './images/blueberry.png';
import strawberry from './images/strawberry.png';

import vid1 from './images/c1.mp4'

import React from 'react';
import './App.css';
import useWebSocket from './useWebSocket';


const slides = [watermelon, mango, banana, blue, strawberry];

function FirstMonitor() {
   

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
            muted={true}
            src={vid1}
            playsInline>
            </video>
       </div>
    </div>
    );

 
}

export default FirstMonitor;
