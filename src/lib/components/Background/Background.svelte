<script>
	import { page } from '$app/stores';
	import { darkTheme } from '$lib/store';
</script>

<div class="theme-container flex column" data-theme={$darkTheme ? 'dark' : 'light'}>
	<div class="background light-theme">
		<div class="top-portion" />
		<div class="bottom-portion" />
	</div>
	<div class="background dark-theme">
		<div class="top-portion" />
		<div class="bottom-portion" />
	</div>
</div>

<style lang="scss">
	/* .theme-container[data-theme='dark'] {
		--color: var(--dark-theme-color);
		--background-color: var(--dark-theme-background-color);
		--transparent-background-color: var(--dark-theme-transparent-background-color);
	} */
	.theme-container[data-theme='dark'] {
		.dark-theme {
			opacity: 1;
		}
		.light-theme {
			opacity: 0;
		}
		.bottom-portion {
			background-image: linear-gradient(
				to bottom,
				var(--dark-theme-background-color) 0%,
				var(--dark-theme-color) 100%
			);
		}
	}
	.theme-container[data-theme='light'] {
		.light-theme {
			opacity: 1;
		}
		.dark-theme {
			opacity: 0;
		}
		.bottom-portion {
			background-image: linear-gradient(
				to bottom,
				var(--light-theme-background-color) 0%,
				var(--light-theme-color) 100%
			);
		}
	}
	.background {
		content: ' ';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		max-width: 100vw;
		transition: opacity 150ms ease-in-out;
	}
	@keyframes drift {
		from {
			background-position-x: 0px;
			background-position-y: 0px;
		}
		to {
			background-position-x: var(--graph-unit);
			background-position-y: calc(-2 * var(--graph-unit));
		}
	}
	.top-portion {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 70vh;
		width: 100vw;
		max-width: 100vw;
		background-image: radial-gradient(circle, pink 1px, rgba(0, 0, 0, 0) 1px);
		background-size: var(--graph-unit) var(--graph-unit);
		animation: drift 10000ms infinite linear;
		// transform: rotateZ(22deg);
	}
	.bottom-portion {
		content: ' ';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 30vh;
		width: 100vw;
		max-width: 100vw;
	}
</style>
