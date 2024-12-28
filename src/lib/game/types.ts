type Card = {
	id: string;
	suit: Suits
	value: number;
	rank: Ranks;
	isVisible: boolean;
	isHovered: boolean;
	isDragging: boolean;
	isFaceUp: boolean;
	isPlayable: boolean;
}

type CardStack = {
	id: string;
	cards: Card[];
	type: StackTypes;
}

type GameState = {
	stacks: CardStack[];
	draggingCard: Card | null;
}

export enum StackTypes {
	DRAW = 'draw',
	ROYAL = 'royal',
	CENTER = 'CENTER',
	BORDER = 'border',
	ACES = 'aces',
	JOKERS = 'jokers'
}

export enum Suits {
	HEART = '♥',
	SPADE = '♠',
	CLUB = '♣',
	DIAMOND = '♦',
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