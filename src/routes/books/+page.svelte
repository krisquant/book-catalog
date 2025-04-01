<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import BookCard from '$lib/components/BookCard.svelte';
	import BookForm from '$lib/components/BookForm.svelte';
	import { onMount } from 'svelte';

	let books: any[] = [];

	onMount(async () => {
		const res = await fetch('/api/books');
		books = await res.json();
	});
</script>

<Navbar />

<main class="books-page">
	<h1>📚 Book Catalog</h1>

	<BookForm />

	{#if books.length === 0}
		<p class="empty">No books to display.</p>
	{:else}
		{#each books as book}
			<BookCard
				id={book.id}
				title={book.title}
				author={book.author}
				description={book.description}
				cover_url={book.cover_url}
			/>
		{/each}
	{/if}
</main>

<style>
	.books-page {
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.empty {
		text-align: center;
		margin-top: 2rem;
		color: #777;
	}
</style>
