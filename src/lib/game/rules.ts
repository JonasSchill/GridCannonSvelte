import { gameState } from '$lib/stores/gamestate.svelte';
import { type CardStack, Ranks, StackTypes, Suits } from '$lib/game/types';
import { isRed, isRoyal } from '$lib/game/utils';

export function clickCard(cardStack: CardStack) {
	if (cardStack.cards.length === 0) {
		if (gameState.selectedCard && cardStack.validDropLocation) {
			playCard(cardStack);
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
		playCard(cardStack);
		return;
	}
}

const playCard = (stack: CardStack) => {
	if (gameState.selectedSource) {
		const card = gameState.selectedSource.cards.pop();
		if (card) {
			stack.cards.push(card);
			deselect();
			if (stack.type === StackTypes.CENTER) {
				evaluateGridMove(stack);
			}
			updatePlayable();
		}
	}
}

const evaluateGridMove = (stack: CardStack) => {
	switch(stack.id) {
		case 'C0': {
				attack('C1', 'C2', 'B4');
				attack('C3', 'C6', 'B9');
			break;
		}
		case 'C1': {
				attack('C4', 'C7', 'B10');
			break;
		}
		case 'C2': {
				attack('C5', 'C8', 'B11');
				attack('C1', 'C0', 'B3');
			break;
		}
		case 'C3': {
				attack('C4', 'C5', 'B16');
			break;
		}
		case 'C5': {
				attack('C4', 'C3', 'B5');
			break;
		}
		case 'C6': {
				attack('C3', 'C0', 'B0');
				attack('C7', 'C8', 'B8');
			break;
		}
		case 'C7': {
				attack('C4', 'C1', 'B1');
			break;
		}
		case 'C8': {
				attack('C5', 'C2', 'B2');
				attack('C7', 'C6', 'B7');
			break;
		}
	}
}

const attack = (aStack1ID: String, aStack2ID: String, targetStackId: String) => {
	const aStack1 = gameState.stacks.find((s) => s.id == aStack1ID);
	const aStack2 = gameState.stacks.find((s) => s.id == aStack2ID);
	const targetStack = gameState.stacks.find((s) => s.id == targetStackId);
	if (aStack1 && aStack2 && targetStack) {
		if (targetStack.cards.length === 0) {
			return;
		} else {
			const targetCard = targetStack.cards[targetStack.cards.length - 1];
			let attackValue = 0;
			if (targetCard.rank === Ranks.JACK) {
				if (aStack1.cards.length > 0) {
					const aCard1 = aStack1.cards[aStack1.cards.length - 1];
					attackValue += aCard1.value;
				}
				if (aStack2.cards.length > 0) {
					const aCard2 = aStack2.cards[aStack2.cards.length - 1];
					attackValue += aCard2.value;
				}
			} else if (targetCard.rank === Ranks.QUEEN) {
				if (aStack1.cards.length > 0) {
					const aCard1 = aStack1.cards[aStack1.cards.length - 1];
					if (isRed(aCard1) === isRed(targetCard)) {
						attackValue += aCard1.value;
					}
				}
				if (aStack2.cards.length > 0) {
					const aCard2 = aStack2.cards[aStack2.cards.length - 1];
					if (isRed(aCard2) === isRed(targetCard)) {
						attackValue += aCard2.value;
					}
				}
			} else if (targetCard.rank === Ranks.KING) {
				if (aStack1.cards.length > 0) {
					const aCard1 = aStack1.cards[aStack1.cards.length - 1];
					if (aCard1.suit === targetCard.suit) {
						attackValue += aCard1.value;
					}
				}
				if (aStack2.cards.length > 0) {
					const aCard2 = aStack2.cards[aStack2.cards.length - 1];
					if (aCard2.suit === targetCard.suit) {
						attackValue += aCard2.value;
					}
				}
			}
			if (attackValue >= targetCard.value) {
				targetCard.isFaceUp = false;
			}
		}
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
