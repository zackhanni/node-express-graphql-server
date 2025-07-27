const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "HelloWorld",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => "Hello World",
      },
    }),
  }),
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

// https://www.youtube.com/watch?v=ZQL7tL2S0oQ
// 9min 30 seconds
