# Blackjack with ReactJS
## by Alan Hong

Requirements
• Dealer must hit on soft 17
• Single Deck. The deck is shuffled every 6 rounds.
• Player is not allowed to split cards.
• Keep track of win percentage for the player.
• Provide a readme file explaining how to compile/build/run the source and other info that might be interesting.
You don't have to implement any AI other than the one mentioned above - it's just one player vs. Dealer.
If any third party code is used, please give credit and cite source.

### MVP Plan
- Single array of 52 elements.
- Function to shuffle deck array every 6 rounds.
- Array for deck consists of strings? ["Q", "1", "A"]
- .pop() to take one element from the deck array and then push into player hand and dealer hand.
- Player hand and Dealer hand will be array of strings.
- Need to parse hand of strings into number value.
- Functions for Hit and Stand.
- Dealer hits on "soft" 17. "Soft" means if one of the cards is an ace. ["A", "7"] vs. ["10", "7"]
- Dealer Stands on Hard 17 and Hits on 16.
- Variable for win and/or loss.
- Buttons for user to click Hit or Stand.
- Be sure to change/edit this README before production.

### Future Features
- Change Deck array to an array of objects [{rank: "queen", suit: "clubs", value: 10}, {rank: "seven", suit: "diamonds", value: 7}]
  - This would allow to easily display images of the actual cards instead of just text.
- Push app to Heroku for hosting and live play.
