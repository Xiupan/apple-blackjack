import React, { Component } from 'react';
import './App.css';

// const shuffle = inputArray => {
//   let j, temp, i
//   for (i = inputArray.length - 1; i > 0; i--) {
//       j = Math.floor(Math.random() * (i + 1))
//       temp = inputArray[i];
//       inputArray[i] = inputArray[j];
//       inputArray[j] = temp;
//   }
// }
//
// shuffle(deckArray)
// let playerHand = []
// let dealerHand = []
//
// const deal = (hand, deck) => {
//   hand.push(deck.pop())
//   console.log(`Added card to ${hand}.`)
// }
//
// const calcHandValue = (hand, handObj) => {
//   for (let i = 0; i < hand.length; i++) {
//     if (hand[i] === "K" || hand[i] === "Q" || hand[i] === "J") {
//       handObj.value += 10
//     } else if (hand[i] === "A") {
//       handObj.value += 10
//       handObj.soft = "Yup"
//     } else {
//       handObj.value += parseInt(hand[i],0)
//     }
//   }
// }

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      deckId: ""
    }
  }

  componentDidMount(){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(data => {
        this.setState({
          deckId: data.deck_id
        })
      })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div className="container">

        </div>
      </div>
    );
  }
}

export default App;
