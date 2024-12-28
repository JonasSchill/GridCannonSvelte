<script>
	import CardComponent from '$lib/components/CardComponent.svelte';
	import { Ranks, Suits } from '$lib/game/types';
</script>

<CardComponent card={{
	suit: Suits.HEART,
	rank: Ranks.SIX,
	isPlayable: false
}} />

<CardComponent card={{
	suit: Suits.SPADE,
	rank: Ranks.NINE,
	isPlayable: true
}} />