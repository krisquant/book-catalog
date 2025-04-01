<script>
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<main class="books-page">
	<h1>📚 Welcome to BookCatalog</h1>
	<p>Your personal library starts here. Add your first book now!</p>
</main>

<style>
	.books-page {
		padding: 2rem;
	}
	h1 {
		text-align: center;
		margin-bottom: 1rem;
	}
</style>
