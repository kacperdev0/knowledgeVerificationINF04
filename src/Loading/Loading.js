import React from "react";
import ReactLoading from 'react-loading';

function Loading() {
    return (
        <div id="right-panel" style={{width: "100%", padding: "4%", color: "rgb(63, 63, 63)"}}>
            <div style={{marginLeft: "40%", width: "20%"}}>
                <ReactLoading type={"bars"} color={"#1976d2"} height={'100%'} width={'100%'} />
            </div>
        </div>
    );
}

export default Loading;