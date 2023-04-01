const router = require('express').Router();

const { getAllQuizes, createQuiz, getOneQuiz } = require('../controllers/quizesController')

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

        res.status(201).json({ message: 'Quiz created successfully' });
    } catch (err) {
        res.json({ message: err.message })
        console.log(err)
    }

});

router.get('/quiz/:id', async (req, res) => {

    try {

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
            questions: (data.questions)
        }

        // console.log(result)
        console.log(data.questions)

        res.status(200).json({ message: "Successfully opened details", result });


    } catch (err) {
        console.log(err)
    }


})


module.exports = router;