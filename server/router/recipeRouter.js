// const { getAllRecipes, createRecipe, getById, updateById, deleteById } = require('../controllers/recipeController');
// const { getUserByEmail, getUserById, getAllUsers } = require('../controllers/userController');

// const { isUser, parseJwt } = require('../middlewares/auth');

// const router = require('express').Router();

// router.get('/recipes', async (req, res) => { //TODO ADD iSUser middleware

//     const result = await getAllRecipes();

//     // console.log(result)
//     res.status(200).json({ result, message: 'Success' });
// });

// router.post('/recipes', isUser, async (req, res) => { //TODO Add isUser middleware
//     try {
//         const token = req.headers['authorization'];

//         if (!token) {
//             throw new Error('You have to log in to create recipe.')
//         }

//         const userData = parseJwt(token);
//         const user = await getUserByEmail(userData.email);

//         let symbols = '';
//         let newIngredients = [];
//         for (let i = 0; i < req.body.ingredients[0].length; i++) {
//             if (req.body.ingredients[0][i].toString() != '\n' && i != req.body.ingredients[0].length - 1) {
//                 symbols += req.body.ingredients[0][i].toString();
//                 console.log(symbols)
//             } else if (req.body.ingredients[0][i].toString() == '\n' || i == req.body.ingredients[0].length - 1) {
//                 newIngredients.push(symbols);
//                 symbols = '';
//             }
//         }

//         console.log(newIngredients)

//         const data = {
//             name: req.body.name,
//             dishType: req.body.dishType,
//             imageUrl: req.body.imageUrl,
//             ingredients: newIngredients,
//             preparation: req.body.preparation,
//             servings: req.body.servings,
//             caloriesRecipe: req.body.caloriesRecipe,
//             carbsRecipe: req.body.carbsRecipe,
//             fatRecipe: req.body.fatRecipe,
//             proteinRecipe: req.body.proteinRecipe,
//             caloriesServing: req.body.caloriesServing,
//             carbsServing: req.body.carbsServing,
//             fatServing: req.body.fatServing,
//             proteinServing: req.body.proteinServing,
//             dateCreated: Date.now(),
//             author: user._id,
//             details: req.body.details
//         };

//         console.log(data.ingredients)

        

//         // console.log(req.headers)


//         const result = await createRecipe(data);
//         user.posted.push(result)

//         user.rating += 40;
//         if (user.rating <= 199) {
//             user.rank = 1;
//             user.level = 'Bronze'
//         } else if (user.rating > 199 && user.rating < 500) {
//             user.rank = 2;
//             user.level = 'Bronze'
//         } else if (user.rating > 499 && user.rating < 800) {
//             user.rank = 3;
//             user.level = 'Silver'
//         } else if (user.rating > 799 && user.rating < 1400) {
//             user.rank = 4;
//             user.level = 'Silver'
//         } else if (user.rating > 1399 && user.rating < 2100) {
//             user.rank = 5;
//             user.level = 'Silver'
//         } else if (user.rating > 2099 && user.rating < 3000) {
//             user.rank = 6;
//             user.level = 'Gold'
//         } else if (user.rating > 2999 && user.rating < 4500) {
//             user.rank = 7;
//             user.level = 'Gold'
//         } else if (user.rating > 4499 && user.rating < 7000) {
//             user.rank = 8;
//             user.level = 'Gold'
//         } else if (user.rating > 6999 && user.rating < 10500) {
//             user.rank = 9;
//             user.level = 'Platinum'
//         } else if (user.rating > 10499 && user.rating < 16000) {
//             user.rank = 10;
//             user.level = 'Platinum'
//         } else if (user.rating > 15999) {
//             user.rank = 11;
//             user.level = 'Diamond'
//         }
//         await user.save();

//         res.status(201).json({ result, message: 'Recipe created successfully' });
//     } catch (err) {
//         res.json({ message: err.message })
//         console.log(err)
//     }

// });

// router.get('/recipes/:id', async (req, res) => {
//     try {
//         const token = req.headers['authorization'];

//         if (token) {
//             const userData = (parseJwt(token));
//         }

//         const id = req.params.id;
//         const data = await getById(id);
//         const userId = data.author;
//         const user = await getUserById(userId);

//         console.log(user)

//         const result = {
//             _id: data._id,
//             name: data.name,
//             dishType: data.dishType,
//             imageUrl: data.imageUrl,
//             ingredients: data.ingredients,
//             preparation: data.preparation,
//             servings: data.servings,
//             caloriesRecipe: data.caloriesRecipe,
//             carbsRecipe: data.carbsRecipe,
//             fatRecipe: data.fatRecipe,
//             proteinRecipe: data.proteinRecipe,
//             caloriesServing: data.caloriesServing,
//             carbsServing: data.carbsServing,
//             fatServing: data.fatServing,
//             proteinServing: data.proteinServing,
//             author: user.email,
//             likes: data.likes,
//             dislikes: data.dislikes,
//             details: data.details
//         }

//         res.status(200).json({ message: "Successfully opened details", result });

//     } catch (err) {
//         console.log(err)
//     }
// });

// router.put('/recipes/:id', isUser, async (req, res) => {

//     const id = req.params.id;

//     console.log(req.body)

//     const data = {
//         name: req.body.name,
//         dishType: req.body.dishType,
//         imageUrl: req.body.imageUrl,
//         ingredients: req.body.ingredients,
//         preparation: req.body.preparation,
//         caloriesRecipe: req.body.caloriesRecipe,
//         carbsRecipe: req.body.carbsRecipe,
//         fatRecipe: req.body.fatRecipe,
//         proteinRecipe: req.body.proteinRecipe,
//         caloriesServing: req.body.caloriesServing,
//         carbsServing: req.body.carbsServing,
//         fatServing: req.body.fatServing,
//         proteinServing: req.body.proteinServing,
//         details: req.body.details,
//     };

//     const result = await updateById(id, data);
//     res.status(201).json({ result, message: 'Successfully edited' });
// });

// router.delete('/recipes/:id', isUser, async (req, res) => {
//     const id = req.params.id;

//     const recipe = await getById(id);
//     const userId = recipe.author;
//     const user = await getUserById(userId);
//     user.rating -= 40;
//     user.totalRecipeLikes -= Number(recipe.likes);
//     user.totalRecipeDislikes -= Number(recipe.dislikes);

//     for (let i = 0; i < user.posted.length; i++) {
//         let recipeArr = user.posted[i];
//         if (recipeArr._id.toString() == recipe._id.toString()){
//             user.posted.splice(i, 1);
//         }
//     }

    

//     for (let disliked of recipe.peopleDisliked) {
//         const user = await getUserById(disliked);
//         console.log(user.disliked)
//         user.disliked -= 1;
//         await user.save()
//     }

//     for (let liked of recipe.peopleLiked) {
//         const user = await getUserById(liked);
//         console.log(user.liked)

//         user.liked -= 1;
//         await user.save()
//     }

//     if (user.rating <= 199) {
//         user.rank = 1;
//         user.level = 'Bronze'
//     } else if (user.rating > 199 && user.rating < 500) {
//         user.rank = 2;
//         user.level = 'Bronze'
//     } else if (user.rating > 499 && user.rating < 800) {
//         user.rank = 3;
//         user.level = 'Silver'
//     } else if (user.rating > 799 && user.rating < 1400) {
//         user.rank = 4;
//         user.level = 'Silver'
//     } else if (user.rating > 1399 && user.rating < 2100) {
//         user.rank = 5;
//         user.level = 'Silver'
//     } else if (user.rating > 2099 && user.rating < 3000) {
//         user.rank = 6;
//         user.level = 'Gold'
//     } else if (user.rating > 2999 && user.rating < 4500) {
//         user.rank = 7;
//         user.level = 'Gold'
//     } else if (user.rating > 4499 && user.rating < 7000) {
//         user.rank = 8;
//         user.level = 'Gold'
//     } else if (user.rating > 6999 && user.rating < 10500) {
//         user.rank = 9;
//         user.level = 'Platinum'
//     } else if (user.rating > 10499 && user.rating < 16000) {
//         user.rank = 10;
//         user.level = 'Platinum'
//     } else if (user.rating > 15999) {
//         user.rank = 11;
//         user.level = 'Diamond'
//     }
//     await user.save();

//     await deleteById(id);
//     res.status(200).json({ message: "Successfully deleted" })
// })

// router.get(`/recipes/:id/like`, isUser, async (req, res) => {
//     try {

//         const id = req.params.id;
//         const userToken = req.headers['authorization'];
//         const userData = parseJwt(userToken);
//         const email = userData.email;
//         const user = await getUserByEmail(email);
//         const recipe = await getById(id);
//         const authorId = recipe.author;
//         const author = await getUserById(authorId);

//         if (recipe.peopleLiked.includes(user._id)) {
//             throw new Error('You have already liked this recipe')
//         }

//         if (recipe.author._id.toString() == user._id.toString()) {
//             throw new Error('Author cannot like their own recipes')
//         }

//         recipe.likes += 1;
//         recipe.peopleLiked.push(user)
//         // user.liked.push(recipe);
//         user.liked += 1;
//         author.totalRecipeLikes += 1;

//         author.rating += 20;
//         if (author.rating <= 199) {
//             author.rank = 1;
//             author.level = 'Bronze'
//         } else if (author.rating > 199 && author.rating < 500) {
//             author.rank = 2;
//             author.level = 'Bronze'
//         } else if (Number(author.rating) > 499 && Number(author.rating) < 800) {
//             author.rank = 3;
//             author.level = 'Silver'
//         } else if (author.rating > 799 && author.rating < 1400) {
//             author.rank = 4;
//             author.level = 'Silver'
//         } else if (author.rating > 1399 && author.rating < 2100) {
//             author.rank = 5;
//             author.level = 'Silver'
//         } else if (author.rating > 2099 && author.rating < 3000) {
//             author.rank = 6;
//             author.level = 'Gold'
//         } else if (author.rating > 2999 && author.rating < 4500) {
//             author.rank = 7;
//             author.level = 'Gold'
//         } else if (author.rating > 4499 && author.rating < 7000) {
//             author.rank = 8;
//             author.level = 'Gold'
//         } else if (author.rating > 6999 && author.rating < 10500) {
//             author.rank = 9;
//             author.level = 'Platinum'
//         } else if (author.rating > 10499 && author.rating < 16000) {
//             author.rank = 10;
//             author.level = 'Platinum'
//         } else if (author.rating > 15999) {
//             author.rank = 11;
//             author.level = 'Diamond'
//         }

//         await recipe.save()
//         await user.save();
//         await author.save()

//         res.json({ message: `Liked successfully` })
//     } catch (err) {
//         console.log(err)
//         res.json({ message: err.message })
//     }

// })

// router.get('/recipes/:id/dislike', isUser, async (req, res) => {
//     try {

//         const id = req.params.id;
//         const userToken = req.headers['authorization'];
//         const userData = parseJwt(userToken);
//         const email = userData.email;
//         const user = await getUserByEmail(email);
//         const recipe = await getById(id);
//         const authorId = recipe.author;
//         const author = await getUserById(authorId);

//         console.log(author)

//         if (recipe.peopleDisliked.includes(user._id)) {
//             throw new Error('You have already disliked this recipe')
//         }

//         if (recipe.author._id.toString() == user._id.toString()) {
//             throw new Error('Author cannot dislike their own recipes')
//         }

//         recipe.dislikes += 1;
//         recipe.peopleDisliked.push(user);
//         user.disliked += 1;
//         author.totalRecipeDislikes += 1;
//         author.rating -= 10;

//         if (author.rating <= 199) {
//             author.rank = 1;
//             author.level = 'Bronze'
//         } else if (author.rating > 199 && author.rating < 500) {
//             author.rank = 2;
//             author.level = 'Bronze'
//         } else if (author.rating > 499 && author.rating < 800) {
//             author.rank = 3;
//             author.level = 'Silver'
//         } else if (author.rating > 799 && author.rating < 1400) {
//             author.rank = 4;
//             author.level = 'Silver'
//         } else if (author.rating > 1399 && author.rating < 2100) {
//             author.rank = 5;
//             author.level = 'Silver'
//         } else if (author.rating > 2099 && author.rating < 3000) {
//             author.rank = 6;
//             author.level = 'Gold'
//         } else if (author.rating > 2999 && author.rating < 4500) {
//             author.rank = 7;
//             author.level = 'Gold'
//         } else if (author.rating > 4499 && author.rating < 7000) {
//             author.rank = 8;
//             author.level = 'Gold'
//         } else if (author.rating > 6999 && author.rating < 10500) {
//             author.rank = 9;
//             author.level = 'Platinum'
//         } else if (author.rating > 10499 && author.rating < 16000) {
//             author.rank = 10;
//             author.level = 'Platinum'
//         } else if (author.rating > 15999) {
//             author.rank = 11;
//             author.level = 'Diamond'
//         }

//         await recipe.save();
//         await author.save();
//         await user.save();

//         res.json({ message: 'Disliked successfully' })

//     } catch (err) {
//         console.log(err)
//         res.json({ message: err.message })
//     }

// })

// router.get('/search/:param', async (req, res) => {
//     const param = req.params.param;
//     console.log(param)
//     const recipes = (await getAllRecipes())
//     const filteredRecipes = [];
//     for (let recipe of recipes) {
//         if (((recipe.name).toString().toLowerCase()).includes(param.toString().toLowerCase())) {
//             filteredRecipes.push(recipe);
//         }
//     }

//     console.log('===')

//     for (let filteredRecipe of filteredRecipes) {
//         const authorId = filteredRecipe.author;
//         const author = await getUserById(authorId);
//         filteredRecipe.author = author;
//     }

//     const users = await getAllUsers();
//     const filteredUsers = [];
//     for (let user of users) {
//         if (user.email.toString().toLowerCase().includes(param.toString().toLocaleLowerCase())) {
//             filteredUsers.push(user);
//         }
//         if (user.firstName.toString().toLowerCase().includes(param.toString().toLowerCase())) {
//             if (filteredUsers.includes(user) == false) {
//                 filteredUsers.push(user);
//             }
//         }
//         if (user.lastName.toString().toLowerCase().includes(param.toString().toLowerCase())) {
//             if (filteredUsers.includes(user) == false) {
//                 filteredUsers.push(user);
//             }
//         }
//     }

//     console.log(filteredUsers)
//     res.json({ recipes: filteredRecipes, users: filteredUsers })

// })




// module.exports = router;