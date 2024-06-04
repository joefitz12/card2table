<script>
	import {
		CardControls,
		ColorControls,
		TextElementControl,
		TextElementControls,
	} from './components';
	import { activeElement, activeSidebarMenu } from '$lib/store';
</script>

{#if $activeSidebarMenu && !$activeElement}
	<div class="container">
		{#if $activeSidebarMenu === 'card'}
			<CardControls />
		{/if}
		{#if $activeSidebarMenu === 'color'}
			<ColorControls />
		{/if}
		{#if $activeSidebarMenu === 'text' && !$activeElement}
			<TextElementControls />
		{/if}
	</div>
{/if}
{#if $activeElement}
	{#key $activeElement}
		<TextElementControl id={$activeElement} />
	{/key}
{/if}

<style lang="scss">
	.container {
		background-color: var(--transparent-background-color);
	}
</style>
