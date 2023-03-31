const router = require('express').Router();

const { getAllQuizes, createQuiz } = require('../controllers/quizesController')

router.get('/allQuizes', async (req, res) => {
    const result = await getAllQuizes();

    res.status(200).json({ result, message: 'success' })
})

router.post('/createQuiz', async (req, res) => {
    try {


        console.log('yes')

        const data = {
            title: req.body.title,
            description: req.body.description,
            topic: req.body.topic,
            difficulty: req.body.difficulty,
            questions: req.body.questions
        };

        console.log(data)



        // console.log(req.headers)

        const result = await createQuiz(data);

        res.status(201).json({  message: 'Quiz created successfully' });
    } catch (err) {
        res.json({ message: err.message })
        console.log(err)
    }

});


module.exports = router;