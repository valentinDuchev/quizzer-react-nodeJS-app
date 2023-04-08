import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { QuizQuestionsPage } from "../Quiz-questions-page/QuizQuesitonsPage"


export const QuizSolvePage = () => {

    const { quizId } = useParams();

    const [currentQuestion, setCurrentQuestion] = useState({
        id: '',
        question: '',
        correctAnswer: '',
        wrongAnswer1: '',
        wrongAnswer2: '',
        wrongAnswer3: ''
    })

    const [quizData, setQuizData] = useState({
        title: '',
        questionsNumber: '',
        questions: [{
            id: '',
            question: '',
            correctAnswer: '',
            wrongAnswer1: '',
            wrongAnswer2: '',
            wrongAnswer3: ''
        }]
    })


    const [currentUrlPath, setCurrentUrlPath ] = useState('pesho')

    const [isUrlValid, setIsUrlValid] = useState(true)

    const { questionNumber } = useParams('')

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/quiz/${quizId}`,{
                headers: {
                    'token': localStorage.getItem('accessToken')
                }
            })
            .then(res => {
                if (res.data.result) {
                    setQuizData({
                        title: res.data.result.title,
                        questions: res.data.result.questions,
                        questionsNumber: res.data.result.questions.length
                    })
                }


                if (questionNumber && quizData.questionsNumber) {
                    if (Number(questionNumber) > Number(quizData.questionsNumber)) {
                        setIsUrlValid(false)
                    }
                }

                const questionForCurrentQuestion = quizData.questions[Number(questionNumber) - 1]
                setCurrentQuestion({
                    id: questionForCurrentQuestion.id,
                    question: questionForCurrentQuestion.question,
                    correctAnswer: questionForCurrentQuestion.correctAnswer,
                    wrongAnswer1: questionForCurrentQuestion.wrongAnswer1,
                    wrongAnswer2: questionForCurrentQuestion.wrongAnswer2,
                    wrongAnswer3: questionForCurrentQuestion.wrongAnswer3

                })


                setCurrentUrlPath(window.location.pathname)
                
            })
            .catch((err => {
                console.log(err)
            }))
    }, [quizData.questions[0].question, isUrlValid, currentUrlPath])


    return (

        <div>

            {isUrlValid ? <QuizQuestionsPage
                questions={quizData.questions}
                // questionsNumber={quizData.questionsNumber}
                // title={quizData.title}
                // question={currentQuestion.question}
                // correctAnswer={currentQuestion.correctAnswer}
                // wrongAnswer1={currentQuestion.wrongAnswer1}
                // wrongAnswer2={currentQuestion.wrongAnswer2}
                // wrongAnswer3={currentQuestion.wrongAnswer3}
            /> : <p>asjajs</p>}

            <button >hjsdjhsdjhd</button>


        </div>

    )
}