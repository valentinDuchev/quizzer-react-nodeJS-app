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


module.exports = {

    getAllQuizes,
    createQuiz
}