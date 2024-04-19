import React from "react";
import VideoCarousel from "./VideoCarousel";
import TrendingSection from "./tendencias";
import TrendingSectionH from"./tendenciash";
import TrendingSectionN from"./tendenciasn";
import Liquidacion from"./liquidacion";

const Home=()=>{
    return(
        <div>
            <VideoCarousel />
            <TrendingSection />
            <TrendingSectionH />
            <TrendingSectionN />
            <Liquidacion />
        </div>
        
    );
};
export default Home;