// src/routes/api/openlibrary/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ url }: RequestEvent) {
	const title = url.searchParams.get('title');

	if (!title) {
		return new Response('Title is required', { status: 400 });
	}

	const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
	if (!res.ok) {
		return new Response('Error fetching data', { status: 500 });
	}

	const data = await res.json();

	if (!data.docs || data.docs.length === 0) {
		return new Response('No results found', { status: 404 });
	}

	const book = data.docs[0];

	const result = {
		title: book.title,
		author: book.author_name?.[0] || 'Неизвестен',
		cover_url: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : ''
	};

	return json(result);
}
