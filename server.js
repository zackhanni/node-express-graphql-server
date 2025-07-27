const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const { books, authors } = require("./mockData");

const app = express();

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "Authors who have written books",
  // use a function to make sure data is is available. both BookType and AuthorType reference each other
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "A single book",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of books",
      resolve: () => books,
    },
    author: {
      type: AuthorType,
      description: "A single author",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of authors",
      resolve: () => authors,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const authorExists = authors.find(
          (author) => author.id === args.authorId
        );
        if (!authorExists) {
          throw new Error(`Author with id ${args.authorId} does not exist`);
        }

        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
    editBook: {
      type: BookType,
      description: "Edit book details",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString }, // Fields are optional for editing
        authorId: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const book = books.find((book) => book.id === args.id);
        if (!book) {
          throw new Error(`Book with id ${args.id} not found`);
        }

        if (args.name !== undefined) {
          book.name = args.name;
        }
        if (args.authorId !== undefined) {
          book.authorId = args.authorId;
        }
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        };
        authors.push(author);
        return author;
      },
    },
    editAuthor: {
      type: AuthorType,
      description: "Edit an author",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const author = authors.find((author) => author.id === args.id);
        if (!author) {
          throw new Error(`Author with id ${args.id} not found`);
        }
        if (args.name !== undefined) {
          author.name = args.name;
        }
        return author;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, // check spelling - with 'i'
  })
);
app.listen(5050, () => {
  console.log("Server running at http://localhost:5050/graphql");
});
