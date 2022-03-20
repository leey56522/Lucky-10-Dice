import React from 'react';

function Button(props) {
    return(
        <div className="button-box">
            <button class="button-82-pushable" onClick={props.gameWon || props.gameLost ? props.reset : props.reRoll}>
                <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">
                    {props.gameWon || props.gameLost ? 'New Game' : 'Reroll'}
                </span>
            </button>
        </div>
    )
}

export default Button