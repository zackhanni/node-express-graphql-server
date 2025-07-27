# README

This project serves as a personal GraphQL refresher and demo for showcasing practical API design skills. It’s a great base for building more complex applications with real data sources.

---

## 📚 GraphQL Books & Authors API

A simple yet powerful mock API built with **Node.js**, **Express**, and **GraphQL** to demonstrate core skills in backend architecture, schema design, and API querying/mutation using mock data.

This project serves as a hands-on refresher and portfolio piece that highlights how to:

- Build a GraphQL schema with nested relationships
- Handle queries and mutations
- Support partial updates
- Structure scalable code in Express

---

## 🚀 Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **express-graphql** — GraphQL HTTP middleware
- **GraphQL.js** — Schema and resolver tools
- **In-memory mock data** — Easily replaceable with real databases

---

## 🧠 Features

- Query a list of books or authors
- View nested relationships (books → authors, authors → books)
- Add or edit books and authors via mutations
- Partially update fields (e.g., change only the author of a book)
- GraphiQL in-browser IDE for testing

---

## 🔧 Getting Started

1. **Install dependencies**

   ```
   npm install
   ```

2. **Start the server**

   ```
   npm run devStart
   ```

3. **Visit the GraphQL playground**

   ```
   http://localhost:5050/graphql
   ```

---

## 📬 Example Queries

### 📖 Get all books and their authors

```graphql
{
  books {
    id
    name
    author {
      name
    }
  }
}
```

### ✍️ Get all authors and the books they've written

```graphql
{
  authors {
    id
    name
    books {
      name
    }
  }
}
```

### 🔍 Get a single book

```graphql
{
  book(id: 1) {
    id
    name
    author {
      name
    }
  }
}
```

---

## ✏️ Example Mutations

### ➕ Add a new book

```graphql
mutation {
  addBook(name: "New Book Title", authorId: 1) {
    id
    name
  }
}
```

### 👤 Add a new author

```graphql
mutation {
  addAuthor(name: "New Author") {
    id
    name
  }
}
```

### 🛠 Update a book (e.g. change author only)

```graphql
mutation {
  editBook(id: 1, authorId: 3) {
    id
    name
    author {
      name
    }
  }
}
```

### 📝 Edit an author's name

```graphql
mutation {
  editAuthor(id: 2, name: "Updated Author Name") {
    id
    name
  }
}
```

---

## 🗃 Sample Data

This project uses hardcoded mock data. Example books and authors include:

- J. K. Rowling → _Harry Potter series_
- J. R. R. Tolkien → _Lord of the Rings_
- Brent Weeks → _Night Angel trilogy_

---

## 🧩 Potential Improvements

- Add `deleteBook` / `deleteAuthor` mutations
- Add input validation and error handling
- Replace mock data with a real database (MongoDB, PostgreSQL, etc.)
- Add filtering or pagination to queries

---
