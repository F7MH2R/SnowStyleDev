import React from "react";
import VideoCarousel from "./VideoCarousel";
import TrendingSection from "./tendencias";
import TrendingSectionH from"./tendenciash";

const Home=()=>{
    return(
        <div>
            <VideoCarousel />
            <TrendingSection />
            <TrendingSectionH />
        </div>
        
    );
};
export default Home;