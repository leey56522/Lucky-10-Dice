import React from 'react';

function Die(props) {
    const backgroundStyles = {
        backgroundColor: props.onHold ? '#8d99ae' : '#edf2f4',
    }

    // const hoverStyles = {
    //     backgroundColor: '#e6e7eb'
    // }

    return(
        <div className="die" style={backgroundStyles} onClick={props.toggleHold}>{props.value}</div>
    )
}

export default Die