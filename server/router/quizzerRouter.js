const router = require('express').Router();

const { getAllQuizes, createQuiz, getOneQuiz, deleteById, updateById } = require('../controllers/quizesController');
const { getUserByEmail, getUserById, getAllUsers } = require('../controllers/userController')
const { parseJwt } = require('../middlewares/auth');
const User = require('../models/User');

router.get('/allQuizes', async (req, res) => {
    const result = await getAllQuizes();

    res.status(200).json({ result, message: 'success' })
})

router.post('/createQuiz', async (req, res) => {
    try {


        const token = req.headers['token'];

        if (!token) {
            throw new Error('You have to log in to create recipe.')
        }


        const userData = parseJwt(token);
        const user = await getUserByEmail(userData.email);



        const data = {
            title: req.body.title,
            description: req.body.description,
            topic: req.body.topic,
            difficulty: req.body.difficulty,
            questions: req.body.questions,
            author: user._id,
            authorEmail: user.email
        };




        // console.log(req.headers)

        const result = await createQuiz(data);



        for (let followerId of user.followers) {
            const follower = await getUserById(followerId)
            follower.newsFeed.push(result)
            await follower.save()
        }

        user.quizesCreated.push(result)
        user.rating += 1;
        await user.save()

        res.status(201).json({ message: 'Quiz created successfully' });
    } catch (err) {
        res.json({ message: err.message })
        console.log(err)
    }

});

router.get('/quiz/:id', async (req, res) => {

    try {

        const token = req.headers.token;
        const userData = parseJwt(token);
        const user = await getUserByEmail(userData.email);

        const id = req.params.id;
        const data = await getOneQuiz(id);


        let isAuthor = true;

        if (user.email !== data.authorEmail) {
            isAuthor = false;
        }

        let result = {};

        if (isAuthor) {
            result = {
                _id: data._id,
                title: data.title,
                description: data.description,
                topic: data.topic,
                difficulty: data.difficulty,
                author: data.author,
                likes: data.likes,
                dislikes: data.dislikes,
                solved: data.solved,
                rating: data.rating,
                questions: (data.questions),
                authorEmail: data.authorEmail,
                peopleSolved: data.peopleSolved,
                questions: data.questions
            }
        } else {
            result = {
                _id: data._id,
                title: data.title,
                description: data.description,
                topic: data.topic,
                difficulty: data.difficulty,
                author: data.author,
                likes: data.likes,
                dislikes: data.dislikes,
                solved: data.solved,
                rating: data.rating,
                questions: (data.questions),
                authorEmail: data.authorEmail,
                peopleSolved: data.peopleSolved
            }
        }



        res.status(200).json({ message: "Successfully opened details", result, isAuthor });  //isauthor


    } catch (err) {
        console.log(err)
    }


})

router.get('/quiz/:id/solve', async (req, res) => {
    try {


        const id = req.params.id;
        const result = req.headers.result
        const quizAuthorEmail = req.headers.quizcreator;
        const quizAuthor = await getUserByEmail(quizAuthorEmail)

        const token = req.headers.token;
        const rating = req.headers.rating;

        const userData = parseJwt(token);
        const user = await getUserByEmail(userData.email);

        const quiz = await getOneQuiz(id);
        quizAuthor.rating += 1;
        user.rating += 0.5;

        const userId = user.email

        const newObj = {
            userId,
            result
        }



        quiz.peopleSolved.push(newObj)
        const newRating = (Number(quiz.rating) + Number(rating)) / 2;



        if (rating == 1 || rating == 2 || rating == 3 || rating == 4 || rating == 5) {
            if (Number(quiz.ratedNumber) > 0) {
                if (Number(quiz.ratedNumber == 1)) {
                    user.rating -= 0.25;
                } else if (Number(quiz.ratedNumber == 2)) {
                    user.rating += 0.25
                } else if (Number(quiz.ratedNumber == 3)) {
                    user.rating += 0.5
                } else if (Number(quiz.ratedNumber == 4)) {
                    user.rating += 0.75
                } else if (Number(quiz.ratedNumber == 5)) {
                    user.rating += 1
                }
                quiz.rating = newRating;
                quiz.ratedNumber++;
            } else {
                quiz.rating = Number(req.headers.rating)
                quiz.ratedNumber++;
            }
        }


        if (user.quizesRated) {
            if (!user.quizesRated.includes(user)) {
                user.quizesRated.push(quiz)
            } else {
                throw new Error('This user has already rated that quiz')
            }
        }




        const quizAdded = quiz;
        quiz.result = Number(result);
        user.quizesSolved.push(quiz)





        await user.save();
        await quizAuthor.save()
        await quiz.save();



        res.status(201).json({ message: 'Quiz finished successfully', quiz, user });
    } catch (err) {
        res.json({ message: err.message })
        console.log(err)
    }




})

router.delete('/quiz/:id', async (req, res) => {
    const id = req.params.id;
    const quiz = await getOneQuiz(id);

    const token = req.headers.token;

    const userData = parseJwt(token);
    const user = await getUserByEmail(userData.email);

    for (let i = 0; i < user.quizesCreated.length; i++) {
        if (JSON.stringify(quiz._id) == JSON.stringify(user.quizesCreated[i]._id)) {
            user.quizesCreated.splice(i, 1)
        }
    }




    await deleteById(id)
    await user.save()
    res.status(200).json({ message: "Successfully deleted" })
})

router.get('/newsFeed', async (req, res) => {

    try {

        const token = req.headers.token;
        const userEmail = parseJwt(token);
        const tokenData = userEmail.email;


        const user = await getUserByEmail(tokenData)

        let newsFeedArray = []

        for (let element of user.newsFeed) {
            const newElement = await getOneQuiz(element)
            newsFeedArray.push(newElement)
        }

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rating: user.rating,
            quizesCreated: user.quizesCreated,
            quizesNumber: user.quizesCreated.length,
            dateCreated: user.dateCreated,
            followers: user.followers,
            following: user.following,
            followersNumber: user.followersNumber,
            followingNumber: user.followingNumber,
            _id: user._id,
            quizesSolved: user.quizesSolved,
            followingId: user.following,
            followersId: user.followers,
            rating: user.rating,
            newsFeed: newsFeedArray,
            newsFeedSeen: user.newsFeedSeen
        }

        const allUsers = await getAllUsers()
        const topUsers = allUsers.sort((a, b) => b.rating - a.rating).slice(0, 3)

        const allQuizes = await getAllQuizes()
        for (let element of allQuizes) {
            const result = (Number(element.peopleSolved) + 2 * Number(element.ratedNumber)) * element.rating;
            element.result = result;
        }

        const topQuizes = allQuizes.sort((a, b) => b.result - a.result).slice(0, 3);


        res.json({ message: "Successfully accessed MY profile page", userData, topUsers, topQuizes })



    } catch (err) {
        console.log(err)
    }
})

router.get('/newsFeedRemove', async (req, res) => {
    console.log("here")

    try {

        const token = req.headers.token;
        if (token) {
            const userEmail = parseJwt(token);
            const tokenData = userEmail.email;
            const user = await getUserByEmail(tokenData)

            const seen = req.headers.seen.split(",")



            let newsFeedArray = []

            if (user) {

                for (let element of user.newsFeed) {
                    const newElement = await getOneQuiz(element)
                    newsFeedArray.push(newElement)
                }

                const userData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    rating: user.rating,
                    quizesCreated: user.quizesCreated,
                    quizesNumber: user.quizesCreated.length,
                    dateCreated: user.dateCreated,
                    followers: user.followers,
                    following: user.following,
                    followersNumber: user.followersNumber,
                    followingNumber: user.followingNumber,
                    _id: user._id,
                    quizesSolved: user.quizesSolved,
                    followingId: user.following,
                    followersId: user.followers,
                    rating: user.rating,
                    newsFeed: newsFeedArray
                }


                if (user.newsFeed.length > 0) {
                    if (seen) {
                        for (let element of seen) {
                            for (let i = 0; i < user.newsFeed.length; i++) {

                                if (user.newsFeed[i]._id == element) {
                                    console.log('hereeeeee')
                                    user.newsFeedSeen.push(user.newsFeed[i])
                                    user.newsFeed.splice(i, 1)
                                    console.log(user.newsFeed)
                                    await user.save()
                                }
                            }

                        }
                    } else {
                        console.log('sssss')
                    }
                }






                await user.save()
            }


        }



        // console.log(userData)
        // res.json({ message: "Successfully accessed MY profile page", userData })



    } catch (err) {
        console.log(err)
    }





})

router.get('/markAsSeen/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const quiz = await getOneQuiz(id)

        const token = req.headers.token;
        const userData = parseJwt(token).email;
        const user = await getUserByEmail(userData)

        for (let i = 0; i < user.newsFeed.length; i++) {
            if (id == user.newsFeed[i]._id) {
                user.newsFeedSeen.push(quiz)
                user.newsFeed.splice(i, 1)
                await user.save()
            }
        }

        res.json({ message: "Successfully accessed MY profile page", user })

    } catch (err) {
        console.log(err)
    }
})

router.get('/getSeenQuizes', async (req, res) => {
    try {

        const token = req.headers.token;
        const userData = parseJwt(token).email;
        const user = await getUserByEmail(userData)



        res.json({ message: "Successfully accessed MY profile page", user })

    } catch (err) {
        console.log(err)
    }
})

router.put('/updateQuiz/:id', async (req, res) => {
    const id = req.params.id;

    const data = req.body.data;


    const result = await updateById(id, data);

    res.status(201).json({ result, message: 'Successfully edited' });


})


module.exports = router;