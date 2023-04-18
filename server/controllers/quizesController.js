const Quiz = require("../models/Quiz")

async function getAllQuizes() {
    const result = await Quiz.find({});
    return result;
}

async function createQuiz(data) {
    const result = new Quiz(data);
    await result.save();

    return result;
}

async function getOneQuiz (_id) {
    const result = await Quiz.findOne({_id})
    return result;
}

async function deleteById(id) {
    await Quiz.findByIdAndDelete(id);
}

async function updateById (id, data) {
    const result = await Quiz.findByIdAndUpdate(id, data);
    await result.save();

    return result;
}


module.exports = {
    getAllQuizes,
    createQuiz,
    getOneQuiz,
    deleteById, 
    updateById
}