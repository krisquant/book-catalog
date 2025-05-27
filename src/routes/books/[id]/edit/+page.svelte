<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let id = '';
	let title = '';
	let author = '';
	let description = '';
	let cover_url = '';

	$: id = $page.params.id;

	onMount(async () => {
		const res = await fetch(`/api/books/${id}`);
		if (res.ok) {
			const data = await res.json();
			title = data.title;
			author = data.author;
			description = data.description;
			cover_url = data.cover_url;
		} else {
			alert('Book not found');
			goto('/books');
		}
	});

	async function handleSubmit() {
		const res = await fetch(`/api/books/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, author, description, cover_url })
		});

		if (res.ok) {
			goto(`/books/${id}`);
		} else {
			alert('Error saving changes');
		}
	}
</script>

<main class="edit-page">
	<h1>✏️ Edit book</h1>

	<form on:submit|preventDefault={handleSubmit} class="edit-form">
		<input type="text" bind:value={title} placeholder="Book title" required />
		<input type="text" bind:value={author} placeholder="Author" required />
		<input type="text" bind:value={cover_url} placeholder="Cover URL" />
		<textarea bind:value={description} placeholder="Description"></textarea>
		<button type="submit">Save changes</button>
	</form>
</main>

<style>
	.edit-page {
		padding: 2rem;
		max-width: 700px;
		margin: auto;
	}

	.edit-form {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	input, textarea {
		padding: 0.6rem;
		font-size: 1rem;
		border-radius: 6px;
		border: 1px solid #ccc;
	}

	button {
		background: #1976d2;
		color: white;
		padding: 0.8rem;
		font-weight: bold;
		cursor: pointer;
		border-radius: 6px;
	}
</style>
