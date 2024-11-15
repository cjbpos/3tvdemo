import React from "react";

const triggerRefresh = () => {
    const tabId = Date.now().toString();
    localStorage.setItem('currentTabId', tabId);
    localStorage.setItem('refreshPage', tabId);
};

function RefreshOnLoad() {
    React.useEffect(() => {
        triggerRefresh();
    }, []);
    return null;
};

export default RefreshOnLoad;