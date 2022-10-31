const express = require('express');
const path = require('path');
const db = require('./config/connection');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth'); 

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
    });
    await server.start();
    server.applyMiddleware({ app });
};



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once("open", () => {
    app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
    
});

startServer(typeDefs, resolvers);