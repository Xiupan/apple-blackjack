import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      deckId: "",
      deck: [{}],
      player: {
        hand: [],
        handValue: 0,
        soft: false,
        busted: false
      },
      dealer: {
        hand: [],
        handValue: 0,
        soft: false,
        busted: false
      },
      gameEndMessage: "",
      messageStyle: ""
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

  // Had to repeat calc value code because it was causing unexpected behavior running multiple functions together all setting state separately.
  newRound = () => {
    let playerNewHand = []
    let dealerNewHand = []
    playerNewHand.push(this.state.deck.cards.pop())
    playerNewHand.push(this.state.deck.cards.pop())
    dealerNewHand.push(this.state.deck.cards.pop())
    dealerNewHand.push(this.state.deck.cards.pop())
    let tempValue = 0
    let softBool = false
    let playerTempSoftValue = 0
    const playerHand = playerNewHand
    for (let i = 0; i < playerHand.length; i++) {
      if (playerHand[i].value === "KING" || playerHand[i].value === "QUEEN" || playerHand[i].value === "JACK") {
        tempValue += 10
        playerTempSoftValue += 10
      } else if (playerHand[i].value === "ACE") {
        tempValue += 10
        playerTempSoftValue += 1
        softBool = true
      } else {
        tempValue += parseInt(playerHand[i].value, 0)
        playerTempSoftValue += parseInt(playerHand[i].value, 0)
      }
    }
    let dealerTempValue = 0
    let dealerSoftBool = false
    let dealerTempSoftValue = 0
    const dealerHand = dealerNewHand
    for (let i = 0; i < dealerHand.length; i++) {
      if (dealerHand[i].value === "KING" || dealerHand[i].value === "QUEEN" || dealerHand[i].value === "JACK") {
        dealerTempValue += 10
        dealerTempSoftValue += 10
      } else if (dealerHand[i].value === "ACE") {
        dealerTempValue += 10
        dealerTempSoftValue += 1
        dealerSoftBool = true
      } else {
        dealerTempValue += parseInt(dealerHand[i].value, 0)
        dealerTempSoftValue += parseInt(dealerHand[i].value, 0)
      }
    }
    this.setState({
      player: {
        hand: playerNewHand,
        handValue: tempValue,
        soft: softBool,
        softValue: playerTempSoftValue,
        busted: false
      },
      dealer: {
        hand: dealerNewHand,
        handValue: dealerTempValue,
        soft: dealerSoftBool,
        softValue: dealerTempSoftValue,
        busted: false
      },
      gameEndMessage: "",
      messageStyle: ""
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

  checkBusted = (inputValue, softInputValue) => {
    if (inputValue > 21 && softInputValue > 21) {
      return true
    } else {
      return false
    }
  }

  calcPlayerHandValue = () => {
    let tempValue = 0
    let softValue = 0
    let softBool = false
    const playerHand = this.state.player.hand
    for (let i = 0; i < playerHand.length; i++) {
      if (playerHand[i].value === "KING" || playerHand[i].value === "QUEEN" || playerHand[i].value === "JACK") {
        tempValue += 10
        softValue += 10
      } else if (playerHand[i].value === "ACE") {
        tempValue += 10
        softValue += 1
        softBool = true
      } else {
        tempValue += parseInt(playerHand[i].value, 0)
        softValue += parseInt(playerHand[i].value, 0)
      }
    }
    if (this.checkBusted(tempValue, softValue) === true) {
      this.setState({
        player: {
          hand: this.state.player.hand,
          handValue: tempValue,
          soft: softBool,
          softValue: softValue,
          busted: true
        },
        gameEndMessage: "Player Busted!",
        messageStyle: "alert alert-danger"
      })
    } else {
      this.setState({
        player: {
          hand: this.state.player.hand,
          handValue: tempValue,
          soft: softBool,
          softValue: softValue,
          busted: this.state.player.busted
        },
        gameEndMessage: "",
        messageStyle: ""
      })
    }
  }

  calcDealerHandValue = () => {
    let tempValue = 0
    let softBool = false
    let softValue = 0
    const dealerHand = this.state.dealer.hand
    for (let i = 0; i < dealerHand.length; i++) {
      if (dealerHand[i].value === "KING" || dealerHand[i].value === "QUEEN" || dealerHand[i].value === "JACK") {
        tempValue += 10
        softValue += 10
      } else if (dealerHand[i].value === "ACE") {
        tempValue += 10
        softValue += 1
        softBool = true
      } else {
        tempValue += parseInt(dealerHand[i].value, 0)
        softValue += parseInt(dealerHand[i].value, 0)
      }
    }
    if (this.checkBusted(tempValue, softValue) === true) {
      this.setState({
        dealer: {
          hand: this.state.dealer.hand,
          handValue: tempValue,
          soft: softBool,
          softValue: softValue,
          busted: true
        },
        gameEndMessage: "Dealer busted! Player wins!",
        messageStyle: "alert alert-success"
      })
    } else {
      this.setState({
        dealer: {
          hand: this.state.dealer.hand,
          handValue: tempValue,
          soft: softBool,
          softValue: softValue,
          busted: this.state.dealer.busted
        },
        gameEndMessage: "",
        messageStyle: ""
      })
    }
  }

  determineWinner = () => {
    let message = ""
    let messageStyle = ""
    const playerHandValue = this.state.player.handValue
    const dealerHandValue = this.state.dealer.handValue
    if (playerHandValue > dealerHandValue) {
      console.log("Player Wins!")
      message = "Player wins this round!"
      messageStyle = "alert alert-success"
    } else if (playerHandValue < dealerHandValue) {
      console.log("Dealer wins, player loses!")
      message = "Dealer wins, player loses this round!"
      messageStyle = "alert alert-danger"
    } else if (playerHandValue === dealerHandValue) {
      console.log("Game is a push. No one wins.")
      message = "Game is a push. No one wins this round."
      messageStyle = "alert alert-info"
    }
    this.setState({
      gameEndMessage: message,
      messageStyle: messageStyle
    })
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
          {this.state.gameEndMessage === "" &&
            <div>
              <button onClick={()=>{this.hitMe()}}>Hit</button>
              <button onClick={()=>{this.determineWinner()}}>Stand</button>
            </div>
          }
          {this.state.gameEndMessage !== "" &&
            <div>
              <div className={this.state.messageStyle}>
                {this.state.gameEndMessage}
              </div>
              <button onClick={()=>{this.newRound()}}>New Round</button>
            </div>
          }
          <div className="player-container">
            {playerHandElements}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
