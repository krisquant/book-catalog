<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import BookForm from '$lib/components/BookForm.svelte';
</script>

<Navbar />

<main class="add-book-page">
	<div class="container">
		<div class="page-header">
			<a href="/" class="back-link">← Back to Library</a>
			<h1>Add New Book</h1>
			<p>Expand your personal library with a new book</p>
		</div>

		<div class="form-section">
			<BookForm />
		</div>

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

	.add-book-page {
		min-height: 100vh;
		padding: 2rem 0;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.page-header {
		text-align: center;
		margin-bottom: 2rem;
		padding: 2rem 0;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		color: #2563eb;
		text-decoration: none;
		font-weight: 500;
		margin-bottom: 1rem;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: all 0.2s;
		background: #ffffff;
		border: 1px solid #e5e7eb;
	}

	.back-link:hover {
		background: #f9fafb;
		color: #1d4ed8;
	}

	.page-header h1 {
		font-size: 2.25rem;
		margin-bottom: 0.75rem;
		color: #111827;
	}

	.page-header p {
		color: #4b5563;
		font-size: 1.125rem;
		margin: 0;
	}

	.form-section {
		margin-bottom: 3rem;
	}

	.tips-section {
		background: #ffffff;
		border-radius: 0.75rem;
		padding: 2rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
	}

	.tips-section h3 {
		text-align: center;
		margin-bottom: 1.5rem;
		color: #374151;
		font-size: 1.25rem;
	}

	.tips-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.tip {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.tip-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
		margin-top: 0.25rem;
	}

	.tip-content h4 {
		font-size: 1rem;
		margin-bottom: 0.5rem;
		color: #374151;
	}

	.tip-content p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.add-book-page {
			padding: 1.5rem 0;
		}
		
		.container {
			padding: 0 0.75rem;
		}
		
		.page-header {
			margin-bottom: 1.5rem;
			padding: 1.5rem 0;
		}

		.page-header h1 {
			font-size: 1.875rem;
		}
		
		.tips-section {
			padding: 1.5rem;
		}
		
		.tips-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		
		.tip {
			flex-direction: column;
			text-align: center;
		}
	}
</style>