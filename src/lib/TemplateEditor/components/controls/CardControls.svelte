<script lang="ts">
	import '../../../../styles/controls.css';
	import { state } from '$lib/store';
</script>

<div class="flex column">
	<div class="flex row header">
		<h3>Dimensions</h3>
	</div>
	<div class="flex column container">
		<div class="flex row">
			<div class="flex column">
				<label for="card-template-unit">Unit</label>
				<select id="card-template-unit" bind:value={$state.template.unit}>
					<option selected>in</option>
					<option>cm</option>
				</select>
			</div>
		</div>
		<div class="flex row">
			<div class="flex column">
				<label for="card-template-width">Width</label>
				<input
					type="number"
					id="card-template-width"
					step="0.01"
					min="0"
					bind:value={$state.template.width}
				/>
			</div>
			<div class="flex column">
				<label for="card-template-height">Height</label>
				<input
					type="number"
					id="card-template-height"
					step="0.01"
					min="0"
					bind:value={$state.template.height}
				/>
			</div>
		</div>
		<fieldset class="flex column padding">
			<legend>Padding</legend>
			<div class="flex row">
				<div class="flex column">
					<label for={`card-template-padding-top`}>Top</label>
					<input
						type="number"
						id={`card-template-padding-top`}
						step="0.01"
						min="0"
						bind:value={$state.template.padding.top}
					/>
				</div>
				<div class="flex column">
					<label for={`card-template-padding-right`}>Right</label>
					<input
						type="number"
						id={`card-template-padding-right`}
						step="0.01"
						min="0"
						bind:value={$state.template.padding.right}
					/>
				</div>
				<div class="flex column">
					<label for={`card-template-padding-bottom`}>Bottom</label>
					<input
						type="number"
						id={`card-template-padding-bottom`}
						step="0.01"
						min="0"
						bind:value={$state.template.padding.bottom}
					/>
				</div>
				<div class="flex column">
					<label for={`card-template-padding-left`}>Left</label>
					<input
						type="number"
						id={`card-template-padding-left`}
						step="0.01"
						min="0"
						bind:value={$state.template.padding.left}
					/>
				</div>
			</div>
		</fieldset>
	</div>
</div>
<div class="flex column">
	<div class="flex row header">
		<input type="color" id={`border-color`} bind:value={$state.template.border.color} />
		<h3>Border</h3>
	</div>
	<div class="flex column container">
		<fieldset class="flex column">
			<legend>Width</legend>
			<div class="flex row">
				<div class="flex column">
					<label for={`card-template-border-width-top`}>Top</label>
					<input
						type="number"
						id={`card-template-border-width-top`}
						step="0.01"
						min="0"
						bind:value={$state.template.border.width.top}
					/>
				</div>
				<div class="flex column">
					<label for={`card-template-border-width-right`}>Right</label>
					<input
						type="number"
						id={`card-template-border-width-right`}
						step="0.01"
						min="0"
						bind:value={$state.template.border.width.right}
					/>
				</div>
				<div class="flex column">
					<label for={`card-template-border-width-bottom`}>Bottom</label>
					<input
						type="number"
						id={`card-template-border-width-bottom`}
						step="0.01"
						min="0"
						bind:value={$state.template.border.width.bottom}
					/>
				</div>
				<div class="flex column">
					<label for={`card-template-border-width-left`}>Left</label>
					<input
						type="number"
						id={`card-template-border-width-left`}
						step="0.01"
						min="0"
						bind:value={$state.template.border.width.left}
					/>
				</div>
			</div>
		</fieldset>
		<fieldset class="flex column">
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
							bind:value={$state.template.border.radius.topLeft}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-radius-left`}>Bottom Left</label>
						<input
							type="number"
							id={`card-template-border-radius-left`}
							step="0.01"
							min="0"
							bind:value={$state.template.border.radius.bottomLeft}
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
							bind:value={$state.template.border.radius.topRight}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-radius-bottom`}>Bottom Right</label>
						<input
							type="number"
							id={`card-template-border-radius-bottom`}
							step="0.01"
							min="0"
							bind:value={$state.template.border.radius.bottomRight}
						/>
					</div>
				</div>
			</div>
		</fieldset>
	</div>
</div>
