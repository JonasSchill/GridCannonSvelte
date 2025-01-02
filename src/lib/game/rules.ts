import { gameState } from '$lib/stores/gamestate.svelte';
import { type CardStack, Ranks, StackTypes, Suits } from '$lib/game/types';
import { isRoyal } from '$lib/game/utils';

export function clickCard(cardStack: CardStack) {
	if (cardStack.cards.length === 0) {
		if (gameState.selectedCard && cardStack.validDropLocation) {
			cardStack.cards.push(gameState.selectedCard);
			gameState.selectedSource!.cards.pop();
			deselect();
			updatePlayable();
		} else {
			return;
		}
	}

	const card = cardStack.cards[cardStack.cards.length - 1];
	if (!card.isPlayable && !card.isSelected) return;

	// clicked card is selected already so unselect it
	if (card.isSelected) {
		//card.isPlayable = true;
		deselect();
		updatePlayable();
		return;
	}

	// clicked card is playable and nothing is already selected so
	// select clicked card
	if (card.isPlayable && gameState.selectedCard == null) {
		card.isSelected = true;
		//card.isPlayable = false;
		card.isFaceUp = true;
		gameState.selectedCard = card;
		gameState.selectedSource = cardStack;
		updatePlayable();
		return;
	}

	// clicked card is playable but something is already selected
	// place down the selected card
	if (card.isPlayable && gameState.selectedCard && gameState.selectedSource) {
		gameState.selectedSource.cards.pop();
		cardStack.cards.push(gameState.selectedCard);
		deselect();
		updatePlayable();
		return;
	}
}

const deselect = () => {
	if (gameState.selectedCard) {
		gameState.selectedCard.isSelected = false;
		gameState.selectedCard = null;
		gameState.selectedSource = null;
	}
}

const updatePlayable = () => {
	if (gameState.selectedCard === null) {
		if (gameState.royals.cards.length > 0 && gameState.draw.cards.length > 0) {
			// if there are royals make the top draw card not playable
			gameState.draw.cards[gameState.draw.cards.length - 1].isPlayable = false;
			gameState.royals.cards[gameState.royals.cards.length - 1].isPlayable = true;
		} else if (gameState.draw.cards.length > 0) {
			// if there are no royals make the top draw card playable
			gameState.draw.cards[gameState.draw.cards.length - 1].isPlayable = true;
		}
		//ToDo: MAKE JOKERS PLAYABLE IF ANY
		//ToDo: MAKE ACES PLAYABLE IF ANY
		makeAllGridStacksAndCardsUnplayable();
	} else {
		gameState.selectedCard.isPlayable = false;
		if (isRoyal(gameState.selectedCard)) {
			// test code make all border slots playable
			for (let i = 1; i < gameState.stacks.length; i++) {
				const stack = gameState.stacks[i];
				if (stack.type === StackTypes.BORDER) {
					if (stack.cards.length == 0) {
						stack.validDropLocation = true;
					} else {
						stack.validDropLocation = false;
						stack.cards[stack.cards.length - 1].isPlayable = false;
					}
				}
			}
			makeJokerStackUnplayable();
			makeAceStackUnplayable();
			makeCenterStacksAndCardsUnplayable();
		} else if (gameState.selectedCard.rank == Ranks.JOKER) {
			gameState.jokers.validDropLocation = true;
			if (gameState.jokers.cards.length > 0) {
				 gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = true;
			}
			makeAceStackUnplayable();
			makeAllGridStacksAndCardsUnplayable();
		} else if (gameState.selectedCard.rank == Ranks.ACE) {
			gameState.aces.validDropLocation = true;
			if (gameState.aces.cards.length > 0) {
				 gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = true;
			}
			makeJokerStackUnplayable();
			makeAllGridStacksAndCardsUnplayable();
		} else {
			// test center grid code playable validations
			for (let i = 1; i < gameState.stacks.length; i++) {
				const stack = gameState.stacks[i];
				if (stack.type === StackTypes.CENTER) {
					if (stack.cards.length == 0) {
						stack.validDropLocation = true;
					} else if (gameState.selectedCard.value >= stack.cards[stack.cards.length - 1].value) {
						stack.validDropLocation = true;
						stack.cards[stack.cards.length - 1].isPlayable = true;
					} else {
						stack.validDropLocation = false;
						stack.cards[stack.cards.length - 1].isPlayable = false;
					}
				}
			}
			makeJokerStackUnplayable();
			makeAceStackUnplayable();
		}
	}
};

const makeAllGridStacksAndCardsUnplayable = () => {
	for (let i = 1; i < gameState.stacks.length; i++) {
		const stack = gameState.stacks[i];
		if (stack.type === StackTypes.BORDER ||
			stack.type === StackTypes.CENTER) {
			stack.validDropLocation = false;
			if (stack.cards.length !== 0) {
				stack.cards[stack.cards.length - 1].isPlayable = false;
			}
		}
	}
}

const makeCenterStacksAndCardsUnplayable = () => {
	for (let i = 1; i < gameState.stacks.length; i++) {
		const stack = gameState.stacks[i];
		if (stack.type === StackTypes.CENTER) {
			stack.validDropLocation = false;
			if (stack.cards.length !== 0) {
				stack.cards[stack.cards.length - 1].isPlayable = false;
			}
		}
	}
}

const makeJokerStackUnplayable = () => {
	gameState.jokers.validDropLocation = false;
	if (gameState.jokers.cards.length > 0) {
		 gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = false;
	}
}

const makeAceStackUnplayable = () => {
	gameState.aces.validDropLocation = false;
	if (gameState.aces.cards.length > 0) {
		 gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = false;
	}
}
