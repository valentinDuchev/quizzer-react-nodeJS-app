const Member = require("../models/Member")

async function getAllMembers() {
    const result = await Member.find({});
    return result;
}

async function getMemberByCardNumber(cardNumber) {
    const result = await Recipe.findOne({ cardNumber });
    return result;
}

async function createCard(data) {
    const result = new Member(data);
    await result.save();

    return result;
}

async function updateCardValidation(card) {

}

module.exports = {
    getAllMembers,
    getMemberByCardNumber,
    createCard, 
    updateCardValidation
}