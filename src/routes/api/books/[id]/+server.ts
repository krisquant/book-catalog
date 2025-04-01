// src/routes/api/books/[id]/+server.ts
import { json } from '@sveltejs/kit';
import { pool } from '$db/connect';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params }: RequestEvent) {
	const { id } = params;
	const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
	const book = Array.isArray(rows) ? rows[0] : null;

	if (!book) {
		return new Response('Not Found', { status: 404 });
	}

	return json(book);
}

export async function PUT({ params, request }: RequestEvent) {
	const { id } = params;
	const { title, author, description, cover_url } = await request.json();

	try {
		await pool.query(
			'UPDATE books SET title = ?, author = ?, description = ?, cover_url = ? WHERE id = ?',
			[title, author, description, cover_url, id]
		);

		return json({ success: true });
	} catch (error) {
		console.error('Ошибка при обновлении книги:', error);
		return new Response('Ошибка обновления', { status: 500 });
	}
}

export async function DELETE({ params }: RequestEvent) {
	const { id } = params;

	try {
		await pool.query('DELETE FROM books WHERE id = ?', [id]);
		return json({ success: true });
	} catch (error) {
		console.error('Ошибка при удалении книги:', error);
		return new Response('Ошибка удаления', { status: 500 });
	}
}
