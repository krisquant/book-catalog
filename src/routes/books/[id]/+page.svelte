<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let book: any = null;
	let loading = true;
	let error = '';
	let showDeleteConfirm = false;

	$: id = $page.params.id;

	onMount(async () => {
		await loadBook();
	});

	async function loadBook() {
		loading = true;
		error = '';
		
		try {
			const res = await fetch(`/api/books/${id}`);
			if (res.ok) {
				book = await res.json();
			} else {
				error = 'Book not found';
			}
		} catch (err) {
			error = 'Failed to load book';
		} finally {
			loading = false;
		}
	}

	async function deleteBook() {
		try {
			const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
			if (res.ok) {
				goto('/books');
			} else {
				error = 'Failed to delete book';
			}
		} catch (err) {
			error = 'Failed to delete book';
		}
		showDeleteConfirm = false;
	}

	function handleImageError(event: Event) {
		const img = event.target as HTMLImageElement;
		img.src = 'https://via.placeholder.com/300x400/f3f4f6/6b7280?text=📚';
	}
</script>

<Navbar />

<main class="book-details">
	{#if loading}
		<div class="loading">
			<div class="loading-spinner"></div>
			<p>Loading book details...</p>
		</div>
	{:else if error}
		<div class="error">
			<h2>❌ {error}</h2>
			<a href="/books" class="btn btn-primary">← Back to Books</a>
		</div>
	{:else if book}
		<div class="container">
		
			<div class="back-section">
				<button on:click={() => goto('/books')} class="btn btn-secondary">
					← Back to Library
				</button>
			</div>

			
			<div class="book-info">
				<div class="book-cover">
					<img 
						src={book.cover_url || 'https://via.placeholder.com/300x400/f3f4f6/6b7280?text=📚'} 
						alt={`Cover of ${book.title}`}
						on:error={handleImageError}
					/>
				</div>

				<div class="book-details-content">
					<div class="book-header">
						<h1>{book.title}</h1>
						<p class="author">by <strong>{book.author}</strong></p>
						
						{#if book.created_at}
							<p class="added-date">
								 Added on {new Date(book.created_at).toLocaleDateString()}
							</p>
						{/if}
					</div>

					{#if book.description}
						<div class="description-section">
							<h3> Description</h3>
							<p class="description">{book.description}</p>
						</div>
					{:else}
						<div class="no-description">
							<p>No description available</p>
						</div>
					{/if}

				
					<div class="actions">
						<a href={`/books/${id}/edit`} class="btn btn-primary">
							 Edit Book
						</a>
						<button 
							on:click={() => showDeleteConfirm = true} 
							class="btn btn-danger"
						>
							Delete Book
						</button>
					</div>

					
					<div class="book-stats">
						<div class="stat">
							<span class="stat-label">Book ID</span>
							<span class="stat-value">{book.id.substring(0, 8)}...</span>
						</div>
						{#if book.cover_url}
							<div class="stat">
								<span class="stat-label">Cover</span>
								<span class="stat-value"> Available</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

{#if showDeleteConfirm}
	<div class="modal-overlay" on:click={() => showDeleteConfirm = false}>
		<div class="modal" on:click|stopPropagation>
			<h3>🗑️ Delete Book</h3>
			<p>Are you sure you want to delete "<strong>{book?.title}</strong>"?</p>
			<p class="warning">This action cannot be undone.</p>
			<div class="modal-actions">
				<button on:click={() => showDeleteConfirm = false} class="btn btn-secondary">
					Cancel
				</button>
				<button on:click={deleteBook} class="btn btn-danger">
					Delete Book
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.book-details {
		min-height: 100vh;
		background: #f9fafb;
		padding: 2rem 0;
	}

	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.loading, .error {
		text-align: center;
		padding: 3rem;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #e5e7eb;
		border-top: 4px solid #2563eb;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.back-section {
		margin-bottom: 2rem;
	}

	.book-info {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 3rem;
		background: white;
		padding: 2rem;
		border-radius: 0.75rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
	}

	.book-cover {
		text-align: center;
	}

	.book-cover img {
		width: 100%;
		max-width: 300px;
		height: auto;
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.book-details-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.book-header h1 {
		font-size: 2rem;
		color: #111827;
		margin-bottom: 0.5rem;
		line-height: 1.2;
	}

	.author {
		font-size: 1.25rem;
		color: #4b5563;
		margin-bottom: 0.5rem;
	}

	.added-date {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
	}

	.description-section h3 {
		color: #374151;
		margin-bottom: 1rem;
		font-size: 1.125rem;
	}

	.description {
		color: #4b5563;
		line-height: 1.7;
		font-size: 1rem;
		margin: 0;
	}

	.no-description {
		color: #9ca3af;
		font-style: italic;
	}

	.actions {
		display: flex;
		gap: 1rem;
		margin-top: auto;
		padding-top: 1rem;
		border-top: 1px solid #e5e7eb;
	}

	.book-stats {
		display: flex;
		gap: 2rem;
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stat-label {
		font-size: 0.75rem;
		color: #6b7280;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.stat-value {
		font-size: 0.875rem;
		color: #374151;
		font-weight: 600;
	}

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background: white;
		padding: 2rem;
		border-radius: 0.75rem;
		max-width: 400px;
		width: 90%;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}

	.modal h3 {
		margin-bottom: 1rem;
		color: #111827;
	}

	.modal p {
		margin-bottom: 1rem;
		color: #4b5563;
	}

	.warning {
		color: #dc2626;
		font-weight: 500;
		font-size: 0.875rem;
	}

	.modal-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 1.5rem;
	}

	/* Button Styles */
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
		text-decoration: none;
	}

	.btn-primary {
		background: #2563eb;
		color: white;
	}

	.btn-primary:hover {
		background: #1d4ed8;
	}

	.btn-secondary {
		background: white;
		color: #374151;
		border: 1px solid #d1d5db;
	}

	.btn-secondary:hover {
		background: #f9fafb;
	}

	.btn-danger {
		background: #dc2626;
		color: white;
	}

	.btn-danger:hover {
		background: #b91c1c;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.book-info {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			padding: 1.5rem;
		}

		.book-cover {
			order: 1;
		}

		.book-details-content {
			order: 2;
		}

		.book-header h1 {
			font-size: 1.5rem;
		}

		.actions {
			flex-direction: column;
		}

		.book-stats {
			flex-direction: column;
			gap: 1rem;
		}

		.modal {
			margin: 1rem;
		}

		.modal-actions {
			flex-direction: column;
		}
	}
</style>