import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchIngredients, searchRecipes } from '../utils/API';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';

import { SAVE_RECIPE } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const SearchRecipes = () => {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
    useEffect(() => {
        return () => saveRecipeIds(savedRecipeIds);
    });

    const [saveRecipe] = useMutation(SAVE_RECIPE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchRecipes(searchInput);
            const otherResponse = await searchIngredients(searchInput);
            console.log(otherResponse)
            console.log(response);

            

            const { drinks } = await response.json();
            console.log(drinks)

            const recipeData = drinks.map((drinks) => ({
                recipeId: drinks.idDrink,
                title: drinks.strDrink,
                image: drinks.strDrinkThumb || '',
                alcoholic: drinks.strAlcoholic || 'Non-alcoholic',
                drinkType: drinks.strTags || '',
                drinkIBA: drinks.strIBA || '',
                typeOfGlass: drinks.strGlass || '',
                instructions: drinks.strInstructions                
            }));

            setSearchedRecipes(recipeData);

            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveRecipe = async (recipeId) => {
        const recipeToSave = searchedRecipes.find((drinks) => drinks.recipeId === recipeId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveRecipe({
                variables: {
                    input: recipeToSave,
                },
            });

            if (!response) {
                throw new Error('Something went wrong..');
            }

            setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <Jumbotron fluid className='text-light bg-dark'>
            <Container>
                <h1>Search for Recipes</h1>
                <Form onSubmit={handleFormSubmit}>
                {/* {(e) => handleFormSubmit(e)}> */}
                    <Form.Row> 
                        <Col xs={12} md={8}>
                            <Form.Control
                            name='searchInput'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type='text'
                            size='lg'
                            placeholder='Search for a Drink Recipe'
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <Button type='submit' variant='success' size='lg'>
                                Submit Search
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>          
            </Container>
        </Jumbotron>

        <Container>
            <h2>
                {searchedRecipes.length
                ? `Viewing ${searchedRecipes.length} results:`
            : 'Search for a recipe to begin'}
            </h2>
            <CardColumns>
                {searchedRecipes.map((drinks) => {
                    return (
                        <Card key={drinks.recipeId} border='dark'>
                            {drinks.image ? (
                                <Card.Img src={drinks.image} alt={`A picture of ${drinks.title}`} variant='top' />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{drinks.title}</Card.Title>
                                <Card.Text>{drinks.instructions}</Card.Text>
                                {Auth.loggedIn() && (
                                    <Button
                                    disabled={savedRecipeIds?.some(
                                        (savedRecipeId) => savedRecipeId === drinks.recipeId
                                    )}
                                    className='btn-block btn-info'
                                    onClick={() => handleSaveRecipe(drinks.recipeId)}
                                    >
                                        {savedRecipeIds?.some(
                                            (savedRecipeId) => savedRecipeId === drinks.recipeId
                                        )
                                        ? 'This recipe has already been saved'
                                    : 'Save Recipe'}
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    );
                })}
            </CardColumns>
        </Container>

        </>
    );
};

export default SearchRecipes;