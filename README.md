# Book Catalog – Homework for Web Programming 2 Class

## Author:

- Name: Mikula Kristian
- Neptun ID: ETBCOM

---

## Homework Information:

This is a book catalog application that allows users to manage their personal book collection. The project includes CRUD features and integrates with the OpenLibrary API for book data.

---

## Features:

1. Browse your custom book collection.
2. Add new books (title, author, description, cover).
3. Edit existing book information.
4. Delete books.
5. Search book information using the OpenLibrary API.
6. Automatic cover image and author lookup.
7. Intuitive interface in English.

---

## Components (9 Custom):

1. **Navbar.svelte** – Navigation bar.
2. **BookCard.svelte** – Card UI for each book.
3. **BookForm.svelte** – Form to add/search books.
4. **+page.svelte** – Books list page.
5. **+page.svelte** – Book details page ([id]).
6. **+page.svelte** – Book edit page ([id]/edit).
7. **routes/+page.svelte** – Home route.
8. **connect.ts** – DB connection handler.
9. **index.ts** – Type index helper.

---

## API Endpoints (5 Total):

### Internal:
1. **GET /api/books** – Fetch all books.
2. **POST /api/books** – Add a book.
3. **GET /api/books/:id** – Fetch a book by ID.
4. **PUT /api/books/:id** – Update a book.
5. **DELETE /api/books/:id** – Remove a book.

### External:
1. **GET /api/openlibrary?title=...** – Fetch book data from OpenLibrary.

---

## Tech Stack:

- ⚙ **SvelteKit**
- 🧙 **TypeScript**
- 🗄 **MySQL (via Pool)**
- 🔌 **RESTful APIs**
- 📡 **External API: OpenLibrary**
- 🎨 **Tailwind-ready CSS layout**

---

## How to Run the Project:

1. Clone the repository:
   ```sh
   git clone https://github.com/krisquant/book-catalog.git
   cd book-catalog
