import { useEffect, useRef} from 'react';

const useWebSocket = (url) => {
    const socketRef = useRef(null);
    const isUnloading = useRef(false);

    useEffect(() => {
        const connectWebSocket = () => {
            socketRef.current = new WebSocket(url);
            socketRef.current.onopen = () => {
                console.log("WebSocket connection established");

                const getChromiumInfo = () => {
                    const userAgent = navigator.userAgent;
                    let isChromium = false;
                    let version = 'Unknown';

                    if(userAgent.indexOf("Chrome") !== -1 || userAgent.indexOf("Chromium") !== -1 || userAgent.indexOf("Edge") !== -1) {
                        isChromium = true;
                        const versionMatch = userAgent.match(/(Chrome|Chromium|Edg)\/(\d+\.\d+\.\d+\.\d+)/);
                        if(versionMatch){
                            version = versionMatch[2];
                        }
                    }
                    return{
                        isChromium: isChromium,
                        version: version
                    };
                };

                const chromiumInfo = getChromiumInfo();
                const message = chromiumInfo.isChromium
                ? `This browser is Chromium based. Chromium version: ${chromiumInfo.version}`
                : `The browser is not Chromium based: ${chromiumInfo.version}`;
                socketRef.current.send(JSON.stringify({type: "browserInfo", message: message}));
            };
            socketRef.current.onmessage = (event) => {
                console.log("Message received:", event.data);
                let messageData;
                try {
                    messageData = JSON.parse(event.data);
                } catch(e) {
                    console.log("Error parsing message data:", e);
                    return;
                }
                if (messageData.type === 'unload') {
                    console.log('Received unload message');
                    if (!isUnloading.current) {
                        isUnloading.current = true;
                        window.location.reload();
                    }
                }
            };

            socketRef.current.onerror = (error) => {
                console.error("WebSocket Error:", error);
            };

            socketRef.current.onclose = () => {
                if(!isUnloading.current) {
                    //setTimeout(connectWebSocket, 1000);
                }
            };
        };

        connectWebSocket();

        const handleUnload = () => {
            console.log('Sending unload message');
            isUnloading.current = true;
            if(socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({type: 'unload'}));
            }
        };

        window.addEventListener('unload', handleUnload);

        return () => {
            console.log('Closing WebSocket connection');
            if(socketRef.current){
                socketRef.current.close();
            }
            window.removeEventListener('unload', handleUnload);
        };
    }, [url]);
}

export default useWebSocket;







