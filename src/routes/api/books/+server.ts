import { json } from '@sveltejs/kit';
import { pool } from '$db/connect';
import { v4 as uuidv4 } from 'uuid';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET() {
	try {
		const [rows] = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
		return json(rows);
	} catch (error) {
		console.error('GET /api/books error:', error);
		return new Response(JSON.stringify({ error: error.message }), { 
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function POST({ request }: RequestEvent) {
	try {
		const data = await request.json();
		const { title, author, description, cover_url, rating } = data;

	
		if (!title?.trim() || !author?.trim()) {
			return new Response('Title and author are required', { status: 400 });
		}

		if (rating !== null && rating !== undefined && (rating < 1 || rating > 5)) {
			return new Response('Rating must be between 1 and 5', { status: 400 });
		}

		const id = uuidv4();

		await pool.query(
			'INSERT INTO books (id, title, author, description, cover_url, rating, date_rated) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[
				id, 
				title.trim(), 
				author.trim(), 
				description?.trim() || '', 
				cover_url?.trim() || '',
				rating || null,
				rating ? new Date() : null
			]
		);

		console.log('Book added successfully:', { title, author, rating });
		return json({ success: true, id });

	} catch (error) {
		console.error('POST /api/books error:', error);
		return new Response(`Database error: ${error.message}`, { status: 500 });
	}
}