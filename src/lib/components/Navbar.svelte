<script>
	import { page } from '$app/stores';
</script>

<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="logo">
			BookCatalog
		</a>
		
		<div class="nav-links">
			<a 
				href="/" 
				class="nav-link"
				class:active={$page.url.pathname === '/'}
			>
				Library/
			</a>
			<a 
				href="/books" 
				class="nav-link"
				class:active={$page.url.pathname === '/books'}
			>
				Add Book
			</a>
		</div>
	</div>
</nav>

<style>
	.navbar {
		background: #ffffff;
		border-bottom: 1px solid #e5e7eb;
		padding: 1rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-size: 1.25rem;
		font-weight: 700;
		color: #111827;
		text-decoration: none;
	}

	.nav-links {
		display: flex;
		gap: 1.5rem;
	}

	.nav-link {
		color: #4b5563;
		font-weight: 500;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		transition: all 0.2s;
		text-decoration: none;
	}

	.nav-link:hover,
	.nav-link.active {
		color: #2563eb;
		background: rgba(37, 99, 235, 0.1);
	}

	@media (max-width: 768px) {
		.nav-container {
			padding: 0 0.75rem;
		}
		
		.logo {
			font-size: 1.125rem;
		}
		
		.nav-links {
			gap: 1rem;
		}
	}
</style>