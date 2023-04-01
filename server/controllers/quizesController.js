const Quiz = require("../models/Quiz")

async function getAllQuizes() {
    const result = await Quiz.find({});
    return result;
}

async function createQuiz(data) {
    const result = new Quiz(data);
    console.log(data)
    await result.save();

    return result;
}

async function getOneQuiz (_id) {
    const result = await Quiz.findOne({_id})
    return result;
}


module.exports = {
    getAllQuizes,
    createQuiz,
    getOneQuiz
}