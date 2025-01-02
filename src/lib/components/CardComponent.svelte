<script lang="ts">
	import { Suits } from '$lib/game/types'
	import { config } from '$lib/stores/config.svelte';
	import { clickCard } from '$lib/game/rules';
	import { isRoyal } from '$lib/game/utils';

	let { card, topCardClicked } = $props();

	let cardDimensions = $derived({
		padding: config.cardSize * config.cardPaddingRatio,
		width: config.cardSize,
		height: config.cardSize * config.cardSizeRatio,
		borderRadius: config.cardSize * config.cardBorderRadiusRatio
	});

	const cardStyle = $derived(`
		--card-width: ${cardDimensions.width}px;
    --card-height: ${cardDimensions.height}px;
    --card-radius: ${cardDimensions.borderRadius}px;
    --card-padding: ${cardDimensions.padding}px;
	`);

	const isRed = $derived(card.suit === Suits.HEART || card.suit === Suits.DIAMOND);
	const notJoker = $derived(card.suit !== Suits.JOKER);

	function onclick() {
		topCardClicked();
	}
</script>

<div
	class="card"
	class:playable={card.isPlayable}
	class:selected={card.isSelected}
	class:facedown={!card.isFaceUp}
	class:royal={isRoyal(card)}
	class:red={isRed}
	style={cardStyle}
	{onclick}
>
	{#if card.isFaceUp}
	<div class="card-corner top-left">
		<div class="rank">{card.rank}</div>
		{#if notJoker}
			<div class="suit">{card.suit}</div>
		{/if}
	</div>

	{#if notJoker}
		<div class="card-center suit">
			{card.suit}
		</div>
	{/if}

	<div class="card-corner bottom-right">
		<div class="rank">{card.rank}</div>
		{#if notJoker}
			<div class="suit">{card.suit}</div>
		{/if}
	</div>
	{/if}
</div>

<style>
    .card {
        width: var(--card-width);
        height: var(--card-height);
        background: white;
        border-radius: var(--card-radius);
        padding: var(--card-padding);
        position: relative;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid #ddd;
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: default;
				user-select: none;
    }

    /* Red cards */
    .card.red {
        color: #D40000;
    }

		.card.royal {
				background-color: lightpink;
		}

    /* Different hover effects based on playability */
    .card:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .card.playable:hover {
        transform: translateY(-10px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

		.card.playable {
				border-color: red;
				border-width: 2px;
		}

		.card.facedown {
				background-color: lightgray;
		}

		.card.selected {
				border-color: blue;
				border-width: 3px;
        transform: translateY(-10px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
				cursor: pointer;
		}

    /*.card.selected:hover {
        cursor: pointer;
    }*/

    /*.card:not(.playable):hover {
        transform: translateY(-2px);
        cursor: default;
    }*/

    .card-corner {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .top-left {
        top: 8px;
        left: 8px;
    }

    .bottom-right {
        bottom: 8px;
        right: 8px;
        transform: rotate(180deg);
    }

    .rank {
        font-size: 1.2em;
        font-weight: bold;
    }

    .suit {
        font-size: 1.2em;
    }

    .card-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3em;
    }
</style>