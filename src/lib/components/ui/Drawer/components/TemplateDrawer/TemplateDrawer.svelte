<script>
	import {
		CardControls,
		ColorControls,
		TextElementControl,
		TextElementControls,
	} from './components';
	import { activeElement, activeSidebarMenu } from '$lib/store';
	import { fly } from 'svelte/transition';
</script>

{#if $activeSidebarMenu || $activeElement}
	<div class="container" in:fly={{ opacity: 0, duration: 12000, y: 'calc(100% + 0.5rem)' }}>
		{#if $activeSidebarMenu === 'card'}
			<CardControls />
		{/if}
		{#if $activeSidebarMenu === 'color'}
			<ColorControls />
		{/if}
		{#if $activeSidebarMenu === 'text' && !$activeElement}
			<TextElementControls />
		{/if}
		{#if $activeElement}
			{#key $activeElement}
				<TextElementControl id={$activeElement} />
			{/key}
		{/if}
	</div>
{/if}
