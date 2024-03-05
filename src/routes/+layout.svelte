<script>
	import '../styles/app.css';
</script>

<div class="flex column main-container">
	<nav>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/template">+ Template</a>
			</li>
		</ul>
	</nav>
	<main class="flex column">
		<slot />
	</main>
</div>

<style>
	.main-container {
		height: 100vh;
	}
	main {
		flex-grow: 1;
	}
</style>
