const mongoose = require('mongoose');
require('../models/Quiz');

//TODO - change database name
const dbName = 'quizzer';

// const connectionString = `mongodb://localhost:27017/${dbName}`;

 const connectionString = `mongodb+srv://valentinduchev:quizzer-cska1948@quizzer.hval4im.mongodb.net/?retryWrites=true&w=majority`;


module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        });
    } catch (err) {
        console.error('Error connecting to database');
        proccess.exit(1);
    }
}