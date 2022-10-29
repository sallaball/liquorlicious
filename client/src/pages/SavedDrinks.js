import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
 
import { GET_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ExpandPrompt from 'inquirer/lib/prompts/expand';

const SavedRecipes = () => {
    const { loading, data } = useQuery(GET_ME);
    let userData = data?.me || {};
    console.log(userData);
    const [removeRecipe] = useMutation(REMOVE_RECIPE);
    const handleDeleteRecipe = async (recipeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { user } = await removeRecipe({
                variables: {
                    recipeId: recipeId,
                },
            });
            userData = user;
            removeRecipeId(recipeId);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h2>LOADING...</h2>;
    }
    return (
        <>
        <Jumbotron fluid className='text-light bg-dark'>
            <Container>
                <h1>Your saved recipes!</h1>
            </Container>
        </Jumbotron>
        <Container>
            <h2>
                {userData.savedRecipes?.length
                ? `Viewing ${userData.savedRecipes.length} saved ${
                    userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'
                }:`
            : 'You have no saved recipes'}
            </h2>
            <CardColumns>
                {userData.savedRecipes?.map((recipe) => {
                    return (
                        <Card key={recipe.recipeId} border='dark'>
                            {recipe.image ? (
                                <Card.Img
                                src={recipe.image}
                                alt={`The picture for ${recipe.title}`}
                                variant='top'
                                />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{recipe.title}</Card.Title>
                                <p className='small'>Recipe created by: {recipe.authors}</p>
                                <Card.Text>{recipe.description}</Card.Text>
                                <Button
                                className='btn-block btn-danger'
                                onClick={() => handleDeleteRecipe(recipe.recipeId)}
                                >
                                    Delete this Recipe!
                                </Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </CardColumns>
        </Container>
        </>

    );
};

export default SavedRecipes;