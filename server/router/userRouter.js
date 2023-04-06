// const { getAllRecipes } = require('../controllers/recipeController');
const { register, login, getUserByEmail, getUserById, getAllUsers } = require('../controllers/userController');
const { generateAccessToken, isGuest, isUser, parseJwt } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/users/register', async (req, res) => {


    try {
        if (req.body.password != req.body.rePass) {
            throw new Error('Passwords do not match');
        }

        if (req.body.password.length < 8) {
            throw new Error('Password must be at least 3 characters long')
        }

        const reqData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            // gender: req.body.gender,
            email: req.body.email,
        }


        const user = await register(reqData);

        const token = generateAccessToken(req.body.email, user.firstName, user.lastName); //user.gender


        return res.cookie("access_token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production"
        })

            .status(200)
            .json({ message: "Registered in Successfully", user, token });

    } catch (err) {
        res.json({ message: "An error has occured", error: err.message })
        console.log(err)
    }

});

router.post('/users/login', async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        const token = generateAccessToken(req.body.email, user.firstName, user.lastName, user.gender);

        return res.cookie("access_token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production"
        })

            .status(200)
            .json({ message: "Logged in Successfully", user, token });
    } catch (err) {
        res.json({ message: err.message })
        console.log(err);
    }
});

router.get('/users/logout', (req, res) => { //TODO FIX BACKEND OGOUT
    console.log('here')
    try {
        return res.clearCookie("access_token")
            .status(200)
            .json({ message: 'Successfully logged out.' });
    } catch (err) {
        console.log(err)
    }
})

// router.get('/users/myProfile', isUser, async (req, res) => {
//     try {
//         const token = req.headers['authorization'];

//         if (!token) {
//             throw new Error('There is no auth token in request headers')
//         }

//         const tokenData = parseJwt(token);
//         const user = await getUserByEmail(tokenData.email)
//         const recipes = await getAllRecipes();

//         const userPosted = [];
//         const userLiked = [];

//         for (let recipe of recipes) {
//             if (recipe.author.toString() == user._id.toString()) {
//                 userPosted.push(recipe);
//             }

//             for (let liked of recipe.peopleLiked) {
//                 if (liked.toString() == user._id.toString()) {
//                     userLiked.push(recipe);
//                 }
//             }
//         }

//         const userData = {
//             firstName: user.firstName,
//             lastName: user.lastName,
//             gender: user.gender,
//             email: user.email,
//             posted: userPosted,
//             liked: userLiked,
//             disliked: user.disliked,
//             totalRecipeLikes: user.totalRecipeLikes,
//             totalRecipeDislikes: user.totalRecipeDislikes,
//             level: user.level,
//             rank: user.rank,
//             rating: user.rating
//         }

//         res.json({ message: "Successfully accessed profile page", userData })


//     } catch (err) {
//         console.log(err)
//     }
// })

// router.get('/users/userProfile/:email', async (req, res) => {
//     try {
//         const email = req.params.email;
//         const user = await getUserByEmail(email);

//         const recipes = await getAllRecipes();

//         const userCreated = []


//         for (let recipe of recipes) {
//             if (recipe.author.toString() == user._id.toString()) {
//                 userCreated.push(recipe)
//             }
//         }

//         console.log('user',user)


//         const userData = {
//             id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             gender: user.gender,
//             email: user.email,
//             posted: userCreated,
//             liked: user.liked,
//             level: user.level,
//             rank: user.rank,
//             rating: user.rating, 
//             disliked: user.disliked, 
//             totalRecipeDislikes: user.totalRecipeDislikes, 
//             totalRecipeLikes: user.totalRecipeLikes
//         }

//         console.log('userdata', userData)

//         res.json({ message: `Successfully accessed the profile page of the user ${userData.email}`, userData })
//     } catch (err) {
//         console.log(err)
//     }

// })

// router.get('/users/getAll', async (req, res) => {
//     const users = await getAllUsers();

//     users.sort((a, b) => {
//         return b.rating - a.rating;
//     })

//     for (let user of users) {
//         user.hashedPassword = '';
//         user.seqAnswer = '';
//         user.seqQuestion = '';
//         user.totalRecipeDislikes = '';
//         user.totalRecipeLikes = '';
//         user.liked = [];
//         user.disliked = '';
//         user.posted = {};
//     }



//     res.json({ mesage: 'Success', users: users })
// })

module.exports = router;