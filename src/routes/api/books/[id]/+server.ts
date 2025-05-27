
import { json } from '@sveltejs/kit';
import { pool } from '$db/connect';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params }: RequestEvent) {
	const { id } = params;
	try {
		const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
		const book = Array.isArray(rows) ? rows[0] : null;

		if (!book) {
			return new Response('Not Found', { status: 404 });
		}

		return json(book);
	} catch (error) {
		console.error('GET book error:', error);
		return new Response('Database error', { status: 500 });
	}
}

export async function PUT({ params, request }: RequestEvent) {
	const { id } = params;
	try {
		const { title, author, description, cover_url, rating } = await request.json();

		// Validate rating if provided
		if (rating !== null && rating !== undefined && (rating < 1 || rating > 5)) {
			return new Response('Rating must be between 1 and 5', { status: 400 });
		}

		await pool.query(
			'UPDATE books SET title = ?, author = ?, description = ?, cover_url = ?, rating = ?, date_rated = ? WHERE id = ?',
			[
				title, 
				author, 
				description, 
				cover_url, 
				rating || null,
				rating ? new Date() : null,
				id
			]
		);

		return json({ success: true });
	} catch (error) {
		console.error('PUT book error:', error);
		return new Response('Update failed', { status: 500 });
	}
}

export async function DELETE({ params }: RequestEvent) {
	const { id } = params;
	try {
		await pool.query('DELETE FROM books WHERE id = ?', [id]);
		return json({ success: true });
	} catch (error) {
		console.error('DELETE book error:', error);
		return new Response('Delete failed', { status: 500 });
	}
}