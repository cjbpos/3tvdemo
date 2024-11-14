import React from "react";

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import FirstMonitor from "./firstMonitor";
import SecondMonitor from "./SecondMonitor";
import ThirdMonitor from "./thirdMonitor";

export default function AllRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FirstMonitor/>}></Route>
                <Route path="/second" element={<SecondMonitor/>}></Route>
                <Route path="/third" element={<ThirdMonitor/>}></Route>
            </Routes>
        </Router>

    )
}