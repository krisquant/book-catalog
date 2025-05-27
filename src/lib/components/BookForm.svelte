<script lang="ts">
	let title = '';
	let author = '';
	let description = '';
	let cover_url = '';
	let rating = 0;
	let isLoading = false;
	let isSearching = false;
	let message = '';
	let messageType = '';

	function showMessage(text: string, type: 'success' | 'error') {
		message = text;
		messageType = type;
		setTimeout(() => {
			message = '';
			messageType = '';
		}, 4000);
	}

	function setRating(stars: number) {
		rating = stars;
	}

	async function handleSubmit() {
		if (!title.trim() || !author.trim()) {
			showMessage('Title and author are required', 'error');
			return;
		}

		isLoading = true;
		
		try {
			const res = await fetch('/api/books', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					title: title.trim(), 
					author: author.trim(), 
					description: description.trim(), 
					cover_url: cover_url.trim(),
					rating: rating || null
				})
			});

			if (res.ok) {
				title = author = description = cover_url = '';
				rating = 0;
				showMessage('Book added successfully!', 'success');
				window.dispatchEvent(new CustomEvent('bookAdded'));
			} else {
				const errorText = await res.text();
				showMessage(`Error: ${errorText}`, 'error');
			}
		} catch (error) {
			showMessage('Network error. Please try again.', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function fetchFromOpenLibrary() {
		if (!title.trim()) {
			showMessage('Enter a book title first', 'error');
			return;
		}

		isSearching = true;

		try {
			const res = await fetch(`/api/openlibrary?title=${encodeURIComponent(title.trim())}`);
			if (res.ok) {
				const data = await res.json();
				
				if (data.title) title = data.title;
				if (data.author) author = data.author;
				if (data.cover_url) cover_url = data.cover_url;
				
				showMessage('Book info found and filled!', 'success');
			} else {
				showMessage('Book not found. Add manually.', 'error');
			}
		} catch (error) {
			showMessage('Search failed. Add manually.', 'error');
		} finally {
			isSearching = false;
		}
	}
</script>

<div class="form-container">
	<div class="form-header">
		<h2>Add New Book</h2>
		<p>Add books to your personal library</p>
	</div>


	{#if message}
		<div class="message {messageType}">
			{#if messageType === 'success'}✅{:else}❌{/if}
			{message}
		</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit} class="book-form">
		<div class="form-group">
			<label for="title">Book Title *</label>
			<div class="input-group">
				<input 
					id="title"
					type="text" 
					bind:value={title} 
					placeholder="Enter book title" 
					required 
					disabled={isLoading}
				/>
				<button 
					type="button" 
					on:click={fetchFromOpenLibrary}
					disabled={isSearching || isLoading || !title.trim()}
					class="btn btn-secondary search-btn"
				>
					{#if isSearching}
						 Searching...
					{:else}
						 Auto-fill
					{/if}
				</button>
			</div>
			<small class="help-text">
				 Tip: Enter partial title like "rich father" and click Auto-fill to get the complete book details
			</small>
		</div>
		
		<div class="form-group">
			<label for="author">Author *</label>
			<input 
				id="author"
				type="text" 
				bind:value={author} 
				placeholder="Enter author name" 
				required 
				disabled={isLoading}
			/>
		</div>
		
		<div class="form-group">
			<label for="cover_url">Cover Image URL</label>
			<input 
				id="cover_url"
				type="url" 
				bind:value={cover_url} 
				placeholder="https://example.com/book-cover.jpg" 
				disabled={isLoading}
			/>
		</div>

	
		<div class="form-group">
			<label>Rating (Optional)</label>
			<div class="rating-section">
				<div class="stars">
					{#each [1, 2, 3, 4, 5] as star}
						<button
							type="button"
							class="star"
							class:filled={star <= rating}
							on:click={() => setRating(star)}
							disabled={isLoading}
						>
							⭐
						</button>
					{/each}
				</div>
				<span class="rating-text">
					{#if rating === 0}
						No rating
					{:else if rating === 1}
						⭐ Poor
					{:else if rating === 2}
						⭐⭐ Fair
					{:else if rating === 3}
						⭐⭐⭐ Good
					{:else if rating === 4}
						⭐⭐⭐⭐ Very Good
					{:else if rating === 5}
						⭐⭐⭐⭐⭐ Excellent
					{/if}
				</span>
				{#if rating > 0}
					<button
						type="button"
						class="clear-rating"
						on:click={() => setRating(0)}
						disabled={isLoading}
					>
						Clear
					</button>
				{/if}
			</div>
		</div>
		
		<div class="form-group">
			<label for="description">Description</label>
			<textarea 
				id="description"
				bind:value={description} 
				placeholder="Enter book description (optional)"
				disabled={isLoading}
				rows="3"
			></textarea>
		</div>
		
		<div class="form-actions">
			<button 
				type="submit" 
				disabled={isLoading || !title.trim() || !author.trim()}
				class="btn btn-primary submit-btn"
			>
				{#if isLoading}
					Adding Book...
				{:else}
					Add Book
				{/if}
			</button>
		</div>
	</form>
</div>

<style>
	.form-container {
		background: #ffffff;
		border-radius: 0.75rem;
		padding: 2rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
		margin-bottom: 2rem;
	}

	.form-header {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.form-header h2 {
		margin-bottom: 0.5rem;
		color: #111827;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.form-header p {
		color: #4b5563;
		margin: 0;
	}

	.message {
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		margin-bottom: 1.5rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.message.success {
		background: #f0fdf4;
		color: #166534;
		border: 1px solid #bbf7d0;
	}

	.message.error {
		background: #fef2f2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	.book-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 500;
		color: #374151;
		font-size: 0.875rem;
	}

	.input-group {
		display: flex;
		gap: 0.75rem;
	}

	.input-group input {
		flex: 1;
	}

	input, textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		transition: border-color 0.2s;
		font-family: inherit;
	}

	input:focus, textarea:focus {
		outline: none;
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.search-btn {
		white-space: nowrap;
		min-width: 120px;
		background: #ffffff;
		color: #374151;
		border: 1px solid #d1d5db;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
	}

	.search-btn:hover:not(:disabled) {
		background: #f9fafb;
		border-color: #9ca3af;
	}

	.search-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.help-text {
		font-size: 0.75rem;
		color: #6b7280;
		font-style: italic;
		margin-top: 0.25rem;
	}

	/* Rating Styles */
	.rating-section {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem;
		background: #f9fafb;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.stars {
		display: flex;
		gap: 0.25rem;
	}

	.star {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		transition: all 0.2s;
		opacity: 0.3;
		padding: 0.25rem;
		border-radius: 0.25rem;
	}

	.star:hover,
	.star.filled {
		opacity: 1;
		transform: scale(1.1);
	}

	.star:disabled {
		cursor: not-allowed;
		transform: none;
	}

	.rating-text {
		font-size: 0.875rem;
		color: #4b5563;
		font-weight: 500;
		min-width: 120px;
	}

	.clear-rating {
		background: none;
		border: none;
		color: #6b7280;
		font-size: 0.75rem;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		transition: color 0.2s;
	}

	.clear-rating:hover {
		color: #374151;
		background: #e5e7eb;
	}

	textarea {
		resize: vertical;
		min-height: 80px;
	}

	.form-actions {
		margin-top: 1rem;
	}

	.submit-btn {
		width: 100%;
		padding: 1rem;
		font-size: 1rem;
		font-weight: 600;
		background: #2563eb;
		color: #ffffff;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.submit-btn:hover:not(:disabled) {
		background: #1d4ed8;
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.form-container {
			padding: 1.5rem;
		}
		
		.input-group {
			flex-direction: column;
		}
		
		.search-btn {
			min-width: auto;
		}

		.rating-section {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}

		.rating-text {
			min-width: auto;
		}
	}
</style>