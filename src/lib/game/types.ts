export type Card = {
	id: string;
	suit: Suits
	value: number;
	rank: Ranks;
	isDragging: boolean;
	isFaceUp: boolean;
	isPlayable: boolean;
}

export type CardStack = {
	id: string;
	cards: Card[];
	type: StackTypes;
}

export type GameState = {
	stacks: CardStack[];
	draw: CardStack;
	jokers: CardStack;
	aces: CardStack;
	royals: CardStack;
	draggingCard: Card | null;
}

export enum StackTypes {
	DRAW = 'draw',
	ROYALS = 'royals',
	CENTER = 'center',
	BORDER = 'border',
	ACES = 'aces',
	JOKERS = 'jokers',
	NULL = 'null'
}

export enum Suits {
	HEART = '♥',
	SPADE = '♠',
	CLUB = '♣',
	DIAMOND = '♦',
	JOKER = 'joker',
}

export enum Ranks {
	ACE = 'ace',
	TWO = 'two',
	THREE = 'three',
	FOUR = 'four',
	FIVE = 'five',
	SIX = 'six',
	SEVEN = 'seven',
	EIGHT = 'eight',
	NINE = 'nine',
	TEN = 'ten',
	JACK = 'jack',
	QUEEN = 'queen',
	KING = 'king',
	JOKER = 'joker',
}