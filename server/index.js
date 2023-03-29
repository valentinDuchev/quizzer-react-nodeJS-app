const express = require('express');
const corsMiddleware = require('./middlewares/cors');

require('dotenv').config();

const databaseConfig = require('./config/database');

const recipeController = require('./router/recipeRouter');
const userController = require('./router/userRouter');
const memberController = require('./router/memberRouter')
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

    // app.use('/api', recipeController);
    // app.use('/api', userController);  

    app.use('/api', memberController)

    app.get('/', (req, res) => {
        res.json({ message: 'It works' })
    })

    app.listen(3001, () => console.log('Server started on port 3001'));
}