<script>
import { setup } from '$lib/game/setup';
import { config } from '$lib/stores/config.svelte'
import { gameState } from '$lib/stores/gamestate.svelte';
import GameBoardComponent from '$lib/components/GameBoardComponent.svelte';
import CardStackComponent from '$lib/components/CardStackComponent.svelte';

setup();
const isSetup = true;

const cardStyle = $derived(`--card-size: ${config.cardSize + 20}px;`);
</script>


{#if isSetup}
	<div class="page-container">
		<div class="top-bar">GRID CANNON</div>
		<div class="game-container">
			<div class="side-panel" style={cardStyle}>
				<CardStackComponent cardStack={gameState.stacks[1]} />
				<CardStackComponent cardStack={gameState.stacks[2]} />
			</div>
		<GameBoardComponent />
			<div class="side-panel" style={cardStyle}>
				<CardStackComponent cardStack={gameState.stacks[3]} />
				<CardStackComponent cardStack={gameState.stacks[4]} />
			</div>
		</div>
	</div>
{/if}


<style>

	.top-bar {
			height: 60px; /* Adjust as needed */
			background-color: #333; /* Example background color */
			color: white; /* Example text color */
			display: flex;
			align-items: center; /* Vertically center the text */
			justify-content: center; /* Horizontally center the text */
			font-size: 1.5rem;
			font-weight: bold;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow for separation */
			margin-bottom: 20px;
	}
	.page-container{
      display: flex;
      flex-direction: column; /* Stack the bar and game area vertically */
      width: 100%;
      height: 100vh; /* Full viewport height */
	}
	.game-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      /*height: 100vh; /* Full height viewport */
			/*flex: 1;*/
			height: auto;
			gap: 20px;
	}

  .side-panel {
      width: var(--card-size); /* Adjust as needed */
      display: flex;
      flex-direction: column;
      align-items: center;
      /*height: 100vh;*/
      justify-content: space-evenly;
      align-self: stretch;
  }
</style>
