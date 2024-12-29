<script lang="ts">

	import CardStackComponent from '$lib/components/CardStackComponent.svelte';
	import { gameState } from '$lib/stores/gamestate.svelte';
	import { config } from '$lib/stores/config.svelte';
	import { StackTypes } from '$lib/game/types';
	import { toPixels } from '$lib/game/utils';

	let columns = 5;
</script>

<div
	class="game-board"
	style:grid-template-columns={`repeat(${columns}, ${toPixels(config.cardSize)})`}
	style:gap={config.gridGap}
>
	{#each gameState.stacks as cardStack}
		<div class="card-cell" style:width={config.cardSize} style:height={config.cardSize * config.cardSizeRatio}>
			{#if cardStack.type !== StackTypes.NULL}
				<CardStackComponent {cardStack}/>
			{/if}
		</div>
	{/each}
</div>

<style>
    .game-board {
        display: grid;
        justify-content: center;
        width: fit-content;
        margin: 0 auto;
    }

    .card-cell {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

