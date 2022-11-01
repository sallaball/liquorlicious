import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
 
import { GET_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/react-hooks';


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
                {userData.savedRecipes?.map((drinks) => {
                    return (
                        <Card key={drinks.recipeId} border='dark'>
                            {drinks.image ? (
                                <Card.Img
                                src={drinks.image}
                                alt={`The picture for ${drinks.title}`}
                                variant='top'
                                />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{drinks.title}</Card.Title>
                                <Card.Text>{drinks.instructions}</Card.Text>
                                <Button
                                className='btn-block btn-danger'
                                onClick={() => handleDeleteRecipe(drinks.recipeId)}
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