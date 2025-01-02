import { gameState } from '$lib/stores/gamestate.svelte';
import { type CardStack, StackTypes } from '$lib/game/types';
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
		card.isPlayable = true;
		deselect();
		updatePlayable();
		return;
	}

	// clicked card is playable and nothing is already selected so
	// select clicked card
	if (card.isPlayable && gameState.selectedCard == null) {
		card.isSelected = true;
		card.isPlayable = false;
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
		} else if (gameState.draw.cards.length > 0) {
			// if there are no royals make the top draw card playable
			gameState.draw.cards[gameState.draw.cards.length - 1].isPlayable = true;
		}
		makeAllGridStacksAndCardsUnplayable();
	} else {
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
