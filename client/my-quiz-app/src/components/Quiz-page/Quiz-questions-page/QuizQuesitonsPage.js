import axios from "axios"
import { useEffect, useState } from "react"
import { Img } from "react-image"
import { Link, redirect, useParams, useNavigate } from "react-router-dom"
import styles from "./QuizQuestionsPage.module.css"

export const QuizQuestionsPage = (props) => {

    const [isHoveredA, setIsHoveredA] = useState(false)
    const [isHoveredB, setIsHoveredB] = useState(false)
    const [isHoveredC, setIsHoveredC] = useState(false)
    const [isHoveredD, setIsHoveredD] = useState(false)

    const [nextUrl, setNextUrl] = useState('')

    const applyStyleOnClick = (e) => {
        console.log(e.target)
    }

    const [currentQuestion, setCurrentQuestion] = useState({
        id: '',
        question: '',
        correctAnswer: '',
        wrongAnswer1: '',
        wrongAnswer2: '',
        wrongAnswer3: '',
    })


    const onMouseEnterFunc = (e) => {

        if (e.target.children[1].getAttribute('name') === 'labelA') {
            setIsHoveredA(true)
        } else if (e.target.children[1].getAttribute('name') === 'labelB') {
            setIsHoveredB(true)
        } else if (e.target.children[1].getAttribute('name') === 'labelC') {
            setIsHoveredC(true)
        } else if (e.target.children[1].getAttribute('name') === 'labelD') {
            setIsHoveredD(true)
        }
    }

    const onMouseLeaveFunc = (e) => {
        if (e.target.children[1].getAttribute('name') === 'labelA') {
            setIsHoveredA(false)
        } else if (e.target.children[1].getAttribute('name') === 'labelB') {
            setIsHoveredB(false)
        } else if (e.target.children[1].getAttribute('name') === 'labelC') {
            setIsHoveredC(false)
        } else if (e.target.children[1].getAttribute('name') === 'labelD') {
            setIsHoveredD(false)
        }
    }

    const [questionsNumber, setQuestionsNumber] = useState('');

    const { quizId } = useParams()
    const { questionNumber } = useParams('questionNumber')


    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/quiz/${quizId}`)
            .then(res => {
                if (res.data.result) {
                    setQuestionsNumber(res.data.result.questions.length)
                }
                if (Number(questionNumber) < Number(questionsNumber)) {
                    setNextUrl(`/quiz-page/64260bf31aff927732b8fa93/question/${Number(questionNumber) + 1}`)
                    // console.log(nextUrl)
                } else {
                    setNextUrl(`/quiz-page/${quizId}/finalPage/`)
                    // console.log(nextUrl)
                }


                console.log(props.questions[0].id)


                setCurrentQuestion({
                    id: props.questions[Number(questionNumber - 1)].id,
                    question: props.questions[Number(questionNumber - 1)].question,
                    correctAnswer: props.questions[Number(questionNumber - 1)].correctAnswer,
                    wrongAnswer1: props.questions[Number(questionNumber - 1)].wrongAnswer1,
                    wrongAnswer2: props.questions[Number(questionNumber - 1)].wrongAnswer2,
                    wrongAnswer3: props.questions[Number(questionNumber - 1)].wrongAnswer3,
                })


                console.log(currentQuestion)
            })
            .catch((err => {
                console.log(err)
            }))
    }, [questionsNumber, questionNumber, nextUrl, currentQuestion.id])





    return (
        <div className={styles.entireDiv}>
            <section className={styles.section} id="section-2">
                <main>
                    <div className={styles.textContainer}>
                        <h3>{props.title}</h3>
                        <p>QUESTION {questionNumber} OF {props.questionsNumber}</p>
                        <p>{currentQuestion.question}</p>
                    </div>
                    <form>
                        <div className={styles.quizOptions}>

                            <div
                                onClick={(e) => applyStyleOnClick(e)}
                                onMouseEnter={(e) => onMouseEnterFunc(e)}
                                onMouseLeave={(e) => onMouseLeaveFunc(e)}
                            >
                                <input type="radio" id="first" name="first" onClick={(e) => applyStyleOnClick(e)} />
                                <label
                                    style={{
                                        background: isHoveredA
                                            ? 'linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)'
                                            : 'linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)',
                                        marginTop: '-30px',
                                        color: '#fff',
                                        pointerEvents: 'none'


                                    }}
                                    className={styles.jsjwjdwjdwjdwin}
                                    htmlFor="first"
                                    name='labelA'
                                >
                                    <span className={styles.alphabet} >A</span> {currentQuestion.correctAnswer}
                                </label>
                            </div>


                        </div>

                        <div className={styles.quizOptions}>

                            <div
                                onClick={(e) => applyStyleOnClick(e)}
                                onMouseEnter={(e) => onMouseEnterFunc(e)}
                                onMouseLeave={(e) => onMouseLeaveFunc(e)}
                            >
                                <input type="radio" id="first" name="first" onClick={(e) => applyStyleOnClick(e)} />
                                <label
                                    style={{
                                        background: isHoveredB
                                            ? 'linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)'
                                            : 'linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)',
                                        marginTop: '-30px',
                                        color: '#fff',
                                        pointerEvents: 'none'

                                    }}
                                    className={styles.jsjwjdwjdwjdwin}
                                    htmlFor="first"
                                    name='labelB'
                                >
                                    <span className={styles.alphabet} >B</span> {currentQuestion.wrongAnswer1}
                                </label>
                            </div>


                        </div>

                        <div className={styles.quizOptions}>

                            <div
                                onClick={(e) => applyStyleOnClick(e)}
                                onMouseEnter={(e) => onMouseEnterFunc(e)}
                                onMouseLeave={(e) => onMouseLeaveFunc(e)}
                            >
                                <input type="radio" id="first" name="first" onClick={(e) => applyStyleOnClick(e)} />
                                <label
                                    style={{
                                        background: isHoveredC
                                            ? 'linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)'
                                            : 'linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)',
                                        marginTop: '-30px',
                                        color: '#fff',
                                        pointerEvents: 'none'

                                    }}
                                    className={styles.jsjwjdwjdwjdwin}
                                    htmlFor="first"
                                    name='labelC'
                                >
                                    <span className={styles.alphabet} >C</span> {currentQuestion.wrongAnswer2}
                                </label>
                            </div>


                        </div>

                        <div className={styles.quizOptions}>

                            <div
                                onClick={(e) => applyStyleOnClick(e)}
                                onMouseEnter={(e) => onMouseEnterFunc(e)}
                                onMouseLeave={(e) => onMouseLeaveFunc(e)}
                            >
                                <input type="radio" id="first" name="first" onClick={(e) => applyStyleOnClick(e)} />
                                <label
                                    style={{
                                        background: isHoveredD
                                            ? 'linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)'
                                            : 'linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)',
                                        marginTop: '-30px',
                                        color: '#fff',
                                        pointerEvents: 'none'
                                    }}
                                    className={styles.jsjwjdwjdwjdwin}
                                    htmlFor="first"
                                    name='labelD'
                                >
                                    <span className={styles.alphabet} >D</span> {currentQuestion.wrongAnswer3}
                                </label>
                            </div>


                            <Link to={`${nextUrl}`}>
                                <button>Next</button>
                            </Link>
                        </div>


                        {/* <a id="btn" type="submit" onclick="window.location.href='#section-3'">Next</a> */}
                    </form>
                </main>
            </section>
        </div >
    )
}