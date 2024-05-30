<script>
	import { setting } from '$lib/api';
	import { darkTheme, menuExpanded } from '$lib/store';

	darkTheme.subscribe((value) => {
		if (value) {
			setting
				.add({ id: 'darkTheme' })
				.then((success) => console.log(success))
				.catch((error) => console.error(error));
		} else if (value !== undefined) {
			setting.delete('darkTheme').then((success) => console.log(success));
		}
	});
</script>

<header class="flex align-center">
	<nav id="main-nav">
		<ul class="flex align-center">
			<li>
				<button
					class="menu flex align-center"
					on:click={() => menuExpanded.update(($menuExpanded) => !$menuExpanded)}>&#9776;</button
				>
			</li>
			<li>
				<a class="title" href="/">card2table</a>
			</li>
			<!-- <li>
                <a href="/faq">FAQ</a>
            </li> -->
			<!-- <li>
                <a href="/template">Templates</a>
            </li> -->
			<!-- <li>
                <a href="/print">Print</a>
            </li> -->
		</ul>
	</nav>
	<label class="theme" for="theme-toggle">
		<input type="checkbox" id="theme-toggle" bind:checked={$darkTheme} />
		<div class="slider round" class:dark-theme={$darkTheme} class:light-theme={!$darkTheme} />
	</label>
</header>

<style lang="scss">
	header {
		view-transition-name: header;
		justify-content: space-between;
		padding: 0 0.5rem;
		z-index: 1;
		position: sticky;
		top: 0;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 48px;
		min-height: 48px;
	}
	button.menu {
		justify-content: center;
		background: transparent;
		border: none;
		width: 3rem;
		height: 3rem;
		font-size: 2rem;
		gap: 0;
	}
	a.title {
		font-size: 1.75rem;
	}
	ul {
		padding: 0;
		gap: 0.5rem;
	}
	li {
		margin: 0;
	}
	/* theme toggle */
	.theme {
		display: inline-block;
		height: calc(1.5rem + 2px);
		position: relative;
		width: calc(2.75rem + 2px);

		input {
			display: none;
		}
	}
	.slider {
		bottom: 0;
		cursor: pointer;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		transition: 0.4s;
		border: 1px solid #ccc;
		border-radius: 1.5rem;
		&.dark-theme {
			background-color: #2b2b2b;
			&:before {
				box-shadow: inset 0.35rem -0.25rem 0 0.01rem #f3d076;
				background-color: transparent;
				bottom: 0.125rem;
				left: 0.125rem;
				content: ' ';
				height: 1.25rem;
				width: 1.25rem;
				position: absolute;
				transition: 0.4s;
			}
		}
		&.light-theme:before {
			background-color: #f3d076;
			background-image: radial-gradient(#f3d076, orange);
			border: 1px dashed orange;
			box-sizing: border-box;
			bottom: 0.125rem;
			left: 0.125rem;
			content: ' ';
			height: 1.25rem;
			width: 1.25rem;
			position: absolute;
			transition: 0.4s;
		}
	}
	.slider {
		border-radius: 1.5rem;

		&:before,
		&:after {
			border-radius: 50%;
		}
	}
	input:checked + .slider {
		background-color: #2b2b2b;

		&:before,
		&:after {
			transform: translateX(1.25rem);
		}
	}
	/* end theme toggle */
	@media print {
		header {
			display: none;
		}
	}
</style>
