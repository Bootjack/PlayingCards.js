(function() {
  var Card, PC, PlayingCards;

  if (typeof exports !== "undefined" && exports !== null) {
    PC = require('../coffee/playingcards');
    PlayingCards = PC.PlayingCards;
  } else {
    PlayingCards = this.PlayingCards;
  }

  Card = (function() {

    function Card(name, owner, deck) {
      var words;
      this.owner = owner;
      this.deck = deck;
      words = name.split(' ');
      if (words.length < 2) {
        words = name.split('');
        words[0] = words.slice(0, (words.length - 1)).join('');
      }
      this.number = this.numeric(words[0]);
      this.suit = this.suited(words[words.length - 1]);
    }

    Card.prototype.setOwner = function(owner) {
      this.owner = owner;
      return true;
    };

    Card.prototype.suited = function(suit) {
      var m, s, _ref;
      _ref = PlayingCards.suits;
      for (s in _ref) {
        m = _ref[s];
        if (suit.match(m)) return s;
      }
      return false;
    };

    Card.prototype.numeric = function(num) {
      var n, s, _ref;
      if (isNaN(num)) {
        _ref = PlayingCards.values;
        for (n in _ref) {
          s = _ref[n];
          if ((14 === Number(n) && !this.deck.acesHigh) || (1 === Number(n) && this.deck.acesHigh)) {
            continue;
          }
          if (String(num).match(s.match)) return Number(n);
        }
        return false;
      } else {
        if ((14 >= num && num >= 1)) return Number(num);
      }
      return false;
    };

    Card.prototype.value = function(num) {
      return PlayingCards.values[num].name;
    };

    Card.prototype.identify = function() {
      return "" + (this.value(this.number)) + " of " + this.suit;
    };

    Card.prototype.match = function(selector) {
      if (String(selector).match(/^faces?$/ && this.number > 10)) return true;
      if (this.suited(String(selector)) === this.suit) return true;
      if (this.numeric(selector) === this.number) return true;
      return false;
    };

    return Card;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).Card = Card;

}).call(this);
