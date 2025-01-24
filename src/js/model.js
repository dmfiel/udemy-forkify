// import { async } from 'regenerator-runtime';
import { API_URL, API_KEY, RESULT_PAGE_SIZE } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: { query: '', results: [], page: 1 },
  bookmarks: []
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key })
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark === id))
      state.recipe.bookmarked = true;
    console.log(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    // console.log(data);
    state.search.query = query;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key })
      };
    });

    // console.log(state.search.results);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  console.log(`Show page: ${page}`);
  const start = (page - 1) * RESULT_PAGE_SIZE;
  const end = page * RESULT_PAGE_SIZE;
  return state.search.results.slice(start, end);
};

export const updateServings = function (servings) {
  state.recipe.ingredients.forEach(
    ing => (ing.quantity *= servings / state.recipe.servings)
  );
  state.recipe.servings = servings;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  console.log('bookmark added');
  console.log(state.bookmarks);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  console.log(`bookmark deleting ${id}`);
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  console.log('bookmark deleted');
  console.log(state.bookmarks);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const retrieveBookmarks = function () {
  const bookmarks = localStorage.getItem('bookmarks');
  if (bookmarks) {
    state.bookmarks = JSON.parse(bookmarks);
  }
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        entry =>
          entry[0].startsWith('ingredient') && entry[1] && entry[1] !== ''
      )
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error('Incorrect ingredient format. Please try again.');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients);
    cd;
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    };
    console.log(recipe);

    const res = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    console.log(res);
    state.recipe = createRecipeObject(res);
    addBookmark(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

retrieveBookmarks();
