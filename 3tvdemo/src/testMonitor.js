import "./App.css";
import React from "react";
import useWebSocket from "./useWebSocket";

import carrot from './images/carrots.png'
import banana from './images/banana.png'
import bbq from './images/bbq.png'
import vid1 from './images/c1.mp4'

import ReactPlayer from 'react-player';
import a from '/Users/Carlos Jimenez/Documents/3tvdemo/3tvdemo/src/images/c1.mp4' 

const vidPath = 'http://localhost/sdcard/Users/Carlos Jimenez/Documents/3tvdemo/3tvdemo/src/images/c1.mp4'


/*function TestMonitor() {
    useWebSocket('ws://localhost:8080');

    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [showVideo, setShowVideo] = React.useState(false);
    //const videoRef = React.useRef(null);
    const slides = [carrot,banana,bbq];

    const handleVideoEnd = () => {
        setShowVideo(false);
        startSlideshow();
        videoTimeout = setTimeout(startVideoPlayback, 30000);
    };

        React.useEffect(() => {
            let slideInterval;
            let videoTimeout;
        
            const startSlideshow = () => {
                slideInterval = setInterval(() => {
                    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
                }, 5000);
            };
        
            const startVideoPlayback = () => {
                setShowVideo(true);
                clearInterval(slideInterval);
             
            };
        
           
        
            startSlideshow();
            videoTimeout = setTimeout(startVideoPlayback, 30000);
        
            return () => {
                clearInterval(slideInterval);
                clearTimeout(videoTimeout);
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
        {showVideo && (
            <div className={`video-container ${showVideo ? 'visible': 'hidden'}`}>
                <ReactPlayer playing='true' url={vid1} muted width="100%" height="100vh" onEnded={handleVideoEnd}/>
            </div>
        )}
    </div>
    );
};*/


/*function TestMonitor() {
    useWebSocket('ws://localhost:8080');

    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [showVideo, setShowVideo] = React.useState(false);
    const slides = [carrot, banana, bbq];

    // Refs to hold interval and timeout IDs
    const slideIntervalRef = React.useRef(null);
    const videoTimeoutRef = React.useRef(null);

    const startSlideshow = () => {
        slideIntervalRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
    };

    const startVideoPlayback = () => {
        setShowVideo(true);
        if (slideIntervalRef.current) {
            clearInterval(slideIntervalRef.current);
        }
    };

    const handleVideoEnd = () => {
        console.log('Video ended, restarting slideshow');
        setShowVideo(false);
        startSlideshow();
        videoTimeoutRef.current = setTimeout(startVideoPlayback, 30000); // Schedule next video playback
    };

    React.useEffect(() => {
        startSlideshow();
        videoTimeoutRef.current = setTimeout(startVideoPlayback, 30000);

        return () => {
            if (slideIntervalRef.current) {
                clearInterval(slideIntervalRef.current);
            }
            if (videoTimeoutRef.current) {
                clearTimeout(videoTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="newSlideshow">
            {slides.map((slide, index) => (
                <div key={index}
                     className={`newSlide ${index === currentSlide && !showVideo ? 'active' : ''}`}>
                    <img src={slide} alt={`Slide ${index + 1}`} />
                </div>
            ))}
            {showVideo && (
                <div className={`video-container ${showVideo ? 'visible' : 'hidden'}`}>
                    <ReactPlayer
                        url={vid1}
                        playing
                        muted
                        width="100%"
                        height="100vh"
                        onEnded={handleVideoEnd} // Correctly pass the function
                    />
                </div>
            )}
        </div>
    );
}*/


function TestMonitor() {
    useWebSocket('ws://localhost:8080');

    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [showVideo, setShowVideo] = React.useState(false);
    const slides = [carrot, banana, bbq];

    // Refs to hold interval and timeout IDs
    const slideIntervalRef = React.useRef(null);
    const videoTimeoutRef = React.useRef(null);

    const startSlideshow = () => {
        slideIntervalRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
    };

    const handleVideoEnd = () => {
        console.log('Video ended, restarting slideshow');
        setShowVideo(false);
        startSlideshow();
        videoTimeoutRef.current = setTimeout(() => setShowVideo(true), 30000); // Schedule next video playback
    };

    React.useEffect(() => {
        startSlideshow();
        videoTimeoutRef.current = setTimeout(() => setShowVideo(true), 30000);

        return () => {
            if (slideIntervalRef.current) {
                clearInterval(slideIntervalRef.current);
            }
            if (videoTimeoutRef.current) {
                clearTimeout(videoTimeoutRef.current);
            }
        };
    }, [slides.length]);

    return (
        <div className="newSlideshow">
            {slides.map((slide, index) => (
                <div key={index}
                     className={`newSlide ${index === currentSlide && !showVideo ? 'active' : ''}`}>
                    <img src={slide} alt={`Slide ${index + 1}`} />
                </div>
            ))}
            {showVideo && (
                <div className={`video-container ${showVideo ? 'visible' : 'hidden'}`}>
                    <ReactPlayer
                        url={vidPath}
                        muted
                        width="100%"
                        height="100vh"
                        onEnded={handleVideoEnd} // Correctly pass the function
                    />
                </div>
            )}
        </div>
    );
}


export default TestMonitor;