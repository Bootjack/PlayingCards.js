#	Playing Cards Demo
# 	written in CoffeeScript
#	(as a test)

#	Clunky dependency handling will only last until files are merged
if exports? 
	PC = require '../coffee/playingcards'
	CD = require '../coffee/card'
	PlayingCards = PC.PlayingCards
	Card = CD.Card
else
	PlayingCards = this.PlayingCards
	Card = this.Card

class Deck
	#	New decks treat aces as value 14 by default. Pass false for aces low.
	constructor: (@acesHigh = true) ->
		@cards = []			# Immutable list of cards in this deck
		@drawPile = {}			# Dummy owner object for draw pile
		@discardPile = {} 		# Dummy owner object for discard pile
		#	Iterate through suits and values to build deck
		for s, m of PlayingCards.suits
			for i, n of PlayingCards.values
				continue if (14 == Number(i) and not @acesHigh) or (1 == Number(i) and @acesHigh)
				@cards.push new Card [i, s].join(' '), @drawPile, this
		
	#	Returns an array of cards with the 
	draw: (owner = @drawPile) ->
		hand = []
		for c in @cards
			hand.push c if c.owner is owner
		hand
	
	discard: (card) -> card.setOwner @discard
	
	#	Cards in the deck are part of the draw pile.
	#	Top and bottom are first and last of this list
	top: -> @draw()[0]
	bottom: -> @draw()[@size() - 1]
	size: (owner = @drawPile) -> @draw(owner).length
	
	shuffle: ->
		for i in [0..156]	#	Substitutions numbering three times the size of the deck
			from = Math.floor(Math.random() * @size())
			to = Math.floor(Math.random() * @size())
			@cards.splice(to, 0, @cards.splice(from, 1)[0])
		i

	#	Find takes a query phrase and matches recursively from each returned group (starting with the group containing the entire deck)
	#	The following all match the King of Hearts: 
	#	'King of Hearts', 'King of hearts', 'king Hearts'
	#	'K of H', 'k of h', 'KH', 'kH' (note: 'Kh' will not match)
	#	'13 of Hearts', '13Hearts', '13hearts', '13H', '13h'
	find: (query, cards = @cards) ->
		terms = query.replace(/\bof\b/, '').trim().match(/\d+|[a-zA-Z][a-z]*/g)
		cards = @find(terms[1...terms.length].join(' '), cards) if terms.length > 1
		group = []
		for c in cards
			group.push c if c.match(terms[0])
		group

	#	Deal a specific card using find() or deal a given number of cards to the player from top of deck
	deal: (player, card) ->
		if isNaN card
			for c in @find(card)
				c.setOwner(player)
		else
			for c in [0...card]
				@top().setOwner(player)
		return true

(exports ? this).Deck = Deck