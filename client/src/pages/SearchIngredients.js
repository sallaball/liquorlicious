import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchIngredients } from '../utils/API';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';

import { SAVE_RECIPE } from '../utils/mutations';
import { useMutation } from '@apollo/client';


    const SearchIngredients = () => {
        const [searchedIngredients, setSearchedIngredients] = useState([]);
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
                const response = await searchIngredients(searchInput);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                
    
                const { drinks } = await response.json();
                console.log(drinks)
    
                const ingredientData = drinks.map((drinks) => ({
                    recipeId: drinks.idDrink,
                    title: drinks.strDrink,
                    image: drinks.strDrinkThumb || '',
    
                }));
    
                setSearchedIngredients(ingredientData);
    
                setSearchInput('');
            } catch (err) {
                console.error(err);
            }
        
        };

    const handleSaveRecipe = async (recipeId) => {
        const recipeToSave = searchedIngredients.find((drinks) => drinks.recipeId === recipeId);

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
        <Jumbotron fluid className='text-light bg-dark justify-content-evenly' id='searchBars'>
            
            <Container fluid>
                <h1 id='seachHeaders'>Search for ingredients</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Row> 
                        <Col xs={6} md={3}>
                            <Form.Control
                            name='searchInput'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type='text'
                            size='lg'
                            placeholder='Search drink ingredients'
                            />
                        </Col>
                        <Col xs={6} md={2}>
                            <Button type='submit' variant='success' size='lg'>
                                Submit
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>          
            </Container>
        </Jumbotron>

        <Container fluid>
            <h2>
                {searchedIngredients.length
                ? `Viewing ${searchedIngredients.length} results:`
            : 'Search for an Ingredient to find recipes'}
            </h2>
           
            <CardColumns>
                {searchedIngredients.map((drinks) => {
                    return (
                        <Card key={drinks.recipeId} border='dark'>
                            {drinks.image ? (
                                <Card.Img src={drinks.image} alt={`A picture of ${drinks.title}`} variant='top' />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{drinks.title}</Card.Title>
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
        {/* form 2 call ingredients API */}
       
        </>
    
            );
};

export default SearchIngredients;
