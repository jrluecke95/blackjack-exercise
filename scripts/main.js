

window.addEventListener('DOMContentLoaded', function() {
  const dealButton = document.querySelector('#deal-button');
  const dealerHand = document.querySelector('#dealer-hand');
  const playerHand = document.querySelector('#player-hand');

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  let deck = [];
  let card;
  for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j <= 13; j++) {
      card = {rank: j, suit: suits[i]};
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

  let dealerCards = [];
  let playerCards = [];

  function render(player, dealer) {
    dealerHand.innerHTML = '';
    playerHand.innerHTML = '';
    for (let i = 0; i < dealerCards.length; i++) {
      let card = dealerCards[i];
      if (card.rank === 11) {
        card = {rank: 'jack', suit: suits[i]};
      } else if (card.rank === 12) {
        card = {rank: 'queen', suit: suits[i]};
      } else if (card.rank  === 13) {
        card = {rank: 'king', suit: suits[i]};
      } else if (card.rank  === 1) {
        card = {rank: 'ace', suit: suits[i]};
      } else {
        card = {rank: card.rank, suit: suits[i]};
      }
      let newImage = `<img src="images/${card.rank}_of_${card.suit}.png">`;
      dealerHand.innerHTML += newImage;
    }
    for (let k = 0; k < playerCards.length; k++) {
      let card = playerCards[k];
      if (card.rank === 11) {
        card = {rank: 'jack', suit: suits[k]};
      } else if (card.rank === 12) {
        card = {rank: 'queen', suit: suits[k]};
      } else if (card.rank  === 13) {
        card = {rank: 'king', suit: suits[k]};
      } else if (card.rank  === 1) {
        card = {rank: 'ace', suit: suits[k]};
      } else {
        card = {rank: card.rank, suit: suits[k]};
      }
      let newImage = `<img src="images/${card.rank}_of_${card.suit}.png">`;
      playerHand.innerHTML += newImage;
    }
    calculatePoints(dealerCards)
    calculatePoints(playerCards)
  }

  function deal() {
    let i = 1;
    while (i < 5) {
      let card = deck.pop();
      if (i % 2 === 0) {
        dealerCards.push(card);
      } else {
        playerCards.push(card);
      }
      i++;
    }
    render(playerCards, dealerCards)

  }

  const hitButton = document.querySelector('#hit-button');
  function hit() {
    const card = deck.pop();
    playerCards.push(card);
    render()
  }
  hitButton.addEventListener('click', hit);

  function calculatePoints(hand) {
    console.log(hand)
    console.log('length', hand.length)
    // console.log(hand[0].rank)
    let playerPoints = 0;
    let value;
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].rank > 10) {
        value = 10;
      } else if (hand[i].rank === 1) {
        value = 11;
      } else {
        value = hand[i].rank;
      }
      playerPoints += value;
    }
    return playerPoints;
  }

  dealButton.addEventListener('click', deal);

  const stayButton = document.getElementById('stand-button');

  function stand() {
    let dealerPoints = calculatePoints(dealerCards);
    console.log(dealerPoints)
    while (dealerPoints < 17) {
      const card = deck.pop();
      dealerCards.push(card);
      render();
      dealerPoints = calculatePoints(dealerCards);
    }
  }

  stayButton.addEventListener('click', stand)
  

})