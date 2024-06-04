<script>
	import { CardControls, ColorControls, TextElementControls } from './components';
	import { activeElement, activeSidebarMenu } from '$lib/store';
	import TextElementControl from './components/TextElementControl.svelte';
	import { fade } from 'svelte/transition';
</script>

{#if $activeSidebarMenu || $activeElement}
	<div in:fade={{ duration: 120 }}>
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
