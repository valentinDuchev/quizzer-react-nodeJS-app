const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)$/;

const memberSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    dateCreated: {
        type: Date, 
        default: Date.now()
    },
    cardNumber: {
        type: Number,
        minlength: [3, "Card number has to be at least 3 digits long"]
    },
    dateCreated: {
        type: Date, 
        default: Date.now()
    }, 
    cardExpiryDate: {
        type: Date, 
        default: Date.now(), 
    },
    cardPrice: {
        type: Number, 
        required: [true, "Price is required"]
    },
    isValid: {
        type: Boolean, 
        default: true
    }

})

module.exports = model('Member', memberSchema)