import { type Card, Ranks, Suits } from '$lib/game/types';
import { gameState } from '$lib/stores/gamestate.svelte';

export function setup() {
	gameState.draw.cards = shuffleDeck(generateDeck());
	dealCards();
}

const dealCards = () => {

	let centerFilled = 0;
	while (gameState.draw.cards.length > 0) {
		const card = gameState.draw.cards[gameState.draw.cards.length - 1];
		if (card.rank === Ranks.JOKER) {
			gameState.jokers.cards.push(gameState.draw.cards.pop()!);
		} else if (card.rank === Ranks.ACE) {
			gameState.aces.cards.push(gameState.draw.cards.pop()!);
		} else if (card.rank === Ranks.JACK || card.rank === Ranks.QUEEN || card.rank === Ranks.KING) {
			gameState.royals.cards.push(gameState.draw.cards.pop()!);
		} else if (centerFilled < 9) {
			const stack = gameState.stacks.find((s) => s.id == `C${centerFilled}`);
			if (stack) {
				stack.cards.push(gameState.draw.cards.pop()!);
			}
			centerFilled++;
		} else {
			return;
		}
	}
};

const generateDeck = () => {
	const deck: Card[] = [];
	const ranks = Object.values(Ranks);
	const suits = Object.values(Suits);

	suits.forEach((suit) => {
		if (suit !== Suits.JOKER) {
			ranks.forEach((rank, index) => {
				if (rank !== Ranks.JOKER) {
					deck.push({
						id: `${suit}-${rank}`,
						suit,
						value: index + 1,
						rank,
						isDragging: false,
						isFaceUp: false,
						isPlayable: false
					});
				}
			});
		}
	});
	deck.push({
		id: `${Suits.JOKER}-${Ranks.JOKER}-1`,
		suit: Suits.JOKER,
		value: 0,
		rank: Ranks.JOKER,
		isDragging: false,
		isFaceUp: false,
		isPlayable: false
	});
	deck.push({
		id: `${Suits.JOKER}-${Ranks.JOKER}-2`,
		suit: Suits.JOKER,
		value: 0,
		rank: Ranks.JOKER,
		isDragging: false,
		isFaceUp: false,
		isPlayable: false
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
