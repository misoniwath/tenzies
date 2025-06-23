import React from "react";
import "./App.css";
import Dies from "./components/Dies";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from 'react-use'

function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    const randomdices = [];
    for (let i = 0; i < 10; i++) {
      const num = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      };
      randomdices.push(num);
    }
    return randomdices;
  }

  function rollDices() {
    if (!gameWon) {
      // If the game is not won, roll the dice
      return setDice((oldDice) => {
        return oldDice.map((dice) => {
          return dice.isHeld
            ? dice
            : { ...dice, value: Math.floor(Math.random() * 6) + 1, id: nanoid() };
        });
      });
    }
    // If the game is won, reset the game
    else {
      setDice(generateAllNewDice());
      // Reset the game state by generating new dice
      // and resetting the isHeld state
    }
  }

  function hold(id) {
    setDice((prevDice) => {
      return prevDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  }

  const diceElements = dice.map((diceObj) => (
    <Dies
      key={diceObj.id}
      value={diceObj.value}
      isHeld={diceObj.isHeld}
      hold={() => hold(diceObj.id)}
    />
  ));

  const { width, height } = useWindowSize();

  return (
    <main>
      <h1 className="tittle">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dies-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDices}>
        {gameWon ? "New Game" : "Roll"}
      </button>
      {gameWon && <Confetti width={width} height={height} />}
      <div aria-live="polite" className="sr-only">
        {gameWon ? "Congratulations! You've won the game! Press New Game to start again." : "Keep rolling!"}
      </div>
    </main>
  );
}

export default App;
