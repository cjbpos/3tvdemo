import celery from './images/celery.png';
import broccoli from './images/broccoli.png';
import bell from './images/bell.png';
import carrot from './images/carrots.png';
import lettuce from './images/lettuce.png';

import vid3 from './images/c3.mp4';

import './App.css';
import React from 'react';

const images = [celery, broccoli, bell, carrot, lettuce];
const delay = 10000;
var count = 0;

function ThirdMonitor() {
    const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if(timeoutRef.current) {
      count++; //every 10 counts it resets, therefore there is 50 seconds per reset
      //console.log(count); //that is at count 24 we need to show video.
      clearTimeout(timeoutRef.current);
    }
  }
  
  React.useEffect(()=> {
    resetTimeout();
    timeoutRef.current = setTimeout(() =>
    setIndex((prevIndex)=> 
      prevIndex === images.length - 1 ? 0 : prevIndex+1), delay);
    return () => {
      resetTimeout();
    };
  }, [index]);

  function renderContent(){
    if(count <= 20)
    {

      return <div className='slideshowSlider'
      style={{transform: `translate3d(${-index * 100}%,0,0)`}}>
        {images.map((backgroundImage, index) =>
        (<div
          className='slide'
          key={index}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>)
      )}       
      </div>

    }
    else if(count <= 42){
      return (
        <div className='slideshowSlider'> 
            <video className='animated3' src={vid3} autoPlay loop muted/>
      
        </div>
   
      )
      
    }
    else{
      count = 0;
    }
  }

  return (
    <div className="slideshow">
      {renderContent()}; 
    </div>
  );
}

export default ThirdMonitor;
