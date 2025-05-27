
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ url }: RequestEvent) {
	const title = url.searchParams.get('title');

	if (!title) {
		return new Response('Title is required', { status: 400 });
	}

	try {
		const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=5`);
		
		if (!res.ok) {
			return new Response('Error fetching data from OpenLibrary', { status: 500 });
		}

		const data = await res.json();

		if (!data.docs || data.docs.length === 0) {
			return new Response('No results found', { status: 404 });
		}

		
		const book = data.docs[0];

		const result = {
			title: book.title || title, 
			author: book.author_name?.[0] || 'Unknown Author',
			cover_url: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : '',
			publish_year: book.first_publish_year || '',
			publisher: book.publisher?.[0] || '',
			isbn: book.isbn?.[0] || '',
			page_count: book.number_of_pages_median || ''
		};

		console.log('OpenLibrary search result:', {
			searchTerm: title,
			foundTitle: result.title,
			author: result.author
		});

		return json(result);

	} catch (error) {
		console.error('OpenLibrary API error:', error);
		return new Response('Failed to search OpenLibrary', { status: 500 });
	}
}