import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

export const pool: Pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'your_new_password',
	database: 'book_catalog',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});
