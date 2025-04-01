<script lang="ts">
  export let id: string;
  export let title: string;
  export let author: string;
  export let description: string;
  export let cover_url: string;
</script>

<a class="card" href={`/books/${id}`}>
  <img src={cover_url || 'https://via.placeholder.com/150'} alt={`Cover of ${title}`} />
  <div class="info">
    <h2>{title}</h2>
    <p><strong>{author}</strong></p>
    <p class="desc">{description}</p>
  </div>
</a>

<style>
  .card {
    display: flex;
    gap: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin-bottom: 1rem;
    background-color: #fdfdfd;
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.2s ease;
  }

  .card:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  img {
    width: 100px;
    height: 150px;
    object-fit: cover;
    border-radius: 6px;
  }

  .info {
    flex: 1;
  }

  .desc {
    color: #555;
    margin-top: 0.5rem;
    font-size: 0.95rem;
    line-height: 1.4;
  }
</style>
