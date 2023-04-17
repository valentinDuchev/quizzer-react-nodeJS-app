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

router.get('/users/profile/:email', async (req, res) => {

    console.log('get')

    try {
        const token = req.headers['token'];
        console.log(token)
        const email = req.params.email;

        if (!token) {
            throw new Error('There is no auth token in request headers')
        }

        const tokenData = parseJwt(token);

        let isMyOwnProfile = false

        let newFollowers = []
        let newFollowing = []


        // console.log(user)
        if (JSON.stringify(tokenData.email) === JSON.stringify(email)) {
            isMyOwnProfile = true;
            const user = await getUserByEmail(tokenData.email)




            for (let followerId of user.followers) {
                const follower = await getUserById(followerId);
                newFollowers.push(follower)
            }

            for (let followingId of user.following) {
                const following = await getUserById(followingId);
                newFollowing.push(following)
            }

            

            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                rating: user.rating,
                quizesCreated: user.quizesCreated,
                quizesNumber: user.quizesCreated.length,
                dateCreated: user.dateCreated,
                followers: newFollowers,
                following: newFollowing,
                followersNumber: user.followersNumber,
                followingNumber: user.followingNumber,
                _id: user._id,
                quizesSolved: user.quizesSolved,
                followingId: user.following,
                followersId: user.followers, 
                rating: user.rating, 
                newsFeed: user.newsFeed
            }

            // console.log(userData)
            res.json({ message: "Successfully accessed MY profile page", userData, isMyOwnProfile })
        } else {
            const myUser = await getUserByEmail(tokenData.email)
            const user = await getUserByEmail(email)

            for (let followerId of user.followers) {
                const follower = await getUserById(followerId);
                newFollowers.push(follower)
            }

            for (let followingId of user.following) {
                const following = await getUserById(followingId);
                newFollowing.push(following)
            }

            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                rating: user.rating,
                quizesCreated: user.quizesCreated,
                quizesNumber: user.quizesCreated.length,
                dateCreated: user.dateCreated,
                followers: newFollowers,
                following: newFollowing,
                followersNumber: user.followersNumber,
                followingNumber: user.followingNumber,
                _id: user._id,
                followingId: user.following,
                followersId: user.followers

            }

            const myUserData = {
                firstName: myUser.firstName,
                lastName: myUser.lastName,
                email: myUser.email,
                rating: myUser.rating,
                quizesCreated: myUser.quizesCreated,
                quizesNumber: myUser.quizesCreated.length,
                dateCreated: myUser.dateCreated,
                followers: myUser.followers,
                following: myUser.following,
                followersNumber: myUser.followersNumber,
                followingNumber: myUser.followingNumber,
                _id: myUser._id
            }

            // console.log(userData)
            res.json({ message: "Successfully accessed ANOTHER profile page", userData, isMyOwnProfile, myUserData })
        }





    } catch (err) {
        console.log(err)
    }
})

router.get('/users/:email/follow', async (req, res) => {
    const token = req.headers['token'];
    const userData = parseJwt(token);
    const userFollowing = await getUserByEmail(userData.email);

    const userToFollowEmail = req.params.email;
    const userToFollow = await getUserByEmail(userToFollowEmail)

    let error = '';

    if (!userToFollow.followers.includes(userFollowing._id) && !userFollowing.following.includes(userToFollow._id)) {
        userToFollow.followersNumber += 1;
        userFollowing.followingNumber += 1;
        userToFollow.followers.push(userFollowing)
        userFollowing.following.push(userToFollow)
        userToFollow.rating += 1;
    } else {
        error = 'You have already followed that user'
    }


    await userToFollow.save()
    await userFollowing.save()

    res.json({ message: `Successfully followed ${userToFollow}`, error, userToFollow, userFollowing })

})

router.get('/users/:email/unfollow', async (req, res) => {
    const token = req.headers['token'];
    const userData = parseJwt(token);
    const userFollowing = await getUserByEmail(userData.email);

    const userToFollowEmail = req.params.email;
    const userToFollow = await getUserByEmail(userToFollowEmail)

    let error = '';

    if (userToFollow.followers.includes(userFollowing._id) && userFollowing.following.includes(userToFollow._id)) {
        userToFollow.followersNumber -= 1;
        userFollowing.followingNumber -= 1;
        userToFollow.rating -= 1;

        for (let i = 0; i < userToFollow.followers.length; i++) {
            if (JSON.stringify(userToFollow.followers[i]._id) === JSON.stringify(userFollowing._id)) {
                userToFollow.followers.splice(i, 1);
            }
        }

        for (let i = 0; i < userFollowing.following.length; i++) {
            if (JSON.stringify(userFollowing.following[i]) === JSON.stringify(userToFollow._id)) {
                userFollowing.following.splice(i, 1);
            }
        }
    } else {
        error = 'You have already followed that user'
    }


    await userToFollow.save()
    await userFollowing.save()

    res.json({ message: `Successfully unfollowed ${userToFollow}`, error, userToFollow, userFollowing })

})

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

router.get('/users/getAll', async (req, res) => {
    const users = await getAllUsers();

    const token = req.headers['token'];
    const userData = parseJwt(token);
    const myUser = await getUserByEmail(userData.email);

    

    for (let user of users) {
        user.hashedPassword = '';
        user.quizesRated = ''
        user.quizesSolved = user.quizesSolved.length
    }

    console.log(users)



    res.json({ mesage: 'Success', users: users, myUser })
})

module.exports = router;