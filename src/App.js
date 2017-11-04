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
      deckId: "",
      deck: [{}],
      player: {
        hand: [],
        handValue: 0,
        soft: false
      },
      dealer: {
        hand: [],
        handValue: 0,
        soft: false
      }
    }
  }

  componentDidMount(){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(data => {
        this.setState({
          deckId: data.deck_id
        })
        this.gameStart()
      })
  }

  gameStart = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=52`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          deck: data
        })
        this.hitMe()
        this.dealerHit()
        this.hitMe()
        this.dealerHit()
      })
  }

  hitMe = () => {
    this.state.player.hand.push(this.state.deck.cards.pop())
    this.calcPlayerHandValue()
  }

  dealerHit = () => {
    this.state.dealer.hand.push(this.state.deck.cards.pop())
    this.calcDealerHandValue()
  }

  calcPlayerHandValue = () => {
    let tempValue = 0
    let softBool = false
    const playerHand = this.state.player.hand
    for (let i = 0; i < playerHand.length; i++) {
      if (playerHand[i].value === "KING" || playerHand[i].value === "QUEEN" || playerHand[i].value === "JACK") {
        tempValue += 10
      } else if (playerHand[i].value === "ACE") {
        tempValue += 10
        softBool = true
      } else {
        tempValue += parseInt(playerHand[i].value, 0)
      }
    }
    this.setState({
      player: {
        hand: this.state.player.hand,
        handValue: tempValue,
        soft: softBool
      }
    })
    console.log("Player Hand Value: " + tempValue, softBool)
  }

  calcDealerHandValue = () => {
    let tempValue = 0
    let softBool = false
    const dealerHand = this.state.dealer.hand
    for (let i = 0; i < dealerHand.length; i++) {
      if (dealerHand[i].value === "KING" || dealerHand[i].value === "QUEEN" || dealerHand[i].value === "JACK") {
        tempValue += 10
      } else if (dealerHand[i].value === "ACE") {
        tempValue += 10
        softBool = true
      } else {
        tempValue += parseInt(dealerHand[i].value, 0)
      }
    }
    this.setState({
      dealer: {
        hand: this.state.dealer.hand,
        handValue: tempValue,
        soft: softBool
      }
    })
    console.log("Dealer Hand Value: " + tempValue, softBool)
  }

  render() {
    // displays player's card images
    const playerHandElements = this.state.player.hand.map(element => {
      return(
        <div key={element.code}>
          <img className="player-card-images" src={element.image} alt={element.code}/>
        </div>
      )
    })
    return (
      <div className="App">
        <div className="container">
          <button onClick={()=>{this.hitMe()}}>Hit</button>
          <div className="player-container">
            {playerHandElements}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
