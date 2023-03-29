// const Recipe = require('../models/Recipe');

// async function getAllRecipes () {
//     const result = await Recipe.find({});
//     return result;
// }

// async function createRecipe (recipe) {
//     const result = new Recipe (recipe);
//     await result.save();

//     return result;
    
// }

// async function getById (_id) {
//     const result = await Recipe.findOne({_id});
//     return result;
// }

// async function updateById (id, data) {
//     const result = await Recipe.findByIdAndUpdate(id, data);
//     await result.save();

//     return result;
// }

// async function deleteById (id) {
//     await Recipe.findByIdAndDelete(id);

// };



// module.exports = {
//     getAllRecipes, 
//     createRecipe, 
//     getById, 
//     updateById, 
//     deleteById
// }