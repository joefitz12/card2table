<script>
	import { CardControls, ColorControls, TextElementControls } from './components';
	import { activeElement, activeSidebarMenu } from '$lib/store';
	import TextElementControl from './components/TextElementControl.svelte';
</script>

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
