

export const QuizFinalPage = (props) =>  {

    const result = localStorage.getItem('currentResult')
    const totalQuestionsNumber = localStorage.getItem('questionsNumber')


    return (
        <div>
            Your result is: {result}/{totalQuestionsNumber}
        </div>
    )

}

