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
let playerHand = []
let dealerHand = []
let playerHandValue = {
  value: 0,
  soft: "Nope"
}
let dealerHandValue = {
  value: 0,
  soft: "Nope"
}

const deal = (hand, deck) => {
  hand.push(deck.pop())
}

const calcHandValue = (hand, handObj) => {
  for (let i = 0; i < hand.length; i++) {
    if (hand[i] === "K" || hand[i] === "Q" || hand[i] === "J") {
      handObj.value += 10
    } else if (hand[i] === "A") {
      handObj.value += 10
      handObj.soft = "Yup"
    } else {
      handObj.value += parseInt(hand[i])
    }
  }
}

deal(playerHand, deckArray)
deal(dealerHand, deckArray)
deal(playerHand, deckArray)
deal(dealerHand, deckArray)
calcHandValue(playerHand, playerHandValue)
calcHandValue(dealerHand, dealerHandValue)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div>
            Deck: {deckArray}
            <br/>
            Number of cards remaining: {deckArray.length}
          </div>
          <div>
            Player Hand: {playerHand}
            <br/>
            Player Hand Value: {playerHandValue.value}
            <br/>
            Soft? {playerHandValue.soft}
          </div>
          <div>
            Dealer Hand: {dealerHand}
            <br/>
            Dealer Hand Value: {dealerHandValue.value}
            <br/>
            Soft? {dealerHandValue.soft}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
