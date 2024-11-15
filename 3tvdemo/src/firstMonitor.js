import watermelon from './images/watermelon.png';
import mango from'./images/mango.png';
import banana from './images/banana.png';
import blue from './images/blueberry.png';
import strawberry from './images/strawberry.png';

import vid1 from './images/c1.mp4'

import React from 'react';
import './App.css';

const images = [watermelon, mango, banana, blue, strawberry];
const delay = 10000;
var count = 0;

function FirstMonitor() {

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
    if(count <= 12)
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
    else if(count <= 14){
      return (
        <div className='slideshowSlider'> 
            <video className='animated1' src={vid1} autoPlay loop muted/>
      
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

export default FirstMonitor;
