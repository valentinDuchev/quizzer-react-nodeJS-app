// const { Schema, model, Types: { ObjectId } } = require('mongoose');

// const URL_PATTERN = /^https?:\/\/(.+)$/;

// const recipeSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'The recipe name is required'],
//         minlength: [2, 'The recipe name cannot be less than 2 characters long'],
//         maxlength: [20, 'The recipe name cannot be more than 20 characters long']
//     },
//     dishType: { type: String, required: [true, 'Dish Type is required'] },
//     imageUrl: {
//         type: String,
//         validate: {
//             validator(value) {
//                 if (value != '') {
//                     console.log(value)
//                     return URL_PATTERN.test(value)
//                 }
//             }, message: 'The recipe image must be valid URL or empty string (Example: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg")'
//         }
//     },
//     servings: { type: Number, min: [1, 'There must be at least one serving'] },
//     ingredients: { type: [String], minlength: [6, 'The ingredients section must be at least 6 characters long'] },
//     preparation: { type: [String], minlength: [10, 'The preparation section must be at least 10 characters long'] },
//     caloriesRecipe: { type: Number, default: 0 },
//     carbsRecipe: { type: Number, default: 0 },
//     fatRecipe: { type: Number, default: 0 },
//     proteinRecipe: { type: Number, default: 0 },
//     caloriesServing: { type: Number, default: 0 },
//     carbsServing: { type: Number, default: 0 },
//     fatServing: { type: Number, default: 0 },
//     proteinServing: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     dislikes: { type: Number, default: 0 },
//     peopleLiked: { type: [ObjectId], ref: 'User' },  //TODO change type to UserId
//     peopleDisliked: { type: [ObjectId], ref: 'User' }, //TODO Change type to UserId
//     dateCreated: { type: Date, default: Date.now() }, //TODO change type to Date and add Date.now functionality
//     author: { type: ObjectId, ref: 'User', required: true },  //TODO change type to UserId
//     details: { type: String, default: ''}

// });

// module.exports = model('Recipe', recipeSchema);