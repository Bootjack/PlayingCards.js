#	Playing Cards Demo
# 	written in CoffeeScript
#	(as a test)

#	Clunky dependency handling will only last until files are merged
if exports? 
	PC = require '../coffee/playingcards'
	PlayingCards = PC.PlayingCards
else
	PlayingCards = this.PlayingCards

# An individual playing card
class Card	
		#	Has a name, owner, and deck (owner should start as a drawPile attribute of Deck object)
		constructor: (name, @owner, @deck) ->
			words = name.split ' '
			if words.length < 2
				words = name.split ''
				words[0] = words[0...words.length - 1].join ''
			@number = @numeric words[0] 
			@suit = @suited words[words.length - 1]
			#throw new Error("Card.numeric() number out of range: #{words[0]} not between 2 and 14") if not @number
			#throw new Error("Card.suited() invalid suit: #{words[words.length - 1]}") if not @suit
			
		#	Give this card a new owner object
		setOwner: (@owner) -> true

		#	Normalize suit definition
		suited: (suit) ->
			for s, m of PlayingCards.suits
				return s if suit.match(m)
			false

		#	Convert card face value to number
		numeric: (num) ->
			if isNaN num
				for n, s of PlayingCards.values
					continue if (14 == Number(n) and not @deck.acesHigh) or (1 == Number(n) and @deck.acesHigh)
					return Number n if String(num).match s.match
				return false
			else return Number num if 14 >= num >= 1
			false

		#	Convert card number to face value text
		value: (num) -> PlayingCards.values[num].name

		#	Text representation of card
		identify: -> "#{@value @number} of #{@suit}"

		#	Self-determine whether a selector applies to the card
		match: (selector) ->
			return true if String(selector).match /^faces?$/ and @number > 10
			return true if @suited(String selector) == @suit
			return true if @numeric(selector) == @number
			false

(exports ? this).Card = Card