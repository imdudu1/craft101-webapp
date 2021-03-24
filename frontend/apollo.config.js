module.exports = {
  client: {
    include: ['./src/**/*.{tsx,ts}'],
    exclude: ['./node_modules'],
    tagName: 'gql',
    service: {
      name: 'craft101-apollo-service',
      url: 'http://localhost:4000/graphql',
    },
  },
};
