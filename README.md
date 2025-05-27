BookCatalog – Personal Book Management App
A web-based application to catalog your favorite books with CRUD features and OpenLibrary integration. Built with SvelteKit and TypeScript.

Features

1 - Browse your custom book collection

2 - Add new books (title, author, description, cover)

3 - Edit existing book info

4 - Delete books

5 - Search book info using OpenLibrary API

6 - Automatic cover image and author lookup

7 - Intuitive interface in English

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Components (9 custom)
Navbar.svelte – Navigation bar

BookCard.svelte – Card UI for each book

BookForm.svelte – Form to add/search books

+page.svelte – Books list page

+page.svelte – Book details page ([id])

+page.svelte – Book edit page ([id]/edit)

routes/+page.svelte – Home route

connect.ts – DB connection handler

index.ts – Type index helper

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

API Endpoints (5 total)
Internal:
GET /api/books – fetch all books

POST /api/books – add a book

GET /api/books/:id – fetch by id

PUT /api/books/:id – update book

DELETE /api/books/:id – remove book

External:
GET /api/openlibrary?title=...
→ fetch book data from OpenLibrary

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Tech Stack
⚙ SvelteKit

🧙 TypeScript

🗄 MySQL (via Pool)

🔌 RESTful APIs

📡 External API: OpenLibrary

🎨 Tailwind-ready CSS layout

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


💻 How to Run

npm install        # install dependencies
npm run dev        # run dev server

Visit: http://localhost:5173

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

How it works
🔐 Add a book manually OR

🔍 Use search – type title & click "Search by title"
→ auto-fills author + cover

🖋 You can edit or delete each book

📖 All books shown as responsive cards

🔄 All updates happen in real-time (location.reload)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

✅ Meets Project Requirements:

☑ 9 Custom components

☑ 3+ Pages (/, /books, /books/[id], /books/[id]/edit)

☑ 4+ API endpoints, including external API

☑ Real DB interaction

☑ English interface

☑ Clear UX for full CRUD

☑ RESTful structure

☑ External API displayed via UI (not just URL)