export const getMe = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

export const createUser = (userData) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const loginUser = (userData) => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const saveRecipe = (recipeData, token) => {
    return fetch('/api/users', {
        method: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
    });
};

export const deleteRecipe = (recipeId, token) => {
    return fetch(`/api/users/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const searchRecipes = (query) => {
    return fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?i=${query}`);
    // fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
};
