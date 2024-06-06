<script lang="ts">
	import '../../../sidebar.css';
	import { template } from '$lib/store';
</script>

{#if $template}
	<div class="flex row header">
		<h2>Card</h2>
	</div>
	<div class="flex column content">
		<div class="flex column">
			<fieldset class="flex column container">
				<legend>Dimensions</legend>
				<div class="flex row">
					<div class="flex column">
						<label for="card-template-width">Width</label>
						<input
							type="number"
							id="card-template-width"
							step="0.01"
							min="0"
							bind:value={$template.width}
						/>
					</div>
					<div class="flex column">
						<label for="card-template-height">Height</label>
						<input
							type="number"
							id="card-template-height"
							step="0.01"
							min="0"
							bind:value={$template.height}
						/>
					</div>
					<div class="flex column">
						<label for="card-template-unit">Unit</label>
						<select id="card-template-unit" bind:value={$template.unit}>
							<option selected>in</option>
							<option>cm</option>
						</select>
					</div>
				</div>
			</fieldset>
			<fieldset class="flex column container padding">
				<legend>Padding</legend>
				<div class="flex row">
					<div class="flex column">
						<label for={`card-template-padding-top`}>Top</label>
						<input
							type="number"
							id={`card-template-padding-top`}
							step="0.01"
							min="0"
							bind:value={$template.padding.top}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-padding-right`}>Right</label>
						<input
							type="number"
							id={`card-template-padding-right`}
							step="0.01"
							min="0"
							bind:value={$template.padding.right}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-padding-bottom`}>Bottom</label>
						<input
							type="number"
							id={`card-template-padding-bottom`}
							step="0.01"
							min="0"
							bind:value={$template.padding.bottom}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-padding-left`}>Left</label>
						<input
							type="number"
							id={`card-template-padding-left`}
							step="0.01"
							min="0"
							bind:value={$template.padding.left}
						/>
					</div>
				</div>
			</fieldset>
		</div>
		<div class="flex column">
			<div class="flex row header">
				<input type="color" id={`border-color`} bind:value={$template.border.color} />
				<h3>Border</h3>
			</div>
			<fieldset class="flex column container">
				<legend>Width</legend>
				<div class="flex row">
					<div class="flex column">
						<label for={`card-template-border-width-top`}>Top</label>
						<input
							type="number"
							id={`card-template-border-width-top`}
							step="0.01"
							min="0"
							bind:value={$template.border.width.top}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-width-right`}>Right</label>
						<input
							type="number"
							id={`card-template-border-width-right`}
							step="0.01"
							min="0"
							bind:value={$template.border.width.right}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-width-bottom`}>Bottom</label>
						<input
							type="number"
							id={`card-template-border-width-bottom`}
							step="0.01"
							min="0"
							bind:value={$template.border.width.bottom}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-width-left`}>Left</label>
						<input
							type="number"
							id={`card-template-border-width-left`}
							step="0.01"
							min="0"
							bind:value={$template.border.width.left}
						/>
					</div>
				</div>
			</fieldset>
			<fieldset class="flex column container">
				<legend>Radius</legend>
				<div class="flex row">
					<div class="flex column">
						<div class="flex column">
							<label for={`card-template-border-radius-top`}>Top Left</label>
							<input
								type="number"
								id={`card-template-border-radius-top`}
								step="0.01"
								min="0"
								bind:value={$template.border.radius.topLeft}
							/>
						</div>
						<div class="flex column">
							<label for={`card-template-border-radius-left`}>Bottom Left</label>
							<input
								type="number"
								id={`card-template-border-radius-left`}
								step="0.01"
								min="0"
								bind:value={$template.border.radius.bottomLeft}
							/>
						</div>
					</div>
					<div class="flex column">
						<div class="flex column">
							<label for={`card-template-border-radius-right`}>Top Right</label>
							<input
								type="number"
								id={`card-template-border-radius-right`}
								step="0.01"
								min="0"
								bind:value={$template.border.radius.topRight}
							/>
						</div>
						<div class="flex column">
							<label for={`card-template-border-radius-bottom`}>Bottom Right</label>
							<input
								type="number"
								id={`card-template-border-radius-bottom`}
								step="0.01"
								min="0"
								bind:value={$template.border.radius.bottomRight}
							/>
						</div>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
{/if}

<style lang="scss">
	.content {
		gap: 0.5rem;
	}
</style>
