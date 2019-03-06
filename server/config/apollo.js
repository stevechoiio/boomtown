const { ApolloServer } = require('apollo-server-express');
const { apolloUploadExpress } = require('apollo-upload-server');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('../api/schema');
let resolvers = require('../api/resolvers');

module.exports = ({ app, pgResource }) => {
  resolvers = resolvers(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      const tokenName = app.get('JWT_COOKIE_NAME');
      const token = req ? req.cookies[tokenName] : undefined;

      return {
        token,
        pgResource,
        req
      };
    },
    schema
  });

  apolloServer.applyMiddleware({
    app,
    uploads: true,

    cors: {
      origin: 'http://localhost:3000',
      credentials: true
    },
    uploads: apolloUploadExpress({
      maxFileSize: 10000000 // 10mb
    })
  });
};
