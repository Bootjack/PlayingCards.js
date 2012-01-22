CardModule = require '../coffee/card'

describe 'Card' , ->
	card = new CardModule.Card 'ace of diamonds'
	it 'should know its suit', ->
		expect(card.suit).toEqual 'Diamonds'
	it 'should know its value', ->
		expect(card.number).toEqual(1)
	it 'should provide a text representation', ->
		expect(card.identify()).toEqual 'Ace of Diamonds'
	it 'should provide a text representation', ->
		expect(card.identify()).toEqual 'Ace of Diamonds'
	it 'should match based on suit', ->
		expect(card.match('diamonds')).toBe true
	it 'should match based on text equivalent', ->
		expect(card.match('ace')).toBe true
	it 'should match based on numerical string', ->
		expect(card.match('1')).toBe true
	it 'should bit match based on wrong suit', ->
		expect(card.match('hearts')).toBe false
	it 'should not match based on wrong text equivalent', ->
		expect(card.match('nine')).toBe false
	it 'should not match based on wrong numerical string', ->
		expect(card.match('9')).toBe false
	it 'should not match based on wrong number', ->
		expect(card.match(9)).toBe false