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
      handObj.value += parseInt(hand[i],0)
    }
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      deck: deckArray,
      playerHand: playerHand,
      dealerHand: dealerHand,
      playerHandValue: {
        value: 0,
        soft: "Nope"
      },
      dealerHandValue: {
        value: 0,
        soft: "Nope"
      }
    }
  }

  handleClick = e => {
    e.preventDefault()
    deal(this.state.playerHand, this.state.deck)
  }

  render() {

    deal(this.state.playerHand, this.state.deck)
    deal(this.state.dealerHand, this.state.deck)
    deal(this.state.playerHand, this.state.deck)
    deal(this.state.dealerHand, this.state.deck)
    calcHandValue(this.state.playerHand, this.state.playerHandValue)
    calcHandValue(this.state.dealerHand, this.state.dealerHandValue)
    const playerHandElements = this.state.playerHand.map(element => {
      return (
        <div key={element}>{element}</div>
      )
    })
    const dealerHandElements = this.state.dealerHand.map(element => {
      return (
        <div key={element}>{element}</div>
      )
    })
    return (
      <div className="App">
        <div className="container">
          <div className="card">
            Deck: {this.state.deck}
            <br/>
            Number of cards remaining: {this.state.deck.length}
          </div>
          <div className="card">
            Dealer Hand: {dealerHandElements}
            <br/>
            Dealer Hand Value: {this.state.dealerHandValue.value}
            <br/>
            Soft? {this.state.dealerHandValue.soft}
          </div>
          <div className="card">
            Player Hand: {playerHandElements}
            <br/>
            Player Hand Value: {this.state.playerHandValue.value}
            <br/>
            Soft? {this.state.playerHandValue.soft}
            <br/>
            <button onClick={this.handleClick}>Hit</button>
            <button>Stand</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
