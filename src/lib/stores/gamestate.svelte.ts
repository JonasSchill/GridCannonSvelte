import { type GameState, StackTypes } from '$lib/game/types';

export const gameState = $state<GameState>({
	stacks: [
		{ id: '-1', cards: [], type: StackTypes.NULL },
		{ id: '0', cards: [], type: StackTypes.BORDER },
		{ id: '1', cards: [], type: StackTypes.BORDER },
		{ id: '2', cards: [], type: StackTypes.BORDER },
		{ id: '-1', cards: [], type: StackTypes.NULL },
		{ id: '3', cards: [], type: StackTypes.BORDER },
		{ id: '4', cards: [], type: StackTypes.CENTER },
		{ id: '5', cards: [], type: StackTypes.CENTER },
		{ id: '6', cards: [], type: StackTypes.CENTER },
		{ id: '7', cards: [], type: StackTypes.BORDER },
		{ id: '8', cards: [], type: StackTypes.BORDER },
		{ id: '9', cards: [], type: StackTypes.CENTER },
		{ id: '10', cards: [], type: StackTypes.CENTER },
		{ id: '11', cards: [], type: StackTypes.CENTER },
		{ id: '12', cards: [], type: StackTypes.BORDER },
		{ id: '13', cards: [], type: StackTypes.BORDER },
		{ id: '14', cards: [], type: StackTypes.CENTER },
		{ id: '15', cards: [], type: StackTypes.CENTER },
		{ id: '16', cards: [], type: StackTypes.CENTER },
		{ id: '17', cards: [], type: StackTypes.BORDER },
		{ id: '-1', cards: [], type: StackTypes.NULL },
		{ id: '18', cards: [], type: StackTypes.BORDER },
		{ id: '19', cards: [], type: StackTypes.BORDER },
		{ id: '10', cards: [], type: StackTypes.BORDER },
		{ id: '-1', cards: [], type: StackTypes.NULL },
	],
	draggingCard: null
});