import React, { useEffect } from "react";

function RefreshOnUnload() {
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('refreshPage', Date.now());
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    
    return null;
}

export default RefreshOnUnload;