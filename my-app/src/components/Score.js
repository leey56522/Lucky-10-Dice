function Score(props) {

    //The minimum shown score will be 0
    const scoreMinZero = props.currentScore <= 0 ? 0 : props.currentScore

    return(
        <div className="score-board">
            <h2 id="currentScore" >Score: <span className="score">{scoreMinZero}</span></h2>
            <h4 id="topScore">Top Score: {props.topScore}</h4>
        </div>
    )
}

export default Score;