import { type GameState, StackTypes } from '$lib/game/types';

export const gameState = $state<GameState>({
	stacks: [
		{ id: '-1', cards: [], type: StackTypes.NULL, validDropLocation: false},
		{ id: 'B0', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: 'B1', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: 'B2', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: '-1', cards: [], type: StackTypes.NULL, validDropLocation: false },
		{ id: 'B3', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: 'C0', cards: [], type: StackTypes.CENTER, validDropLocation: false },
		{ id: 'C1', cards: [], type: StackTypes.CENTER, validDropLocation: false },
		{ id: 'C2', cards: [], type: StackTypes.CENTER, validDropLocation: false },
		{ id: 'B4', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: 'B5', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: 'C3', cards: [], type: StackTypes.CENTER, validDropLocation: false },
		{ id: 'C4', cards: [], type: StackTypes.CENTER, validDropLocation: false },
		{ id: 'C5', cards: [], type: StackTypes.CENTER, validDropLocation: false },
		{ id: 'B6', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: 'B7', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: 'C6', cards: [], type: StackTypes.CENTER, validDropLocation: false },
		{ id: 'C7', cards: [], type: StackTypes.CENTER, validDropLocation: false },
		{ id: 'C8', cards: [], type: StackTypes.CENTER, validDropLocation: false },
		{ id: 'B8', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: '-1', cards: [], type: StackTypes.NULL, validDropLocation: false },
		{ id: 'B9', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: 'B10', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: 'B11', cards: [], type: StackTypes.BORDER, validDropLocation: false },
		{ id: '-1', cards: [], type: StackTypes.NULL, validDropLocation: false },
	],
	draw: { id: 'draw', cards: [], type: StackTypes.DRAW, validDropLocation: false },
	jokers: { id: 'jokers', cards: [], type: StackTypes.JOKERS, validDropLocation: false },
	aces: { id: 'aces', cards: [], type: StackTypes.ACES, validDropLocation: false },
	royals: { id: 'royals', cards: [], type: StackTypes.ROYALS, validDropLocation: false },
	selectedCard: null,
	selectedSource: null
});

/*
    B00 B01 B02
B03 C00 C01 C02 B04
B05 C03 C04 C05 B06
B07 C06 C07 C08 B08
    B09 B10 B11

    C0 -> B4, B9
    C1 -> B10
    C2 -> B11, B3
    C3 -> B6
    C4
    C5 -> B5
    C6 -> B0, B8
    C7 -> B1
    C8 -> B2, B7
 */