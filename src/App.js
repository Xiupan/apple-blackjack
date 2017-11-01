import React, { Component } from 'react';
import './App.css';

let deckArray = ["A","A","A","A","K","K","K","K","Q","Q","Q","Q","J","J","J","J","10","10","10","10","9","9","9","9","8","8","8","8","7","7","7","7","6","6","6","6","5","5","5","5","4","4","4","4","3","3","3","3","2","2","2","2"]

const shuffle = inputArray => {
  let j, temp, i
  for (i = inputArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      temp = inputArray[i];
      inputArray[i] = inputArray[j];
      inputArray[j] = temp;
  }
}

shuffle(deckArray)

class App extends Component {
  render() {
    return (
      <div className="App">
        {deckArray}
      </div>
    );
  }
}

export default App;
