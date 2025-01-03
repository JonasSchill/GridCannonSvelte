import {
	borderToCenterAdjacency,
	centerToBorderAdjacency,
	gameState
} from '$lib/stores/gamestate.svelte';
import { type Card, type CardStack, Ranks, StackTypes } from '$lib/game/types';
import { isRed, isRoyal } from '$lib/game/utils';

export function clickCard(cardStack: CardStack) {
	if (cardStack.cards.length === 0) {
		if (gameState.selectedCard && cardStack.validDropLocation) {
			playCard(cardStack);
			return;
		} else {
			return;
		}
	}

	const card = cardStack.cards[cardStack.cards.length - 1];
	if (!card.isPlayable && !card.isSelected) return;

	if (
		gameState.selectedCard === null &&
		card.rank === Ranks.ACE &&
		cardStack.type === StackTypes.ACES
	) {
		if (card.isSelected) {
			card.isSelected = false;
			gameState.aceActive = false;
		} else {
			card.isSelected = true;
			gameState.aceActive = true;
		}
		updatePlayable();
		return;
	}

	if (
		gameState.selectedCard === null &&
		card.rank === Ranks.JOKER &&
		cardStack.type === StackTypes.JOKERS
	) {
		if (card.isSelected) {
			card.isSelected = false;
			gameState.jokerActive = false;
		} else {
			card.isSelected = true;
			gameState.jokerActive = true;
		}
		updatePlayable();
		return;
	}

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
		if (gameState.aceActive) {
			gameState.aceActive = false;
			gameState.aces.cards.pop();
			for (const card of cardStack.cards) {
				card.isFaceUp = false;
			}
			gameState.draw.cards = cardStack.cards.concat(gameState.draw.cards);
			cardStack.cards = [];
			card.isSelected = false;
			card.isPlayable = false;
			gameState.selectedCard = null;
			gameState.selectedSource = null;
		}
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
			if (stack.type === StackTypes.BORDER && gameState.selectedSource.type === StackTypes.DRAW
				&& !isRoyal(card)) {
				if (stack.cards.length > 0) {
					const topCard = stack.cards[stack.cards.length - 1];
					topCard.value += card.value;
					if (topCard.value >= 20 ) {
						youLost();
						return;
					} else if (topCard.value >= 19 && topCard.rank === Ranks.KING) {
						youLost();
						return;
					}
					topCard.isArmoured = true;
					stack.cards = [card].concat(stack.cards);
				}
			} else {
				stack.cards.push(card);
			}
			deselect();
			if (gameState.jokerActive) {
				gameState.jokerActive = false;
				gameState.jokers.cards.pop();
			}
			if (stack.type === StackTypes.CENTER) {
				evaluateGridMove(stack);
			}
			updatePlayable();
		}
	}
	if (
		gameState.draw.cards.length === 0 &&
		!won() &&
		!gameState.jokerActive &&
		!gameState.aceActive &&
		gameState.jokers.cards.length == 0 &&
		gameState.aces.cards.length === 0
	) {
		youLost();
	}
};

const youLost = () => {
	gameState.gameOverMessage = 'You Lost!';
	gameState.gameOver = true;
}

const evaluateGridMove = (stack: CardStack) => {
	switch (stack.id) {
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
			attack('C4', 'C5', 'B6');
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
};

const attack = (aStack1ID: string, aStack2ID: string, targetStackId: string) => {
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
				console.log(targetCard.id, " turned face down");
				if (won()) {
					gameState.gameOverMessage =
						'You Won! With a score of: ' +
						(gameState.jokers.cards.length + gameState.aces.cards.length);
					gameState.gameOver = true;
					return;
				}
				doRoyalRefresh();
			}
		}
	}
};

const doRoyalRefresh = () => {
	let livingRoyalCount = 0;
	for (let i = 0; i < gameState.stacks.length; i++) {
		const stack = gameState.stacks[i];
		if (stack.type !== StackTypes.BORDER) {
			continue;
		}
		if (stack && stack.cards.length > 0) {
			const card = stack.cards[stack.cards.length - 1];
			if (isRoyal(card) && card.isFaceUp) {
				livingRoyalCount++;
			}
		}
	}
	if (livingRoyalCount === 0) {
		royalRefresh();
	}
};

export function royalRefresh() {
	const tempStack: Card[] = [];
	while (gameState.royals.cards.length == 0 && gameState.draw.cards.length > 0) {
		const tempCard = gameState.draw.cards.pop();
		if (tempCard) {
			if (isRoyal(tempCard)) {
				tempCard.isFaceUp = true;
				tempCard.isPlayable = true;
				gameState.royals.cards.push(tempCard);
			} else {
				tempStack.push(tempCard);
			}
		}
	}
	gameState.draw.cards = tempStack.concat(gameState.draw.cards);
}

export function won() {
	let deadRoyalCount = 0;
	for (let i = 0; i < gameState.stacks.length; i++) {
		const stack = gameState.stacks[i];
		if (stack.type !== StackTypes.BORDER) {
			continue;
		}
		if (stack && stack.cards.length > 0) {
			const card = stack.cards[stack.cards.length - 1];
			if (isRoyal(card) && !card.isFaceUp) {
				deadRoyalCount++;
			}
		}
	}
	return deadRoyalCount >= 12;
}

const deselect = () => {
	if (gameState.selectedCard) {
		gameState.selectedCard.isSelected = false;
		gameState.selectedCard = null;
		gameState.selectedSource = null;
	}
};

const updatePlayable = () => {
	if (gameState.selectedCard === null) {
		if (gameState.aceActive || gameState.jokerActive) {
			if (gameState.draw.cards.length > 0) {
				gameState.draw.cards[gameState.draw.cards.length - 1].isPlayable = false;
			}
			for (let i = 0; i < gameState.stacks.length; i++) {
				const stack = gameState.stacks[i];
				if (stack.type === StackTypes.CENTER) {
					if (stack.cards.length > 0) {
						stack.cards[stack.cards.length - 1].isPlayable = true;
					}
				} else if (stack.type === StackTypes.BORDER) {
					stack.validDropLocation = false;
					if (stack.cards.length > 0) {
						stack.cards[stack.cards.length - 1].isPlayable = false;
					}
				}
			}
			if (gameState.aceActive) {
				makeJokerStackUnplayable();
			} else if (gameState.jokerActive) {
				makeAceStackUnplayable();
			}
		} else {
			if (gameState.royals.cards.length > 0) {
				// if there are royals make the top draw card not playable
				if (gameState.draw.cards.length > 0) {
					gameState.draw.cards[gameState.draw.cards.length - 1].isPlayable = false;
					gameState.royals.cards[gameState.royals.cards.length - 1].isPlayable = true;
				}
				makeAceStackUnplayable();
				makeJokerStackUnplayable();
			} else if (gameState.draw.cards.length > 0) {
				// if there are no royals make the top draw card playable
				gameState.draw.cards[gameState.draw.cards.length - 1].isPlayable = true;
				if (gameState.aces.cards.length > 0) {
					gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = true;
				}
				if (gameState.jokers.cards.length > 0) {
					gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = true;
				}
			} else if (gameState.draw.cards.length === 0) {
				gameState.draw.validDropLocation = false;
				if (gameState.aces.cards.length > 0) {
					gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = true;
				}
				if (gameState.jokers.cards.length > 0) {
					gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = true;
				}
			}
		}
		if (!gameState.aceActive && !gameState.jokerActive) {
			makeAllGridStacksAndCardsUnplayable();
		}
	} else {
		gameState.selectedCard.isPlayable = false;
		if (isRoyal(gameState.selectedCard)) {
			// test code make all border slots playable
			let mostSimilarCard: Card | null = null;
			let adjacentSlots: CardStack[] = [];
			for (let i = 0; i < gameState.stacks.length; i++) {
				const stack = gameState.stacks[i];
				if (stack.type === StackTypes.BORDER) {
					if (stack.cards.length === 0) {
						const centerStack = gameState.stacks.find(
							(s) => s.id == borderToCenterAdjacency[stack.id]
						);
						if (centerStack) {
							if (centerStack.cards.length > 0) {
								const contenderCard = centerStack.cards[centerStack.cards.length - 1];
								if (!mostSimilarCard) {
									mostSimilarCard = contenderCard;
									for (let j = 0; j < centerToBorderAdjacency[centerStack.id].length; j++) {
										const pushStack = gameState.stacks.find(
											(s) => s.id == centerToBorderAdjacency[centerStack.id][j]
										);
										if (pushStack) {
											adjacentSlots.push(pushStack);
										}
									}
								} else if (
									moreSimilar(contenderCard, mostSimilarCard, gameState.selectedCard) > 0
								) {
									mostSimilarCard = contenderCard;
									adjacentSlots = [];
									for (let j = 0; j < centerToBorderAdjacency[centerStack.id].length; j++) {
										const pushStack = gameState.stacks.find(
											(s) => s.id == centerToBorderAdjacency[centerStack.id][j]
										);
										if (pushStack) {
											adjacentSlots.push(pushStack);
										}
									}
								} else if (
									moreSimilar(contenderCard, mostSimilarCard, gameState.selectedCard) === 0
								) {
									for (let j = 0; j < centerToBorderAdjacency[centerStack.id].length; j++) {
										const pushStack = gameState.stacks.find(
											(s) => s.id == centerToBorderAdjacency[centerStack.id][j]
										);
										if (pushStack) {
											adjacentSlots.push(pushStack);
										}
									}
								}
							} else if (adjacentSlots.length === 0) {
								for (let j = 0; j < centerToBorderAdjacency[centerStack.id].length; j++) {
									const pushStack = gameState.stacks.find(
										(s) => s.id == centerToBorderAdjacency[centerStack.id][j]
									);
									if (pushStack) {
										adjacentSlots.push(pushStack);
									}
								}
							}
						}
					} else {
						stack.validDropLocation = false;
						stack.cards[stack.cards.length - 1].isPlayable = false;
					}
				}
			}

			for (let i = 0; i < adjacentSlots.length; i++) {
				adjacentSlots[i].validDropLocation = adjacentSlots[i].cards.length === 0;
			}

			makeJokerStackUnplayable();
			makeAceStackUnplayable();
			makeCenterStacksAndCardsUnplayable();
		} else if (gameState.selectedCard.rank == Ranks.JOKER) {
			console.log('cleared for selected rank joker');
			makeJokerStackPlayable();
			makeAceStackUnplayable();
			makeAllGridStacksAndCardsUnplayable();
		} else if (gameState.selectedCard.rank == Ranks.ACE) {
			console.log('cleared for selected rank ace');
			makeAceStackPlayable();
			makeJokerStackUnplayable();
			makeAllGridStacksAndCardsUnplayable();
		} else {
			// if normal card do center calculations
			let numberCenterAvailable = 0;
			for (let i = 1; i < gameState.stacks.length; i++) {
				const stack = gameState.stacks[i];
				if (stack.type === StackTypes.CENTER) {
					if (stack.cards.length == 0) {
						stack.validDropLocation = true;
						numberCenterAvailable++;
					} else if (gameState.selectedCard.value >= stack.cards[stack.cards.length - 1].value) {
						stack.validDropLocation = true;
						stack.cards[stack.cards.length - 1].isPlayable = true;
						numberCenterAvailable++;
					} else {
						stack.validDropLocation = false;
						stack.cards[stack.cards.length - 1].isPlayable = false;
					}
				}
			}
			if (numberCenterAvailable === 0) {
				if (gameState.jokers.cards.length + gameState.aces.cards.length === 0) {
					// Allow armor
					for (let i = 0; i < gameState.stacks.length; i++) {
						const stack = gameState.stacks[i];
						if (stack.type === StackTypes.BORDER && stack.cards.length > 0) {
							const cardToBeArmoured = stack.cards[stack.cards.length - 1]
							if (cardToBeArmoured.isFaceUp) {
								cardToBeArmoured.isPlayable = true;
							}
						}
					}
				}
			}
			makeJokerStackUnplayable();
			makeAceStackUnplayable();
		}
	}
};

const moreSimilar = (contender: Card, established: Card, target: Card) => {
	// Prioritize suit similarity
	if (established.suit === target.suit) {
		if (contender.suit !== target.suit) return -1;
		return contender.value - established.value;
	} else if (contender.suit === target.suit) {
		return 1;
	}

	// Next, check color similarity
	if (isRed(established) === isRed(target)) {
		if (isRed(contender) !== isRed(target)) return -1;
		return contender.value - established.value;
	} else if (isRed(contender) === isRed(target)) {
		return 1;
	}

	// Finally, compare by value
	return contender.value - established.value;
};

const makeAllGridStacksAndCardsUnplayable = () => {
	for (let i = 1; i < gameState.stacks.length; i++) {
		const stack = gameState.stacks[i];
		if (stack.type === StackTypes.BORDER || stack.type === StackTypes.CENTER) {
			stack.validDropLocation = false;
			if (stack.cards.length !== 0) {
				stack.cards[stack.cards.length - 1].isPlayable = false;
			}
		}
	}
};

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
};

const makeJokerStackUnplayable = () => {
	gameState.jokers.validDropLocation = false;
	if (gameState.jokers.cards.length > 0) {
		gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = false;
	}
};

const makeJokerStackPlayable = () => {
	gameState.jokers.validDropLocation = true;
	if (gameState.jokers.cards.length > 0) {
		gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = true;
	}
};

const makeAceStackUnplayable = () => {
	gameState.aces.validDropLocation = false;
	if (gameState.aces.cards.length > 0) {
		gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = false;
	}
};

const makeAceStackPlayable = () => {
	gameState.aces.validDropLocation = true;
	if (gameState.aces.cards.length > 0) {
		gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = true;
	}
};
