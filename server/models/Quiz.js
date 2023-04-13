const { Schema, model, Types: { ObjectId } } = require('mongoose');


const quizSchema = new Schema({

    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
    },
    topic: {
        type: String,
        required: [true, 'Topic is required']
    },
    difficulty: {
        type: String,
        required: [true, 'Difficulty is required']
    },
    questions: {
        type: [{
            id: Number,
            question: String,
            correctAnswer: String,
            wrongAnswer1: String,
            wrongAnswer2: String,
            wrongAnswer3: String
        }]
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: [true, "Author is required"]
    },
    authorEmail: {
        type: String,
        required: [true, 'author email is required']
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    viewed: {
        Type: Number,
        default: 0
    },
    solved: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    peopleLiked: {
        type: [ObjectId],
        ref: 'User'
    },
    peopleDisliked: {
        type: [ObjectId],
        ref: 'User'
    },
    peopleSolved: {
        type: [{}],
        ref: 'User'
    }, 
    rating: {type: Number, default: 0}, 
    ratedNumber: { type: Number, default: 0}

    /* TODO
    peopleLiked, 
    peopleDisliked, 
    peopleSolved
    */





})


module.exports = model('Quiz', quizSchema)