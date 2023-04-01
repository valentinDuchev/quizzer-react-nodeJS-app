import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { QuizHomePage } from "../Quiz-page/QUiz-Home-Page/QuizHomePage";
import { QuizQuestionsPage } from "../Quiz-page/Quiz-questions-page/QuizQuesitonsPage";
import { QuizSolvePage } from "../Quiz-page/QuizSolvePage/QuizSolvePage";



export const QuizPage = () => {

    const { quizId, pageType, questionNumber } = useParams();

    const [isFirstPage, setIsFirstPage] = useState(false)
    const [isQuestionPage, setIsQuestionPage] = useState(false)
    const [isLastPage, setIsLastPage] = useState(false)
    const [isUndefinedPage, setIsUndefinedPage] = useState('false')


    useEffect(() => {
        if (pageType === 'firstPage') {
            setIsFirstPage(true)
            setIsQuestionPage(false)
            setIsLastPage(false)
            setIsUndefinedPage(false)
        } else if (pageType === 'question') {
            setIsFirstPage(false)
            setIsQuestionPage(true)
            setIsLastPage(false)
            setIsUndefinedPage(false)
        } else if (pageType === 'finalPage') {
            setIsFirstPage(false)
            setIsQuestionPage(false)
            setIsLastPage(true)
            setIsUndefinedPage(false)
        } else {
            setIsFirstPage(false)
            setIsQuestionPage(false)
            setIsLastPage(false)
            setIsUndefinedPage(true)
        }
    })
    return (
        <>


            
            {isFirstPage && <QuizHomePage/>}
            {isQuestionPage && <QuizSolvePage/>}
            {isLastPage && <h1 style={{ color: 'white' }}>{pageType}</h1>}
            {isUndefinedPage && <h1 style={{ color: 'white' }}>Undefined</h1>}


        </>
    )
}