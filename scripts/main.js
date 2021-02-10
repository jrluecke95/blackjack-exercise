

window.addEventListener('DOMContentLoaded', function() {
  const dealButton = document.querySelector('#deal-button');
  const dealerHand = document.querySelector('#dealer-hand');
  const playerHand = document.querySelector('#player-hand');

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j <= 13; j++) {
      if (j === 11) {
        let card;
        card = {rank: 'jack', suit: suits[i]};
      } else if (j === 12) {
        card = {rank: 'queen', suit: suits[i]};
      } else if (j === 13) {
        card = {rank: 'king', suit: suits[i]};
      } else if (j === 1) {
        card = {rank: 'ace', suit: suits[i]};
      } else {
        card = {rank: j, suit: suits[i]};
      }
      deck.push(card);
    }
  }

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  shuffle(deck);

  function deal() {
    let i = 1;
    let dealerCards = [];
    let playerCards = [];
    while (i < 5) {
      let card = deck.shift();
      if (i % 2 === 0) {
        let newImage = `<img src="images/${card.rank}_of_${card.suit}.png">`;
        dealerCards.push(newImage);
      } else {
        let newImage = `<img src="images/${card.rank}_of_${card.suit}.png">`;
        playerCards.push(newImage);
      }
      i++;
    }
    for (let j = 0; j < dealerCards.length; j++) {
      dealerHand.innerHTML += dealerCards[j]
    }
    for (let k = 0; k < playerCards.length; k++) {
      playerHand.innerHTML += playerCards[k]
    }
  }

  const hitButton = document.querySelector('#hit-button');
  function hit() {
    let hitCard = `<img src="images/2_of_spades.png">`;
    playerHand.innerHTML += hitCard;
  }
  hitButton.addEventListener('click', hit);

  function calculatePoints(hand) {

  }


  dealButton.addEventListener('click', deal);

})