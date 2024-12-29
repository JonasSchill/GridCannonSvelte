<script>
	import CardComponent from '$lib/components/CardComponent.svelte';
	import { Ranks, StackTypes, Suits } from '$lib/game/types';
	import CardStackComponent from '$lib/components/CardStackComponent.svelte';
</script>

<CardStackComponent cardStack={{
	id: "s1",
	type: StackTypes.CENTER,
	cards: [
		{
			suit: Suits.HEART,
			rank: Ranks.SIX,
			isPlayable: false
		},
		{
			suit: Suits.SPADE,
			rank: Ranks.NINE,
			isPlayable: false
		}
	]
}} />

<CardStackComponent cardStack={{
	id: "s2",
	type: StackTypes.DRAW,
	cards: []
}} />
