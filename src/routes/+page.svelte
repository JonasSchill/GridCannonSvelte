<script>
import { setup } from '$lib/game/setup';
import GameBoardComponent from '$lib/components/GameBoardComponent.svelte';

setup();
const isSetup = true;
</script>


{#if isSetup}
		<GameBoardComponent />
{/if}

