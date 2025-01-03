import { type GameState, StackTypes } from '$lib/game/types';
import { setup } from '$lib/game/setup';

const INITIAL_STATE: GameState = {
	stacks: [
		{ id: '-1', cards: [], type: StackTypes.NULL, validDropLocation: false },
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
		{ id: '-1', cards: [], type: StackTypes.NULL, validDropLocation: false }
	],
	draw: { id: 'draw', cards: [], type: StackTypes.DRAW, validDropLocation: false },
	jokers: { id: 'jokers', cards: [], type: StackTypes.JOKERS, validDropLocation: false },
	aces: { id: 'aces', cards: [], type: StackTypes.ACES, validDropLocation: false },
	royals: { id: 'royals', cards: [], type: StackTypes.ROYALS, validDropLocation: false },
	selectedCard: null,
	selectedSource: null,
	jokerActive: false,
	aceActive: false,
	gameOver: false,
	gameOverMessage: ""
};

export const gameState = $state<GameState>(structuredClone(INITIAL_STATE));

export const resetGameState = () => {
	gameState.stacks = structuredClone(INITIAL_STATE.stacks);
	gameState.draw = structuredClone(INITIAL_STATE.draw);
	gameState.jokers = structuredClone(INITIAL_STATE.jokers);
	gameState.aces = structuredClone(INITIAL_STATE.aces);
	gameState.royals = structuredClone(INITIAL_STATE.royals);
	gameState.selectedCard = null;
	gameState.selectedSource = null;
	gameState.jokerActive = false;
	gameState.aceActive = false;
	gameState.gameOver = false;
	gameState.gameOverMessage = "";
	setup();
};

export const borderToCenterAdjacency: Record<string, string> = {
	'B0': 'C0',
	'B1': 'C1',
	'B2': 'C2',
	'B3': 'C0',
	'B4': 'C2',
	'B5': 'C3',
	'B6': 'C5',
	'B7': 'C6',
	'B8': 'C8',
	'B9': 'C6',
	'B10': 'C7',
	'B11': 'C8'
}

export const centerToBorderAdjacency: Record<string, string[]> = {
	'C0': ['B0', 'B3'],
	'C1': ['B1'],
	'C2': ['B2', 'B4'],
	'C3': ['B5'],
	'C4': [],
	'C5': ['B6'],
	'C6': ['B7', 'B9'],
	'C7': ['B10'],
	'C8': ['B8', 'B11']
}

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
