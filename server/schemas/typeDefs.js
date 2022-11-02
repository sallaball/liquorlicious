const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    recipeCount: Int
    savedRecipes: [Recipe]
}
type Recipe {
    recipeId: String!
    ingredients: String
    title: String!
    image: String
    link: String
    instructions: String
}

type Auth {
    token: ID!
    user: User
}

input RecipeInput {
    recipeId: String!
    ingredients: String
    title: String!
    image: String
    link: String
    instructions: String
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveRecipe(input: RecipeInput): User
    removeRecipe(recipeId: String!): User
}
`;

module.exports = typeDefs;
