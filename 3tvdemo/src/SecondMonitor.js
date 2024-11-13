import './App.css';
import React from 'react';

const delay = 10000;
var count = 0;

function SecondMonitor() {
    
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if(timeoutRef.current) {
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


      return (
        <div className='slideshow'>

        </div>
      )


}

export default SecondMonitor;