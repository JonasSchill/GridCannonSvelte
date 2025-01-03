<script>
	import { setup } from '$lib/game/setup';
	import { config } from '$lib/stores/config.svelte';
	import { gameState, resetGameState } from '$lib/stores/gamestate.svelte';
	import GameBoardComponent from '$lib/components/GameBoardComponent.svelte';
	import CardStackComponent from '$lib/components/CardStackComponent.svelte';
	import { isRoyal } from '$lib/game/utils';

	setup();
	const isSetup = true;

	const cardStyle = $derived(`--card-size: ${config.cardSize + 20}px;`);

	function onclick() {
		resetGameState();
	}

	let showInstructions = $state(false);
	function showInstructionButton() {
		showInstructions = !showInstructions;
	}

	let infoMessage = $derived.by(() => {
		const arr = [];
		if (gameState.hoveredStack) {
			for (const card of gameState.hoveredStack.cards) {
				let s = card.id;
				if (isRoyal(card)) {
					s += (" total value: " + card.value) ;
				}
				arr.push(s);
			}
		}
		return arr;
	});




</script>


{#if isSetup}
	{#if gameState.gameOver}
	<div class="overlay">
		<h1>{gameState.gameOverMessage}</h1>
		<button class="game-button" {onclick}>Play Again</button>
	</div>
{/if}
	<div class="page-container">
		<div class="top-bar">
			<button
				{onclick}
				class="game-button"
				aria-label="Reset Game"
			>
				Reset Game
			</button>
			<h1 style="margin: 0;">GRID CANNON</h1>
			<button
				onclick={() => showInstructionButton()}
				class="game-button"
				aria-label="Show Instructions"
			>
				Show Instructions
			</button>
		</div>
		{#if showInstructions}
			<div class="instructions">
				<h1>Game Instructions</h1>

				<h2>Setup</h2>
				<ul>
					<li>Start with a shuffled deck, including jokers.</li>
					<li>Draw cards from the top to create a 3×3 grid with number cards only. Place royals, aces, and jokers in a separate pile.</li>
					<li>For any drawn royals, place them adjacent to the grid card they are most similar to:</li>
					<ul>
						<li>Highest value card of the same suit.</li>
						<li>If none, highest value card of the same color.</li>
						<li>If none, highest value card.</li>
					</ul>
					<li>Keep any aces and jokers face-up to one side as <strong>Ploys</strong>.</li>
					<li>Optionally replace one grid card by drawing a new one.</li>
				</ul>

				<h2>The Goal</h2>
				<p>Find and kill all the royals.</p>

				<h2>Play</h2>
				<ul>
					<li>Draw the top card:</li>
					<ul>
						<li>If it’s a royal: place it using the placement rule above.</li>
						<li>If it’s a number card: place it on the grid (on a card with the same or lower value).</li>
						<li>If it’s an ace or joker: keep it as a <strong>Ploy</strong>.</li>
					</ul>
					<li><strong>Killing royals:</strong> Place a card opposite a royal, forming an attack:</li>
					<ul>
						<li>The two cards between must sum to at least the royal’s health.</li>
						<li>Specific rules for Jacks, Queens, and Kings apply.</li>
					</ul>
					<li>Turn killed royals face-down but do not remove them.</li>
				</ul>

				<h3>Ploys</h3>
				<ul>
					<li><strong>Aces:</strong> Pick up one grid stack and put it at the bottom of the draw pile.</li>
					<li><strong>Jokers:</strong> Move the top card of one stack to another valid position.</li>
				</ul>

				<h3>Other Rules</h3>
				<ul>
					<li>If you cannot place a card, add it as <strong>Armour</strong> to the most similar royal.</li>
					<li>If a royal’s health exceeds the attackable limit, you lose.</li>
					<li>If the draw pile runs out and not all royals are dead, you lose.</li>
				</ul>

				<h2>Scoring</h2>
				<p>Your score is the number of unused Ploys when all royals are dead. Maximum score: 6.</p>

				<div class="highlight">
					<strong>Note:</strong> Play strategically to maximize your score!
				</div>
			</div>
		{/if}
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
	<div class="info-panel" class:visible={gameState.hoveredStack !== null}>
		{#each infoMessage.reverse() as s}
			<p>{s}</p>
		{/each}
	</div>
{/if}


<style>

    h1 {
        font-size: 2em;
        margin-bottom: 10px;
    }

    h2 {
        margin-top: 20px;
        font-size: 1.5em;
    }

    h3 {
        margin-top: 15px;
        font-size: 1.2em;
    }

    ul {
        margin: 10px 0;
        padding-left: 20px;
    }

    li {
        margin-bottom: 5px;
    }

    .note {
        font-style: italic;
        color: #555;
    }

    code {
        background: #eee;
        padding: 2px 4px;
        border-radius: 4px;
        font-size: 0.9em;
    }

    .highlight {
        background: #fef7d9;
        border-left: 4px solid #ffd700;
        padding: 10px;
        margin: 10px 0;
    }

    .overlay {
				position: fixed;
				align-self: stretch;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #EFE3C2;
        color: #3E7B27;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
				z-index: 100;
				overflow: hidden;
    }

		.instructions {
				position: relative;
				justify-content: center;
				width: auto;
				align-self: center;
		}



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

    .info-panel {
        position: fixed;
        top: 10%;
        right: 10px;
        width: 250px;
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 10px;
        display: none; /* Initially hidden */
        z-index: 1000; /* Ensure it's above other elements */
    }

    .info-panel.visible {
        display: block;
    }
</style>
