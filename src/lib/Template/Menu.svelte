<div class="flex menu-container">
	<button>xy</button>
	<button>border</button>
	<button>colors</button>
	<button>text</button>
</div>

<style>
	.menu-container {
		padding: 1rem;
		gap: 0.5rem;
	}
	button {
		height: 5rem;
		width: 5rem;
	}
	@media screen and (min-width: 680px) {
		.menu-container {
			flex-direction: column;
		}
	}
</style>
