<script>
	import {
		CardControls,
		ColorControls,
		TextElementControl,
		TextElementControls,
	} from './components';
	import { activeElement, activeSidebarMenu, template } from '$lib/store';

	let collapsed = false;

	function toggleCollapse() {
		collapsed = !collapsed;
	}
</script>

{#if $activeSidebarMenu}
	<div class="container flex column min-content">
		<div class="flex row header align-center">
			<h2>{$activeElement || $activeSidebarMenu}</h2>
			<button
				type="button"
				on:click={() => toggleCollapse()}
				aria-label={`Collapse ${$activeSidebarMenu} Menu`}
				class="collapse"
			>
				<span>
					{#if collapsed}
						+
					{/if}
					{#if !collapsed}
						&#8212;
					{/if}
				</span>
			</button>
			<button
				type="button"
				on:click={() => activeSidebarMenu.set(null)}
				aria-label={`Close menu`}
				class="close">&#10005;</button
			>
		</div>
		<div class="content" class:collapsed>
			{#if $activeSidebarMenu === 'card'}
				<CardControls />
			{/if}
			{#if $activeSidebarMenu === 'color'}
				<ColorControls />
			{/if}
			{#if $activeSidebarMenu === 'text'}
				<TextElementControls />
			{/if}
		</div>
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
	.header {
		h2 {
			margin: 0 auto 0 0;
			text-transform: capitalize;
		}
	}
	button.close,
	button.collapse {
		background-color: transparent;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		height: 1.5rem;
		width: 1.5rem;
	}
	button.collapse {
		transition: opacity 150ms ease-in-out;
		span {
			transform: translateY(calc(1rem / 16));
		}
	}
	.content {
		display: grid;
		grid-template-rows: 1fr;
		transition: grid-template-rows 120ms ease-in-out, opacity 120ms ease-in-out;
		&.collapsed {
			margin-top: -0.25rem;
			opacity: 0;
			grid-template-rows: 0fr;
			overflow: hidden;
			pointer-events: none;
		}
	}
	@media screen and (min-width: 600px) {
		button.collapse {
			&:hover {
				background-color: var(--color);
				color: var(--background-color);
			}
		}
	}
</style>
