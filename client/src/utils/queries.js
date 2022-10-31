import { gql } from "@apollo/client";

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        savedRecipes {
            recipeId
            authors
            description
            title
            image
            link
        }
    }
}
`;