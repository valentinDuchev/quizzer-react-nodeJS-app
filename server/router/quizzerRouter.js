const router = require('express').Router();

const { getAllQuizes, createQuiz, getOneQuiz } = require('../controllers/quizesController');
const { getUserByEmail, getUserById } = require('../controllers/userController')
const { parseJwt } = require('../middlewares/auth');
const User = require('../models/User');

router.get('/allQuizes', async (req, res) => {
    const result = await getAllQuizes();

    res.status(200).json({ result, message: 'success' })
})

router.post('/createQuiz', async (req, res) => {
    try {

        console.log('create')

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

        console.log(data)



        // console.log(req.headers)

        const result = await createQuiz(data);
        user.quizesCreated.push(result)
        await user.save()
        console.log(result)

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
        console.log(user.email)

        const id = req.params.id;
        const data = await getOneQuiz(id);


        const result = {
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

        console.log(result)
        console.log(data.questions)

        let isAuthor = true;

        if (user.email !== data.authorEmail) {
            isAuthor = false;
        }



        res.status(200).json({ message: "Successfully opened details", result, isAuthor });  //isauthor


    } catch (err) {
        console.log(err)
    }


})

router.get('/quiz/:id/solve', async (req, res) => {
    const id = req.params.id;

    const token = req.headers.token;

    const result = req.headers.result
    const userData = parseJwt(token);
    const user = await getUserByEmail(userData.email);

    const quiz = await getOneQuiz(id);

    const userId = user.email

    const newObj = {
        userId,
        result
    }


    quiz.peopleSolved.push(newObj)

    await quiz.save();

    console.log(quiz)




})


module.exports = router;