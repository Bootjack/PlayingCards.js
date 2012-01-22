(function() {
  var CD, Card, Deck, PC, PlayingCards;

  if (typeof exports !== "undefined" && exports !== null) {
    PC = require('../coffee/playingcards');
    CD = require('../coffee/card');
    PlayingCards = PC.PlayingCards;
    Card = CD.Card;
  } else {
    PlayingCards = this.PlayingCards;
    Card = this.Card;
  }

  Deck = (function() {

    function Deck(acesHigh) {
      var i, m, n, s, _ref, _ref2;
      this.acesHigh = acesHigh != null ? acesHigh : true;
      this.cards = [];
      this.drawPile = {};
      this.discardPile = {};
      _ref = PlayingCards.suits;
      for (s in _ref) {
        m = _ref[s];
        _ref2 = PlayingCards.values;
        for (i in _ref2) {
          n = _ref2[i];
          if ((14 === Number(i) && !this.acesHigh) || (1 === Number(i) && this.acesHigh)) {
            continue;
          }
          this.cards.push(new Card([i, s].join(' '), this.drawPile, this));
        }
      }
    }

    Deck.prototype.draw = function(owner) {
      var c, hand, _i, _len, _ref;
      if (owner == null) owner = this.drawPile;
      hand = [];
      _ref = this.cards;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        if (c.owner === owner) hand.push(c);
      }
      return hand;
    };

    Deck.prototype.discard = function(card) {
      return card.setOwner(this.discard);
    };

    Deck.prototype.top = function() {
      return this.draw()[0];
    };

    Deck.prototype.bottom = function() {
      return this.draw()[this.size() - 1];
    };

    Deck.prototype.size = function(owner) {
      if (owner == null) owner = this.drawPile;
      return this.draw(owner).length;
    };

    Deck.prototype.shuffle = function() {
      var from, i, to;
      for (i = 0; i <= 156; i++) {
        from = Math.floor(Math.random() * this.size());
        to = Math.floor(Math.random() * this.size());
        this.cards.splice(to, 0, this.cards.splice(from, 1)[0]);
      }
      return i;
    };

    Deck.prototype.find = function(query, cards) {
      var c, group, terms, _i, _len;
      if (cards == null) cards = this.cards;
      terms = query.replace(/\bof\b/, '').trim().match(/\d+|[a-zA-Z][a-z]*/g);
      if (terms.length > 1) {
        cards = this.find(terms.slice(1, terms.length).join(' '), cards);
      }
      group = [];
      for (_i = 0, _len = cards.length; _i < _len; _i++) {
        c = cards[_i];
        if (c.match(terms[0])) group.push(c);
      }
      return group;
    };

    Deck.prototype.deal = function(player, card) {
      var c, _i, _len, _ref;
      if (isNaN(card)) {
        _ref = this.find(card);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          c.setOwner(player);
        }
      } else {
        for (c = 0; 0 <= card ? c < card : c > card; 0 <= card ? c++ : c--) {
          this.top().setOwner(player);
        }
      }
      return true;
    };

    return Deck;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).Deck = Deck;

}).call(this);
