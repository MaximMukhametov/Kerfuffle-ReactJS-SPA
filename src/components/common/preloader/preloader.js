import loadCircle from "../../../media/VdOY.gif";
import React from "react";


let Preloader = (props) => {
    return <img src={loadCircle} style={{
        display: 'block',
        width: '200px',
        margin: '0 auto'
    }} alt="Loading"/>
};

export default Preloader