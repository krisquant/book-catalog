<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let book: Record<string, string> | null = null;
	$: id = $page.params.id;

	onMount(async () => {
		const res = await fetch(`/api/books/${id}`);
		if (res.ok) {
			book = await res.json();
		} else {
			alert('Book not found');
			goto('/books');
		}
	});

	async function deleteBook() {
		if (confirm('Are you sure you want to delete this book?')) {
			const res = await fetch(`/api/books/${id}`, {
				method: 'DELETE'
			});
			if (res.ok) {
				alert('Book deleted');
				goto('/books');
			} else {
				alert('Error deleting book');
			}
		}
	}
</script>

{#if book}
	<main class="book-detail">
		<h1>{book.title}</h1>
		<img src={book.cover_url || 'https://via.placeholder.com/150'} alt={`Cover of ${book.title}`} />
		<p><strong>Author:</strong> {book.author}</p>
		<p class="desc">{book.description}</p>

		<div class="actions">
			<button on:click={() => goto('/books')}>⬅ Back</button>
			<button class="edit" on:click={() => goto(`/books/${id}/edit`)}>✏️ Edit</button>
			<button class="danger" on:click={deleteBook}>🗑 Delete</button>
		</div>
	</main>
{:else}
	<p class="loading">Loading...</p>
{/if}

<style>
	.book-detail {
		padding: 2rem;
		max-width: 700px;
		margin: auto;
		text-align: center;
		background-color: #fdfdfd;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}
	h1 {
		margin-bottom: 1rem;
	}
	img {
		max-width: 200px;
		border-radius: 8px;
		margin: 1rem 0;
	}
	.desc {
		color: #444;
		margin: 1rem 0 2rem;
	}
	.actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	button {
		padding: 0.6rem 1.2rem;
		border-radius: 6px;
		font-weight: bold;
		cursor: pointer;
		color: white;
	}
	button.edit {
		background-color: #1976d2;
	}
	button.danger {
		background-color: #e53935;
	}
	button:not(.danger):not(.edit) {
		background-color: #444;
	}
	.loading {
		text-align: center;
		margin-top: 3rem;
	}
</style>
