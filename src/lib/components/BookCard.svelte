<script lang="ts">
  export let id: string;
  export let title: string;
  export let author: string;
  export let description: string;
  export let cover_url: string;
  export let rating: number | null = null;

  function truncateText(text: string, maxLength: number = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/120x180/f3f4f6/6b7280?text=📚';
  }

  function renderStars(rating: number | null): string {
    if (!rating) return '';
    return '⭐'.repeat(rating);
  }
</script>

<article class="book-card">
  <a href={`/books/${id}`} class="card-link">
    <div class="card-image">
      <img 
        src={cover_url || 'https://via.placeholder.com/120x180/f3f4f6/6b7280?text=📚'} 
        alt={`Cover of ${title}`}
        on:error={handleImageError}
        loading="lazy"
      />
    
      {#if rating}
        <div class="rating-badge">
          {renderStars(rating)}
        </div>
      {/if}
    </div>
    
    <div class="card-content">
      <h3 class="book-title">{title}</h3>
      <p class="book-author">by {author}</p>
     
      {#if rating}
        <div class="rating-display">
          <span class="stars">{renderStars(rating)}</span>
          <span class="rating-text">({rating}/5)</span>
        </div>
      {:else}
        <div class="no-rating">
          <span class="no-rating-text">Not rated</span>
        </div>
      {/if}
      
      {#if description}
        <p class="book-description">{truncateText(description)}</p>
      {/if}
      
      <div class="card-footer">
        <span class="read-more">View Details →</span>
      </div>
    </div>
  </a>
</article>

<style>
  .book-card {
    background: #ffffff;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .book-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-link {
    text-decoration: none;
    color: inherit;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .card-image {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    padding: 1rem;
    position: relative;
  }

  .card-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .rating-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .card-content {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .book-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.3;
    color: #111827;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .book-author {
    color: #4b5563;
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  .rating-display {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    background: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }

  .stars {
    font-size: 1rem;
    line-height: 1;
  }

  .rating-text {
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 500;
  }

  .no-rating {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    background: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }

  .no-rating-text {
    font-size: 0.75rem;
    color: #9ca3af;
    font-style: italic;
  }

  .book-description {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
  }

  .card-footer {
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid #f3f4f6;
  }

  .read-more {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.875rem;
    transition: color 0.2s;
  }

  .book-card:hover .read-more {
    color: #1d4ed8;
  }

  @media (max-width: 768px) {
    .card-image {
      height: 150px;
    }
    
    .card-content {
      padding: 1rem;
    }

    .rating-display {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
</style>