const express = require('express');
const corsMiddleware = require('./middlewares/cors');

require('dotenv').config();

const databaseConfig = require('./config/database');


const quizesController = require('./router/quizzerRouter')
const userController = require('./router/userRouter')
const cookieParser = require('cookie-parser');

start();

async function start() {
    const app = express();
    await databaseConfig(app);


    app.use(express.json());

    // app.use(corsMiddleware);

    const cors = require("cors");
    const corsOptions = {
        origin: '*',
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    }

    app.use(cors(corsOptions))

    app.use((req, res, next) => {
        next()
    })


    app.use(cookieParser());


    app.use('/api', quizesController)
    app.use('/api', userController)

    app.get('/', (req, res) => {
        res.json({ message: 'It works' })
    })

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server started on port ${port}`));
}