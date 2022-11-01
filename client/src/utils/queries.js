import { gql } from "@apollo/client";

export const GET_ME = gql`
{
    me {
        _id
        username
        email
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