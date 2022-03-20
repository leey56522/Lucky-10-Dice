import React from 'react';
import HowToPlayBox from './HowToPlayBox';

function HowToPlayBtn() {

    const [displayWindow, setDisplayWindow] = React.useState(false);

    const toggleDisplay = function() {
        setDisplayWindow(!displayWindow);
    }

    
    return(
        <div className="explanation-button-box">
            {displayWindow && <HowToPlayBox />}
            <button class="explanation-button" onClick={toggleDisplay}>How to Play</button>
        </div>
    )
}

export default HowToPlayBtn;