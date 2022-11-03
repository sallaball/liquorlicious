import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchRecipes } from '../utils/API';
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
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            

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
                ingredient1: drinks.strIngredient1,
                ingredient2: drinks.strIngredient2,
                ingredient3: drinks.strIngredient3 || '',
                ingredient4: drinks.strIngredient4 || '',
                ingredient5: drinks.strIngredient5 || '',
                ingredient6: drinks.strIngredient6 || '',
                ingredient7: drinks.strIngredient7 || '',
                ingredient8: drinks.strIngredient8 || '',
                ingredient9: drinks.strIngredient9 || '',
                ingredient10: drinks.strIngredient10 || '',
                measure1: drinks.strMeasure1,
                measure2: drinks.strMeasure2,
                measure3: drinks.strMeasure3 || '',
                measure4: drinks.strMeasure4 || '',
                measure5: drinks.strMeasure5 || '',
                measure6: drinks.strMeasure6 || '',
                measure7: drinks.strMeasure7 || '',
                measure8: drinks.strMeasure8 || '',
                measure9: drinks.strMeasure9 || '',
                measure10: drinks.strMeasure10 || '',
                instructions: drinks.strInstructions,

            }));

            setSearchedRecipes(recipeData);

            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    
    };

    // const SearchIngredients = () => {
    //     const [searchedIngredients, setSearchedIngredients] = useState([]);
    //     const [searchInput, setSearchInput] = useState('');
        
    
    //     const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
    //     useEffect(() => {
    //         return () => saveRecipeIds(savedRecipeIds);
    //     });
    
    //     const [saveRecipe] = useMutation(SAVE_RECIPE);
    
    //     const handleFormSubmit = async (event) => {
    //         event.preventDefault();
    
    //         if (!searchInput) {
    //             return false;
    //         }
    
    //         try {
    //             const response = await searchIngredients(searchInput);
    //             if (!response.ok) {
    //                 throw new Error('Something went wrong!');
    //             }
                
    
    //             const { drinks } = await response.json();
    //             console.log(drinks)
    
    //             const recipeData = drinks.map((drinks) => ({
    //                 recipeId: drinks.idDrink,
    //                 title: drinks.strDrink,
    //                 image: drinks.strDrinkThumb || '',
    
    //             }));
    
    //             setSearchedIngredients(recipeData);
    
    //             setSearchInput('');
    //         } catch (err) {
    //             console.error(err);
    //         }
        
    //     };

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
        <Jumbotron fluid className='bg-dark text-light' id='searchBars'>
            <Container fluid>
                <h1 id='searchHeaders'>Search for Recipes</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Row> 
                        <Col xs={6} md={3}>
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
                                Submit
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>          
            </Container>
        </Jumbotron>

        <Container fluid>
            <h2>
                {searchedRecipes.length
                ? `Viewing ${searchedRecipes.length} results:`
            : 'Search Drink Name to find the Recipe'}
            </h2>
            <CardColumns>
                {searchedRecipes.map((drinks) => {
                    return (
                        <Card key={drinks.recipeId} border='info'>
                            {drinks.image ? (
                                <Card.Img src={drinks.image} alt={`A picture of ${drinks.title}`} variant='top' />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{drinks.title}</Card.Title>
                                <Card.Text className='bg-danger text-light'>{drinks.alcoholic}</Card.Text>
                                <Card.Text>{drinks.drinktype}</Card.Text>
                                <Card.Text>{drinks.typeOfGlass}</Card.Text>
                                <Card.Text>{drinks.ingredient1} {drinks.measure1}</Card.Text>
                                <Card.Text>{drinks.ingredient2} {drinks.measure2}</Card.Text>
                                <Card.Text>{drinks.ingredient3} {drinks.measure3}</Card.Text>
                                <Card.Text>{drinks.ingredient4} {drinks.measure4}</Card.Text>
                                <Card.Text>{drinks.ingredient5} {drinks.measure5}</Card.Text>
                                <Card.Text>{drinks.ingredient6} {drinks.measure6}</Card.Text>
                                <Card.Text>{drinks.ingredient7} {drinks.measure7}</Card.Text>
                                <Card.Text>{drinks.ingredient8} {drinks.measure8}</Card.Text>
                                <Card.Text>{drinks.ingredient9} {drinks.measure9}</Card.Text>
                                <Card.Text>{drinks.ingredient10} {drinks.measure10}</Card.Text>
                                <Card.Text>{drinks.instructions}</Card.Text>
                                {/* </Card.Text> */}
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

export default SearchRecipes;
