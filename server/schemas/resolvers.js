const resolvers = {
    Query: {
        helloworld: () => {
            return 'Hello world!';
        }
    }
};

module.exports = resolvers;