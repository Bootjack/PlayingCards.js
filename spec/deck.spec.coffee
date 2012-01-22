DeckModule = require '../coffee/deck'

describe 'Deck',  ->
	deck = new DeckModule.Deck()
	player = new Object
	it 'should contain 52 cards', ->
		expect(deck.size()).toEqual 52
	it 'should start in strict order', ->
		expect(deck.top().identify()).toEqual 'Two of Clubs'
		expect(deck.bottom().identify()).toEqual 'Ace of Spades'
	it 'should shuffle itself', ->
		deck.shuffle()
		expect(deck.top().identify()).not.toEqual 'Two of Clubs'
		expect(deck.top().identify()).not.toEqual 'Ace of Spades'
	it 'should deal a specific card', ->
		deck.deal player, 'ace spades'
		expect(deck.draw(player)[0].identify()).toEqual 'Ace of Spades'
	it 'should deal to a player', ->
		deck.deal player, 4
		expect(deck.draw(player).length).toBe 5