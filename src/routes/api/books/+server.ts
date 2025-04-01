import { json } from '@sveltejs/kit';
import { pool } from '$db/connect';
import { v4 as uuidv4 } from 'uuid';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET() {
	const [rows] = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
	return json(rows);
}

export async function POST({ request }: RequestEvent) {
	const data = await request.json();
	const { title, author, description, cover_url } = data;
	const id = uuidv4();

	await pool.query(
		'INSERT INTO books (id, title, author, description, cover_url) VALUES (?, ?, ?, ?, ?)',
		[id, title, author, description, cover_url]
	);

	return json({ success: true });
}
