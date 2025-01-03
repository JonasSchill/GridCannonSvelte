<script>
	import { setup } from '$lib/game/setup';
	import { config } from '$lib/stores/config.svelte';
	import { gameState, resetGameState } from '$lib/stores/gamestate.svelte';
	import GameBoardComponent from '$lib/components/GameBoardComponent.svelte';
	import CardStackComponent from '$lib/components/CardStackComponent.svelte';

	setup();
	const isSetup = true;

	const cardStyle = $derived(`--card-size: ${config.cardSize + 20}px;`);

	function onclick() {
		resetGameState();
	}
</script>


{#if isSetup}
	<div class="page-container">
		<div class="top-bar">
			<button
				{onclick}
				class="game-button"
				aria-label="Reset Game"
			>
				Reset Game
			</button>
			<h1 style="margin: 0;">Game Title</h1>
			<button
				{onclick}
				class="game-button"
				aria-label="Reset Game"
			>
				Reset Game
			</button>
		</div>
		<div class="game-container">
			<div class="side-panel" style={cardStyle}>
				<CardStackComponent cardStack={gameState.draw} />
				<CardStackComponent cardStack={gameState.royals} />
			</div>
			<GameBoardComponent />
			<div class="side-panel" style={cardStyle}>
				<CardStackComponent cardStack={gameState.aces} />
				<CardStackComponent cardStack={gameState.jokers} />
			</div>
		</div>
	</div>
{/if}


<style>

    .game-button {
        /* Base styles */
        background-color: #123524;
        color: #3E7B27;
        padding: 0.5rem 1rem;
        border: 2px solid #123524;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;

        /* Ensure text is readable */
        font-size: 1rem;

        /* Maintain visibility of focus state for keyboard users */

        &:focus {
            outline: 3px solid #66a3ff;
            outline-offset: 2px;
        }

        /* Hover state */

        &:hover {
            background-color: #3a3a3a;
            border-color: #5a5a5a;
            transform: translateY(-1px);
        }

        /* Active state for click feedback */

        &:active {
            transform: translateY(1px);
        }

        /* Disabled state */

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }


    .top-bar {
        height: 60px; /* Adjust as needed */
        background-color: #3E7B27; /* Example background color */
        color: #123524; /* Example text color */
        display: flex;
        align-items: center; /* Vertically center the text */
        justify-content: center; /* Horizontally center the text */
        font-size: 2rem;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow for separation */
        margin-bottom: 20px;
        gap: 75px;
        position: relative;
        padding: 1rem;
    }

    /* .title {
				 margin: 0;
				 position: absolute;
				 left: 50%;
				 transform: translateX(-50%);
		 }*/

    .page-container {
        display: flex;
        flex-direction: column; /* Stack the bar and game area vertically */
        width: 100%;
        height: auto; /* Full viewport height */
        background-color: #EFE3C2;
        padding-bottom: 20px;
    }

    .game-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        /*height: 100vh; /* Full height viewport */
        /*flex: 1;*/
        height: auto;
        gap: 30px;
    }

    .side-panel {
        width: var(--card-size); /* Adjust as needed */
        display: flex;
        flex-direction: column;
        align-items: center;
        /*height: 100vh;*/
        justify-content: space-evenly;
        align-self: stretch;
        /*height: 80%;*/
    }
</style>
