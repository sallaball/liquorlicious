import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

export const SAVE_RECIPE = gql`
mutation saveRecipe($input: RecipeInput) {
    saveRecipe(input: $input) {
        _id
        username
        recipeCount
        savedRecipes {
            recipeId
            title
            ingredients
            instructions
            image
            link
        }
    }
}
`;

export const REMOVE_RECIPE = gql`
mutation removeRecipe($recipeId: String!) {
    removeRecipe(recipeId: $recipeId) {
        _id
        username
        recipeCount
        savedRecipes {
            recipeId
            title
            ingredients
            instructions
            image
            link
        }
    }
}
`;
