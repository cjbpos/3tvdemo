import React, { useEffect } from 'react';


function RefreshListener() {
    React.useEffect(() => {
        const handleStorageChange = (event) => {
            if(event.key === 'refreshPage') {
                window.location.reload();  
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return null;
}


export default RefreshListener;