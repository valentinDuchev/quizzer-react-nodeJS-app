const { Schema, model, Types: {ObjectId} } = require('mongoose');
const {quizSchema} = require('./Quiz')

const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


const userSchema = new Schema({
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    hashedPassword: { type: String },
    // gender: { type: String, required: [true, 'Gender is required'] },
    email: {
        type: String, required: [true, 'Email is required'], validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value)
            }, message: "You must enter a valid Email"
        }
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    // posted: { type: [recipeSchema] },
    followingNumber: { type: Number, default: 0 }, 
    followersNumber: { type: Number, default: 0}, 
    following: {type: [ObjectId], ref: 'User'},
    followers: { type: [ObjectId], ref: 'User'},
    rating: { type: Number, default: 0 }, 
    quizesCreated: { type: [quizSchema], default: []}, 
    quizesSolved: { type: [quizSchema], default: []}, 
    quizesRated: { type: [quizSchema]}, 
    newsFeed: {type: [quizSchema]}, 
    newsFeedSeen: {type: [quizSchema]}
});

userSchema.index({ email: 1 }, {
    unique: true, 
    collation: {
        locale: 'en', 
        strength: 2
    }
});

module.exports = model('User', userSchema);