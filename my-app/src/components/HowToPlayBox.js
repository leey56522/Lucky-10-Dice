import React from 'react';

function HowToPlayBox(props) {

    return(
        <div className="explanation-window">
            <h1>Get the same number in all 10 dice</h1>
            <div className="explanation">
                <p>1. Click 'Reroll' button to get different numbers</p>
                <p>2. Hold the number by clicking each dice before rerolling</p>
                <p>3. Rerolling decreases your score by 500 points</p>
            </div>
            <h3>Feeling lucky?</h3>
            <h2>Try out your luck now!</h2>
        </div>
    )
}

export default HowToPlayBox;