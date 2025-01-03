<script lang="ts">
	import CardComponent from '$lib/components/CardComponent.svelte';
	import { config } from '$lib/stores/config.svelte';
	import { StackTypes } from '$lib/game/types';
	import { clickCard } from '$lib/game/rules';

	let { cardStack } = $props();

	let isEmpty = $derived(cardStack.cards.length === 0);
	let topCard = $derived(isEmpty ? null : cardStack.cards[cardStack.cards.length - 1]);
	let specialStack = $derived(cardStack.type !== StackTypes.CENTER && cardStack.type !== StackTypes.BORDER);

	const stackStyle = $derived(`
		--width: ${config.cardSize}px;
		--height: ${config.cardSize * config.cardSizeRatio}px;
	`);

	function onclick() {
		clickCard(cardStack);

	}

	function topCardClicked() {
		clickCard(cardStack);
	}
</script>

<div class="card-stack"
		 class:noncenter={specialStack}

		 aria-label={cardStack.type || (cardStack.cards.length ? 'Card stack' : 'Empty card stack')}
		 style={stackStyle}
>
	{#if !isEmpty}
			<CardComponent card={topCard} {topCardClicked} />
	{:else}
		<div class="empty-card-placeholder"
				 class:valid={cardStack.validDropLocation}
				 {onclick}>
			{#if cardStack.type}
				<span class="stack-label">{cardStack.type}</span>
			{/if}
		</div>
	{/if}
</div>


<style>
    .card-stack {
        position: relative;
        /* Use the same dimensions as your CardComponent */
        width: var(--width);
        height: var(--height);
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: content-box;
    }

		.noncenter {
				padding: 10px;
				border-radius: 10px;
        background-color: #85A947;
		}

    .empty-card-placeholder {
        width: 100%;
        height: 100%;
        border: 2px dashed #ccc;
        border-radius: var(--card-border-radius, 8px);
        display: flex;
        align-items: center;
        justify-content: center;
    }

		.empty-card-placeholder.valid {
        border: 2px dashed red;
        cursor: pointer;
		}

    .stack-label {
        color: #666;
        font-size: 0.9em;
        text-align: center;
        padding: 0.5em;
    }
</style>