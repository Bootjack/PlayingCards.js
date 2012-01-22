(function() {
  var PlayingCards;

  PlayingCards = {
    suits: {
      'Clubs': /^C(lubs)?/i,
      'Diamonds': /^D(iamonds)?/i,
      'Hearts': /^H(earts)?/i,
      'Spades': /^S(pades)?/i
    },
    values: {
      14: {
        name: 'Ace',
        match: /^A(ce)?$/i
      },
      13: {
        name: 'King',
        match: /^K(ing)?$/i
      },
      12: {
        name: 'Queen',
        match: /^Q(ueen)?$/i
      },
      11: {
        name: 'Jack',
        match: /^J(ack)?$/i
      },
      10: {
        name: 'Ten',
        match: /^T(en)?$/i
      },
      9: {
        name: 'Nine',
        match: /^Nine$/i
      },
      8: {
        name: 'Eight',
        match: /^Eight$/i
      },
      7: {
        name: 'Seven',
        match: /^Seven$/i
      },
      6: {
        name: 'Six',
        match: /^Six$/i
      },
      5: {
        name: 'Five',
        match: /^Five$/i
      },
      4: {
        name: 'Four',
        match: /^Four$/i
      },
      3: {
        name: 'Three',
        match: /^Three|Tre$/i
      },
      2: {
        name: 'Two',
        match: /^Two|Deuce$/i
      },
      1: {
        name: 'Ace',
        match: /^A(ce)?$/i
      }
    }
  };

  (typeof exports !== "undefined" && exports !== null ? exports : this).PlayingCards = PlayingCards;

}).call(this);
