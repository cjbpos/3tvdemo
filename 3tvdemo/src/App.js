//import logo from './logo.svg';
import carrot from './images/carrots.png';
import watermelon from './images/watermelon.png';
import mango from'./images/mango.png';
import meat from './images/meat.png';
import chicken from './images/chicken.png';
import celery from './images/celery.png';
import broccoli from './images/broccoli.png';
import banana from './images/banana.png';
import bbq from './images/bbq.png';
import bell from './images/bell.png';
import blue from './images/blueberry.png';
import lettuce from './images/lettuce.png';
import strawberry from './images/strawberry.png';
import rib from './images/ribs.png';
import steak from './images/steak.png';

import waves from './images/waves.mp4';
import clock from './images/clock.mp4';
import video1 from './images/forest.mp4';
import './App.css';
import React from 'react';

const images = [carrot, watermelon, chicken,celery, mango, meat,lettuce, strawberry, steak, broccoli, blue, rib, bell, banana, bbq]; 

const delay = 10000;
var count = 0;

function App() {

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if(timeoutRef.current) {
      //count++; //every 10 counts it resets, therefore there is 50 seconds per reset
      //console.log(count); //that is at count 24 we need to show video.
      clearTimeout(timeoutRef.current);
    }
  }
  
  React.useEffect(()=> {
    resetTimeout();
    timeoutRef.current = setTimeout(() =>
    setIndex((prevIndex)=> 
      prevIndex === 4 ? 0 : prevIndex+1), delay);
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
    else if(count <= 72){
      return (
        <div>
          <video src={video1} autoPlay loop muted className='slideVideo'>
          </video>
          <video src={clock} autoPlay loop muted className='slideVideo'>
          </video>
          <video src={waves} autoPlay loop muted className='slideVideo'>
          </video>
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

export default App;
