const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    helloworld: String
}
`;

module.exports = typeDefs;