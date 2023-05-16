import axios from "axios"
import { useEffect, useState } from "react"
import { Img } from "react-image"
import { Link, redirect, useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./QuizQuestionsPage.module.css"


export const QuizQuestionsPage = (props) => {

    const [isHoveredA, setIsHoveredA] = useState(false)  //Setting style to the answers when hovered and still not clicked (answered)
    const [isHoveredB, setIsHoveredB] = useState(false)
    const [isHoveredC, setIsHoveredC] = useState(false)
    const [isHoveredD, setIsHoveredD] = useState(false)

    const [nextUrl, setNextUrl] = useState('') //Setting next url for when the user Clicks button Next

    const [isYourAnswerTrue, setIsYourAnswerTrue] = useState(false) //Setting the answer of the customer: In case it is true or false

    const [isFirstClicked, setIsFirstClicked] = useState(false)
    const [isSecondClicked, setIsSecondClicked] = useState(false)
    const [isThirdClicked, setIsThirdClicked] = useState(false)
    const [isFourthClicked, setIsFourthClicked] = useState(false)

    const [isDivDisabled, setIsDivDisabled] = useState('')

    const [firstAnswerStyle, setFirstAnswerStyle] = useState('')
    const [secondAnswerStyle, setSecondAnswerStyle] = useState('')
    const [thirdAnswerStyle, setThirdAnswerStyle] = useState('')
    const [fourthAnswerStyle, setFourthAnswerStyle] = useState('')

    const [answeredSpan, setAnsweredSpan] = useState('')

    const [currentResult, setCurrentResult] = useState(0)

    const applyStyleOnClick = (e) => {

        const yourAnswer = e.target.getAttribute('name')
        const id = e.target.getAttribute('id')


        if (correctAnswer) {
            if (yourAnswer === correctAnswer) {
                setIsYourAnswerTrue(true)
                setCurrentResult(currentResult + 1);
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
        fourth: '',
        isAlreadyAnswered: false
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



    useEffect(() => { //TODO - if possible, divide that useEffect into 2/3 smaller useEffects
        axios
            .get(`https://quizzer-react-node-js-app-dz4a.vercel.app/api/quiz/${quizId}`, {
                headers: {
                    'token': localStorage.getItem('accessToken')
                }
            })
            .then(res => {
                if (res.data.result) {
                    setQuestionsNumber(res.data.result.questions.length)
                }
                if (Number(questionNumber) < Number(questionsNumber)) {
                    setNextUrl(`/quiz-page/${quizId}/question/${Number(questionNumber) + 1}`)


                } else {
                    setNextUrl(`/quiz-page/${quizId}/finalPage/`)
                }




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
                    setFirstAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)')
                }

                if (!isFirstClicked && !isHoveredA) {
                    setFirstAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)')
                }

                if (isFirstClicked && isYourAnswerTrue) {
                    setFirstAnswerStyle('green')
                    setIsDivDisabled('none')
                    localStorage.setItem(currentQuestion.question, true)
                }

                if (isFirstClicked && !isYourAnswerTrue) {
                    setFirstAnswerStyle('red')
                    setIsDivDisabled('none')
                    localStorage.setItem(currentQuestion.question, true)
                }

                {/* Second onclick */ }


                if (!isSecondClicked && isHoveredB) {
                    setSecondAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)')
                }

                if (!isSecondClicked && !isHoveredB) {
                    setSecondAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)')
                }

                if (isSecondClicked && isYourAnswerTrue) {
                    setSecondAnswerStyle('green')
                    setIsDivDisabled('none')
                    localStorage.setItem(currentQuestion.question, true)
                }

                if (isSecondClicked && !isYourAnswerTrue) {
                    setSecondAnswerStyle('red')
                    setIsDivDisabled('none')
                    localStorage.setItem(currentQuestion.question, true)
                }

                {/* Third onclick */ }


                if (!isThirdClicked && isHoveredC) {
                    setThirdAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)')
                }

                if (!isThirdClicked && !isHoveredC) {
                    setThirdAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)')
                }

                if (isThirdClicked && isYourAnswerTrue) {
                    setThirdAnswerStyle('green')
                    setIsDivDisabled('none')
                    localStorage.setItem(currentQuestion.question, true)
                }

                if (isThirdClicked && !isYourAnswerTrue) {
                    setThirdAnswerStyle('red')
                    setIsDivDisabled('none')
                    localStorage.setItem(currentQuestion.question, true)
                }
                {/* Fourth onclick */ }

                if (!isFourthClicked && isHoveredD) {
                    setFourthAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(3,63,171,1) 0%, rgba(29,85,212,1) 100%)')
                }

                if (!isFourthClicked && !isHoveredD) {
                    setFourthAnswerStyle('linear-gradient(90deg, rgba(68,214,243,1) 0%, rgba(10,93,241,1) 100%, rgba(29,85,212,1) 100%)')
                }

                if (isFourthClicked && isYourAnswerTrue) {
                    setFourthAnswerStyle('green')
                    setIsDivDisabled('none')
                    localStorage.setItem(currentQuestion.question, true)
                }

                if (isFourthClicked && !isYourAnswerTrue) {
                    setFourthAnswerStyle('red')
                    setIsDivDisabled('none')
                    localStorage.setItem(currentQuestion.question, true)
                }

                const questionNow = currentQuestion.question

                const isQuestionAnsweredNow = localStorage.getItem(questionNow)
                if (isQuestionAnsweredNow) {
                    setIsDivDisabled('none')
                    setAnsweredSpan('You have answered to that question. Please go forward')
                } else {
                    setAnsweredSpan('')
                    setIsDivDisabled('')
                }

                localStorage.setItem('currentResult', currentResult)
                localStorage.setItem('questionsNumber', props.questions.length)



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


    }, [currentQuestion.id, newCurrentQuestion.first])


    const onButtonClick = () => {
        setIsFirstClicked(false)
        setIsSecondClicked(false)
        setIsThirdClicked(false)
        setIsFourthClicked(false)
        setIsDivDisabled('')

    }


    return (
        <div className={styles.entireDiv}>
            <span style={{ backgroundColor: 'red' }}>{answeredSpan}</span>
            <section className={styles.section} id="section-2">
                <main>
                    <div className={styles.mainDiv}>
                        <div className={styles.textContainer}>
                            <h3>{props.title}</h3>
                            <p>QUESTION {questionNumber} OF {props.questions.length}</p>
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



                            </div>

                            <Link to={`${nextUrl}`} >
                                <button onClick={onButtonClick} className={styles.nextBtn}>Next</button>
                                {/* onClick={onButtonClick} */}
                            </Link>


                            {/* <a id="btn" type="submit" onclick="window.location.href='#section-3'">Next</a> */}
                        </form>
                    </div>
                </main>
            </section>
        </div >
    )
}