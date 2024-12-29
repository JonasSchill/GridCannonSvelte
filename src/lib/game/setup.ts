import { type Card, Ranks, StackTypes, Suits } from '$lib/game/types';
import { gameState } from '$lib/stores/gamestate.svelte';

export function setup() {
	let deck = generateDeck();
	deck = shuffleDeck(deck);
	dealCards(deck);
}

const dealCards = (deck: Card[]) => {
	for (let i = 0; i < gameState.stacks.length; i++) {
		if (gameState.stacks[i].type === StackTypes.NULL) {
			continue;
		}
		gameState.stacks[i].cards.push(deck.pop()!);
		gameState.stacks[i].cards.push(deck.pop()!);
	}
};

const generateDeck = () => {
	const deck: Card[] = [];
	const ranks = Object.values(Ranks);
	const suits = Object.values(Suits);

	suits.forEach((suit) => {
		ranks.forEach((rank, index) => {
			deck.push({
				id: `${suit}-${rank}`,
				suit,
				value: index + 1,
				rank,
				isDragging: false,
				isFaceUp: false,
				isPlayable: false
			});
		});
	});

	return deck;
};

const shuffleDeck = (deck: Card[]): Card[] => {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
};