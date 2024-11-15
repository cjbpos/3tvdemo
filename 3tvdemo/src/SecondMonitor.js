import './App.css';
import React from 'react';

import meat from './images/meat.png';
import chicken from './images/chicken.png';
import bbq from './images/bbq.png';
import rib from './images/ribs.png';
import steak from './images/steak.png';

import vid2 from './images/c2.mp4';

const delay = 10000;
var count = 0;
const images = [meat, chicken, bbq, rib, steak]

function SecondMonitor() {
    
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if(timeoutRef.current) {
          count++;
          //console.log(count);
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
                <video className='animated2' src={vid2} autoPlay loop muted/>
          
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

export default SecondMonitor;