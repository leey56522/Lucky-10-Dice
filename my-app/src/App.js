import React from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

import Die from './components/Die';
import Button from './components/Button';
import Score from './components/Score';
import HowToPlayBtn from './components/HowToPlayBtn'

function App() {

  // creates die properties
  const diePropsGenerator = function() {
    let arr = [];
    for(let i = 0; i < 10; i++) {
      let randomNum = Math.floor(Math.random() * 6 + 1)
      arr.push({value: randomNum, onHold: false, id: nanoid()})
    }
    return arr;
  }

  // Toggles dice to be held or unheld when pressed
  const toggleHold = function(id) {
    setDieArr(oldDie => {
      return oldDie.map(die => die.id === id ? {...die, onHold: !die.onHold} : die)
    })
  }

  const [dieArr, setDieArr] = React.useState(diePropsGenerator());
  const [currentScore, setCurrentScore] = React.useState(10000);
  const [topScore, setTopScore] = React.useState(() => {
    const storedScore = JSON.parse(localStorage.getItem('highScore'));
    return storedScore || 0;
  });
  const [finalScore, setFinalScore] = React.useState(0);
  const [rollCounter, setRollCounter] = React.useState(0);
  const [gameLost, setGameLost] = React.useState(false);
  const [gameWon, setGameWon] = React.useState(false);


  // Runs everytime reroll button is pressed
  const reRoll = function() {
    // Gives dice a new value if it's not held
    setDieArr(oldDie => {
      return oldDie.map(die => !die.onHold ? {...die, value: Math.floor(Math.random() * 6 + 1)} : die) 
    })

    // increases reroll counter
    setRollCounter(rollCounter + 1);

    // Decreases score
    setCurrentScore(() => {
      return currentScore - 500
    })
  }

  // Creates 10 dies elements with assigned properties
  const dieElements = dieArr.map(die => <Die key={die.id} value={die.value} onHold={die.onHold} toggleHold={() => toggleHold(die.id)} /> )

  // Resets the game when new game button is pressed
  const reset = function() {
    setGameWon(false);
    setGameLost(false);
    setCurrentScore(10000);
    setDieArr(diePropsGenerator());
    setTopScore(() => {
      const storedScore = JSON.parse(localStorage.getItem('highScore'));
      return storedScore || 0;
    })
  }

  // Checks the win conditions every time dice are rolled - all dice have same number and held
  React.useEffect(() => {
    let allSameNum = dieArr.every(die => die.value === dieArr[0].value);
    let allHeld = dieArr.every(die => die.onHold === true);

    if(allSameNum && allHeld) {
      setGameWon(true)
      setFinalScore(currentScore)
    } else {
      setGameWon(false)
    }
  }, [dieArr, currentScore])

  //  Game is lost when the score reaches 0 or lower
  React.useEffect(() => {
    if (currentScore <= 0) {
      setGameLost(true);
    }
  }, [currentScore]) 

  React.useEffect(() => {

    if(finalScore > topScore) {
      localStorage.setItem('highScore', JSON.stringify(finalScore));
    }
  }, [gameWon, finalScore, topScore])

  console.log(topScore);

  return (
    <main>
      <Score currentScore={currentScore} topScore={topScore}/>

      <div className="game-board">
        {gameWon && <Confetti numberOfPieces={700} recycle={false} tweenDuration={9000}/>}
        <h1 className="game-end">{gameWon ? 'Congratulation' : gameLost ? 'Game Over!' : ''}</h1>
        {gameWon || gameLost ? '' : <div className="dice-box">{dieElements}</div>}
        <Button reRoll={reRoll} reset={reset} gameWon={gameWon} gameLost={gameLost}/>
      </div>

      <HowToPlayBtn/>

    </main>
  );
}

export default App;
