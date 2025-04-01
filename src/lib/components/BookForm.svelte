<script lang="ts">
	let title = '';
	let author = '';
	let description = '';
	let cover_url = '';

	async function handleSubmit() {
		const res = await fetch('/api/books', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, author, description, cover_url })
		});

		if (res.ok) {
			title = author = description = cover_url = '';
			location.reload();
		} else {
			alert('Error adding book');
		}
	}

	async function fetchFromOpenLibrary() {
		if (!title.trim()) {
			alert('Please enter a book title to search.');
			return;
		}

		try {
			const res = await fetch(`/api/openlibrary?title=${encodeURIComponent(title)}`);
			if (res.ok) {
				const data = await res.json();
				if (data.author) author = data.author;
				if (data.cover_url) cover_url = data.cover_url;
			} else {
				alert('Book not found in OpenLibrary');
			}
		} catch (err) {
			alert('Error while accessing external API');
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="book-form">
	<input type="text" bind:value={title} placeholder="Book title" required />
	<button type="button" on:click={fetchFromOpenLibrary}>🔍 Search by title</button>
	<input type="text" bind:value={author} placeholder="Author" required />
	<input type="text" bind:value={cover_url} placeholder="Cover URL (optional)" />
	<textarea bind:value={description} placeholder="Description"></textarea>
	<button type="submit">➕ Add book</button>
</form>

<style>
	.book-form {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-bottom: 2rem;
	}
	input, textarea {
		padding: 0.6rem;
		font-size: 1rem;
		border-radius: 6px;
		border: 1px solid #ccc;
	}
	button {
		font-weight: bold;
		cursor: pointer;
		border-radius: 6px;
		padding: 0.8rem;
		border: none;
		color: white;
		transition: background 0.2s ease;
	}

	button[type="submit"] {
		background: #4caf50;
	}

	button[type="button"] {
		background: #1976d2;
	}
</style>
