const { Schema, model, Types: { ObjectId } } = require('mongoose');


const quizSchema = new Schema ({

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
        type: String, //TODO - FIX AUTHOR ONCE AUTH IS DONE
        required: [true, 'Author is required'], 
        default: 'pesho'
    }, 
    /* dateCreated: {

    } */
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
    // comments: {
        //TODO
    // }
    rating: {
        type: Number, 
        default: 0
    }, 
    /* TODO
    peopleLiked, 
    peopleDisliked, 
    peopleSolved
    */





})


module.exports = model('Quiz', quizSchema)