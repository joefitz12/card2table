<script lang="ts">
	import { activeSidebarMenu } from '$lib/store';
	import { CardControls, ColorControls, TextElementControls } from './components';
</script>

{#if $activeSidebarMenu === 'card'}
	<CardControls />
{/if}
{#if $activeSidebarMenu === 'color'}
	<ColorControls />
{/if}
{#if $activeSidebarMenu === 'text'}
	<TextElementControls />
{/if}
