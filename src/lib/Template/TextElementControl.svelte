<script lang="ts">
	export let title: String;
	export let handleClick: () => void;
	export let id: Number;
	export let color: String;
	export let fontSize: number;
</script>

<div class="flex column">
	<div class="flex row">
		<input value={title} />
		<button type="button" on:click={handleClick} aria-label={`Remove ${title}`}>X</button>
	</div>
	<div class="flex row">
		<div class="flex column">
			<label for={`text-element-${id}-font-size`}>Font size</label>
			<input type="number" id={`text-element-${id}`} step="0.01" bind:value={fontSize} />
		</div>
		<div class="flex column">
			<label for={`text-element-${id}-color`}>Color</label>
			<input type="color" id={`text-element-${id}-color`} bind:value={color} />
		</div>
	</div>
</div>
