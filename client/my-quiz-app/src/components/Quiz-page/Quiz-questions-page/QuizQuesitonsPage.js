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

    const [isYourAnswerTrue, setIsYourAnswerTrue] = useState(false)

    const [isFirstClicked, setIsFirstClicked] = useState(false)
    const [isSecondClicked, setIsSecondClicked] = useState(false)
    const [isThirdClicked, setIsThirdClicked] = useState(false)
    const [isFourthClicked, setIsFourthClicked] = useState(false)

    const [isDivDisabled, setIsDivDisabled] = useState('')

    const [firstAnswerStyle, setFirstAnswerStyle] = useState('')
    const [secondAnswerStyle, setSecondAnswerStyle] = useState('')
    const [thirdAnswerStyle, setThirdAnswerStyle] = useState('')
    const [fourthAnswerStyle, setFourthAnswerStyle] = useState('')



    const applyStyleOnClick = (e) => {

        const yourAnswer = e.target.getAttribute('name')
        const id = e.target.getAttribute('id')


        if (correctAnswer) {
            if (yourAnswer === correctAnswer) {
                setIsYourAnswerTrue(true)
            } else {
                setIsYourAnswerTrue(false)
            }
        }

        if (id === 'first') {
            setIsFirstClicked(true)
        } else if (id === 'second') {
            setIsSecondClicked(true)
        } else if (id === 'third') {
            setIsThirdClicked(true)
        } else if (id === 'fourth') {
            setIsFourthClicked(true)
        }

    }

    const [currentQuestion, setCurrentQuestion] = useState({
        id: '',
        question: '',
        correctAnswer: '',
        wrongAnswer1: '',
        wrongAnswer2: '',
        wrongAnswer3: '',
    })

    const [newCurrentQuestion, setNewCurrentQuestion] = useState({
        id: '',
        question: '',
        first: '',
        second: '',
        third: '',
        fourth: ''
    })

    const [correctAnswer, setCorrectAnswer] = useState('')


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

    const currentUrl = window.location.pathname;


    useEffect(() => { //TODO - if possible, divide that useEffect into 2/3 smaller useEffects
        axios
            .get(`http://localhost:3001/api/quiz/${quizId}`)
            .then(res => {
                if (res.data.result) {
                    setQuestionsNumber(res.data.result.questions.length)
                }
                if (Number(questionNumber) < Number(questionsNumber)) {
                    setNextUrl(`/quiz-page/64260bf31aff927732b8fa93/question/${Number(questionNumber) + 1}`)


                } else {
                    setNextUrl(`/quiz-page/${quizId}/finalPage/`)
                }

                console.log(currentUrl)
                console.log(nextUrl)

                setCurrentQuestion({
                    id: props.questions[Number(questionNumber - 1)].id,
                    question: props.questions[Number(questionNumber - 1)].question,
                    correctAnswer: props.questions[Number(questionNumber - 1)].correctAnswer,
                    wrongAnswer1: props.questions[Number(questionNumber - 1)].wrongAnswer1,
                    wrongAnswer2: props.questions[Number(questionNumber - 1)].wrongAnswer2,
                    wrongAnswer3: props.questions[Number(questionNumber - 1)].wrongAnswer3,
                })

                if (currentQuestion) {
                    setCorrectAnswer(currentQuestion.correctAnswer)
                }

                {/*  First onclick*/ }

                if (!isFirstClicked && isHoveredA) {
                    console.log(isHoveredA)
                    setFirstAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)')
                }

                if (!isFirstClicked && !isHoveredA) {
                    setFirstAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)')
                }

                if (isFirstClicked && isYourAnswerTrue) {
                    setFirstAnswerStyle('green')
                    setIsDivDisabled('none')
                }

                if (isFirstClicked && !isYourAnswerTrue) {
                    setFirstAnswerStyle('red')
                    setIsDivDisabled('none')
                }

                {/* Second onclick */ }


                if (!isSecondClicked && isHoveredB) {
                    console.log(isHoveredA)
                    setSecondAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)')
                }

                if (!isSecondClicked && !isHoveredB) {
                    setSecondAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)')
                }

                if (isSecondClicked && isYourAnswerTrue) {
                    setSecondAnswerStyle('green')
                    setIsDivDisabled('none')
                    
                }

                if (isSecondClicked && !isYourAnswerTrue) {
                    setSecondAnswerStyle('red')
                    setIsDivDisabled('none')
                }

                {/* Third onclick */ }


                if (!isThirdClicked && isHoveredC) {
                    console.log(isHoveredA)
                    setThirdAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)')
                }

                if (!isThirdClicked && !isHoveredC) {
                    setThirdAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)')
                }

                if (isThirdClicked && isYourAnswerTrue) {
                    setThirdAnswerStyle('green')
                    setIsDivDisabled('none')
                }

                if (isThirdClicked && !isYourAnswerTrue) {
                    setThirdAnswerStyle('red')
                    setIsDivDisabled('none')
                }
                {/* Fourth onclick */ }

                if (!isFourthClicked && isHoveredD) {
                    console.log(isHoveredA)
                    setFourthAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)')
                }

                if (!isFourthClicked && !isHoveredD) {
                    setFourthAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)')
                }

                if (isFourthClicked && isYourAnswerTrue) {
                    setFourthAnswerStyle('green')
                    setIsDivDisabled('none')
                }

                if (isFourthClicked && !isYourAnswerTrue) {
                    setFourthAnswerStyle('red')
                    setIsDivDisabled('none')
                }

            })
            .catch((err => {
                console.log(err)
            }))

    }, [questionsNumber,
        questionNumber,
        nextUrl,
        currentQuestion.id,
        correctAnswer,
        isYourAnswerTrue,
        isFirstClicked,
        isSecondClicked,
        isThirdClicked,
        isFourthClicked,
        firstAnswerStyle,
        secondAnswerStyle,
        thirdAnswerStyle,
        fourthAnswerStyle,
        isHoveredA,
        isHoveredB,
        isHoveredC,
        isHoveredD,
        isDivDisabled
    ])

    useEffect(() => {

        var randomProperty = function (obj) {
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }

            const newKeysArray = [];
            const keys = Object.keys(obj).slice(2, obj.length)

            for (let i = 0; i <= keys.length + 2; i++) {
                let currentKey = keys[getRandomInt(keys.length)];
                const index = keys.indexOf(currentKey);
                if (index > -1) { // only splice array when item is found
                    keys.splice(index, 1); // 2nd parameter means remove one item only
                }
                newKeysArray.push(currentKey)
            }
            return newKeysArray
        };

        const propertyArray = (randomProperty(currentQuestion))

        const firstProperty = propertyArray[0]
        const secondProperty = propertyArray[1]
        const thirdProperty = propertyArray[2]
        const fourthProperty = propertyArray[3]

        const firstKey = currentQuestion[firstProperty]
        const secondKey = currentQuestion[secondProperty]
        const thirdKey = currentQuestion[thirdProperty]
        const fourthKey = currentQuestion[fourthProperty]

        setNewCurrentQuestion({
            first: firstKey,
            second: secondKey,
            third: thirdKey,
            fourth: fourthKey
        })

    }, [currentQuestion.id])

    //TODO!!!!!!!!!! divide into smaller use effects as it re-renders on each action (almost)

    const onButtonClick = () => {
        setIsFirstClicked(false)
        setIsSecondClicked(false)
        setIsThirdClicked(false)
        setIsFourthClicked(false)
        setIsDivDisabled('')

    }


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
                                name={newCurrentQuestion.first}
                                id='first'
                                style={{
                                    pointerEvents: isDivDisabled
                                }}
                            >
                                <input type="radio" id="first" name="first" onClick={(e) => applyStyleOnClick(e)} />
                                <label
                                    style={{
                                        background: firstAnswerStyle,
                                        marginTop: '-30px',
                                        color: '#fff',
                                        pointerEvents: 'none',
                                    }}
                                    className={styles.jsjwjdwjdwjdwin}
                                    htmlFor="first"
                                    name='labelA'
                                >
                                    <span className={styles.alphabet} >A</span> {newCurrentQuestion.first}
                                </label>
                            </div>


                        </div>

                        <div className={styles.quizOptions}>

                            <div
                                onClick={(e) => applyStyleOnClick(e)}
                                onMouseEnter={(e) => onMouseEnterFunc(e)}
                                onMouseLeave={(e) => onMouseLeaveFunc(e)}
                                name={newCurrentQuestion.second}
                                id='second'
                                style={{
                                    pointerEvents: isDivDisabled
                                }}
                            >
                                <input type="radio" id="first" name="first" onClick={(e) => applyStyleOnClick(e)} />
                                <label
                                    style={{
                                        background: secondAnswerStyle,
                                        marginTop: '-30px',
                                        color: '#fff',
                                        pointerEvents: 'none'
                                    }}
                                    className={styles.jsjwjdwjdwjdwin}
                                    htmlFor="first"
                                    name='labelB'
                                >
                                    <span className={styles.alphabet} >B</span> {newCurrentQuestion.second}
                                </label>
                            </div>


                        </div>

                        <div className={styles.quizOptions}>

                            <div
                                onClick={(e) => applyStyleOnClick(e)}
                                onMouseEnter={(e) => onMouseEnterFunc(e)}
                                onMouseLeave={(e) => onMouseLeaveFunc(e)}
                                name={newCurrentQuestion.third}
                                id='third'
                                style={{
                                    pointerEvents: isDivDisabled
                                }}
                            >
                                <input type="radio" id="first" name="first" onClick={(e) => applyStyleOnClick(e)} />
                                <label
                                    style={{
                                        background: thirdAnswerStyle,
                                        marginTop: '-30px',
                                        color: '#fff',
                                        pointerEvents: 'none',
                                    }}
                                    className={styles.jsjwjdwjdwjdwin}
                                    htmlFor="first"
                                    name='labelC'
                                >
                                    <span className={styles.alphabet} >C</span> {newCurrentQuestion.third}
                                </label>
                            </div>


                        </div>

                        <div className={styles.quizOptions}>

                            <div
                                onClick={(e) => applyStyleOnClick(e)}
                                onMouseEnter={(e) => onMouseEnterFunc(e)}
                                onMouseLeave={(e) => onMouseLeaveFunc(e)}
                                name={newCurrentQuestion.fourth}
                                id='fourth'
                                style={{
                                    pointerEvents: isDivDisabled
                                }}
                            >
                                <input type="radio" id="first" name="first" onClick={(e) => applyStyleOnClick(e)} />
                                <label
                                    style={{
                                        background: fourthAnswerStyle,
                                        marginTop: '-30px',
                                        color: '#fff',
                                        pointerEvents: 'none'
                                    }}
                                    className={styles.jsjwjdwjdwjdwin}
                                    htmlFor="first"
                                    name='labelD'
                                >
                                    <span className={styles.alphabet} >D</span> {newCurrentQuestion.fourth}
                                </label>
                            </div>


                            <Link to={`${nextUrl}`} >
                                <button onClick={onButtonClick}>Next</button>
                            </Link>
                        </div>


                        {/* <a id="btn" type="submit" onclick="window.location.href='#section-3'">Next</a> */}
                    </form>
                </main>
            </section>
        </div >
    )
}