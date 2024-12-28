<script lang="ts">
	import { Suits } from '$lib/game/types'
	import { config } from '$lib/stores/config.svelte';

	let { card } = $props();

	let cardDimensions = $derived({
		width: config.cardSize,
		height: config.cardSize * config.cardSizeRatio,
		padding: config.cardSize * config.cardPaddingRatio,
		borderRadius: config.cardSize * config.cardBorderRadiusRatio
	});

	const cardStyle = $derived(`
		--card-width: ${cardDimensions.width}px;
    --card-height: ${cardDimensions.height}px;
    --card-radius: ${cardDimensions.borderRadius}px;
    --card-padding: ${cardDimensions.padding}px;
	`)

	const isRed = $derived(card.suit === Suits.HEART || card.suit === Suits.DIAMOND);
</script>

<div
	class="card"
	class:playable={card.isPlayable}
	class:red={isRed}
	style={cardStyle}
>
	<div class="card-corner top-left">
		<div class="rank">{card.rank}</div>
		<div class="suit">{card.suit}</div>
	</div>

	<div class="card-center suit">
		{card.suit}
	</div>

	<div class="card-corner bottom-right">
		<div class="rank">{card.rank}</div>
		<div class="suit">{card.suit}</div>
	</div>
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
        cursor: pointer;
				user-select: none;
    }

    /* Red cards */
    .card.red {
        color: #D40000;
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

    .card:not(.playable):hover {
        transform: translateY(-2px);
        cursor: default;
    }

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