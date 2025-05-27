<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import BookCard from '$lib/components/BookCard.svelte';
	import { onMount } from 'svelte';

	let books: any[] = [];
	let loading = false;
	let searchQuery = '';
	let errorMessage = '';


	$: filteredBooks = books.filter(book => 
		searchQuery === '' || 
		book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
		(book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	async function loadBooks() {
		loading = true;
		errorMessage = '';
		
		try {
			const res = await fetch('/api/books');
			if (res.ok) {
				books = await res.json();
			} else {
				errorMessage = 'Failed to load books';
				books = [];
			}
		} catch (error) {
			errorMessage = 'Network error. Please check your connection.';
			books = [];
		} finally {
			loading = false;
		}
	}

	function clearSearch() {
		searchQuery = '';
	}

	function handleBookAdded() {
		loadBooks();
	}

	onMount(() => {
		loadBooks();
		window.addEventListener('bookAdded', handleBookAdded);
		
		return () => {
			window.removeEventListener('bookAdded', handleBookAdded);
		};
	});
</script>

<Navbar />

<main class="homepage">
	<div class="container">
		<div class="page-header">
			<h1>My Book Library</h1>
			<p>Discover and explore your personal book collection</p>
			<a href="/books" class="btn btn-primary add-book-btn">
				➕ Add New Book
			</a>
		</div>

		
		<div class="search-section">
			<div class="search-bar">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search books by title, author, or description..."
					class="search-input"
				/>
				{#if searchQuery}
					<button on:click={clearSearch} class="clear-btn">
						Clear
					</button>
				{/if}
			</div>
			
			{#if searchQuery}
				<p class="search-results">
					Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} matching "{searchQuery}"
				</p>
			{/if}
		</div>

	
		{#if errorMessage}
			<div class="error-message">
				❌ {errorMessage}
			</div>
		{/if}

	
		{#if loading}
			<div class="loading">
				<div class="loading-spinner"></div>
				<p>Loading your books...</p>
			</div>
		{:else if filteredBooks.length === 0}
			<div class="empty-state">
				{#if searchQuery}
					<div class="empty-icon">🔍</div>
					<h3>No books found</h3>
					<p>No books match your search for "{searchQuery}"</p>
					<button on:click={clearSearch} class="btn btn-primary">
						Show all books
					</button>
				{:else}
					<div class="empty-icon">📚</div>
					<h3>Your library is empty</h3>
					<p>Start building your collection by adding your first book!</p>
					<a href="/books" class="btn btn-primary">
						➕ Add Your First Book
					</a>
				{/if}
			</div>
		{:else}
			
			<div class="library-stats">
				<div class="stat">
					<span class="stat-number">{books.length}</span>
					<span class="stat-label">Total Books</span>
				</div>
				<div class="stat">
					<span class="stat-number">{books.filter(book => book.rating).length}</span>
					<span class="stat-label">Rated Books</span>
				</div>
				<div class="stat">
					<span class="stat-number">{books.filter(book => book.rating === 5).length}</span>
					<span class="stat-label">5-Star Books</span>
				</div>
			</div>

		
			<div class="books-grid">
				{#each filteredBooks as book}
					<BookCard
						id={book.id}
						title={book.title}
						author={book.author}
						description={book.description}
						cover_url={book.cover_url}
						rating={book.rating}
					/>
				{/each}
			</div>

		
			<div class="results-summary">
				Showing {filteredBooks.length} of {books.length} books
			</div>
		{/if}
	</div>
</main>

<style>
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		line-height: 1.6;
		color: #1f2937;
		background: #f9fafb;
		margin: 0;
		padding: 0;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-weight: 600;
		line-height: 1.3;
		color: #111827;
	}

	:global(.btn) {
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

	:global(.btn-primary) {
		background: #2563eb;
		color: #ffffff;
	}

	:global(.btn-primary:hover) {
		background: #1d4ed8;
	}

	.homepage {
		min-height: 100vh;
		padding: 2rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.page-header {
		text-align: center;
		margin-bottom: 2rem;
		padding: 2rem 0;
	}

	.page-header h1 {
		font-size: 2.25rem;
		margin-bottom: 0.75rem;
		color: #111827;
	}

	.page-header p {
		color: #4b5563;
		font-size: 1.125rem;
		margin-bottom: 1.5rem;
	}

	.add-book-btn {
		font-size: 1rem;
		padding: 1rem 2rem;
	}

	.search-section {
		background: #ffffff;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
	}

	.search-bar {
		display: flex;
		gap: 0.75rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.search-input {
		flex: 1;
		padding: 0.75rem 1rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	.search-input:focus {
		border-color: #2563eb;
		outline: none;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.clear-btn {
		padding: 0.75rem 1rem;
		background: #f3f4f6;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.2s;
		font-size: 0.875rem;
		color: #374151;
	}

	.clear-btn:hover {
		background: #e5e7eb;
	}

	.search-results {
		text-align: center;
		margin-top: 1rem;
		color: #4b5563;
		font-style: italic;
		margin-bottom: 0;
	}

	.error-message {
		background: #fef2f2;
		color: #dc2626;
		padding: 1rem;
		border-radius: 0.5rem;
		margin-bottom: 1.5rem;
		border: 1px solid #fecaca;
		text-align: center;
	}

	.loading {
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

	.empty-state {
		text-align: center;
		padding: 3rem 1.5rem;
		background: #ffffff;
		border-radius: 0.75rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		opacity: 0.7;
	}

	.empty-state h3 {
		color: #374151;
		margin-bottom: 0.5rem;
		font-size: 1.25rem;
	}

	.empty-state p {
		color: #6b7280;
		margin-bottom: 1.5rem;
	}

	.library-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat {
		background: #ffffff;
		padding: 1.5rem;
		border-radius: 0.75rem;
		text-align: center;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
	}

	.stat-number {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: #2563eb;
		margin-bottom: 0.25rem;
	}

	.stat-label {
		font-size: 0.875rem;
		color: #6b7280;
		font-weight: 500;
	}

	.books-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.results-summary {
		text-align: center;
		color: #6b7280;
		font-size: 0.875rem;
		padding: 1rem;
		background: #ffffff;
		border-radius: 0.5rem;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		border: 1px solid #e5e7eb;
	}

	@media (max-width: 768px) {
		.homepage {
			padding: 1.5rem 0;
		}
		
		.page-header {
			margin-bottom: 1.5rem;
			padding: 1.5rem 0;
		}

		.page-header h1 {
			font-size: 1.875rem;
		}
		
		.search-section {
			padding: 1rem;
		}
		
		.search-bar {
			flex-direction: column;
		}
		
		.books-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		
		.loading {
			padding: 2rem;
		}

		.library-stats {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.75rem;
		}

		.stat {
			padding: 1rem;
		}

		.stat-number {
			font-size: 1.5rem;
		}

		.container {
			padding: 0 0.75rem;
		}
	}
</style>