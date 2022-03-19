import React from 'react';
import Die from './components/Die';
import Button from './components/Button';
import Score from './components/Score';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

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

  const toggleHold = function(id) {
    // Toggles dice to be held or unheld when pressed
    setDieArr(oldDie => {
      return oldDie.map(die => die.id === id ? {...die, onHold: !die.onHold} : die)
    })
  }

  const [dieArr, setDieArr] = React.useState(diePropsGenerator());
  const [gameWon, setGameWon] = React.useState(false);

  const reRoll = function() {
    // Gives dice a new value if it's not held
    setDieArr(oldDie => {
      return oldDie.map(die => !die.onHold ? {...die, value: Math.floor(Math.random() * 6 + 1)} : die) 
    })
  }

  const reset = function() {
    setGameWon(false);
    setDieArr(diePropsGenerator());
  }
 
  React.useEffect(() => {
      // Checks the win conditions - all dies have same number and held
    let allSameNum = dieArr.every(die => die.value === dieArr[0].value);
    let allHeld = dieArr.every(die => die.onHold === true);

    allSameNum && allHeld ? setGameWon(true) : setGameWon(false)
  }, [dieArr])

  const dieElements = dieArr.map(die => <Die 
                                          key={die.id} 
                                          value={die.value} 
                                          onHold={die.onHold}
                                          toggleHold={() => toggleHold(die.id)}
                                        /> )

  return (
    <main>
      {gameWon && <Confetti numberOfPieces={700} recycle={false} tweenDuration={9000}/>}
      <Score />
      <div className="dice-box">
        {dieElements}
      </div>
        <Button reRoll={reRoll} reset={reset} gameState={gameWon}/>
    </main>
  );
}

export default App;
