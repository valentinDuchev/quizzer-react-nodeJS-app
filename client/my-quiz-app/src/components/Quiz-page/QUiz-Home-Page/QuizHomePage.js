import axios from "axios"
import { createRef, useEffect, useState } from "react"
import { Img } from "react-image"

import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './QuizHomePage.module.css'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const QuizHomePage = () => {

    const navigate = useNavigate()

    const [show, setShow] = useState(false);


    const [isAuthor, setIsAuthor] = useState(true)
    const token = localStorage.getItem('accessToken')

    const [alreadySolved, setAlreadySolved] = useState(false)

    const [editShow, setEditShow] = useState(false)
    const [detailsShow, setDetailsShow] = useState(false)

    const [question, setQuestion] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [wrongAnswer1, setWrongAnswer1] = useState('')
    const [wrongAnswer2, setWrongAnswer2] = useState('')
    const [wrongAnswer3, setWrongAnswer3] = useState('')

    const [questionArray, setQuestionArray] = useState([])
    const [correctAnswerArray, setCorrectAnswerArray] = useState([])
    const [wrongAnswer1Array, setWrongAnswer1Array] = useState([])
    const [wrongAnswer2Array, setWrongAnswer2Array] = useState([])
    const [wrongAnswer3Array, setWrongAnswer3Array] = useState([])
    

    const [madeArrays, setMadeArrays] = useState(false)

    const [errorsQuestion, setErrorsQuestion] = useState('')
    const [errorsCorrectAnswer, setErrorsCorrectAnswer] = useState('')
    const [errorsWrongAnswer1, setErrorsWrongAnswer1] = useState('')
    const [errorsWrongAnswer2, setErrorsWrongAnswer2] = useState('')
    const [errorsWrongAnswer3, setErrorsWrongAnswer3] = useState('')


    const [currentQuizId, setCurrentQuizId] = useState('')
    const [quizData, setQuizData] = useState({
        author: '',
        _id: '',
        difficulty: '',
        dislikes: '',
        likes: '',
        description: '',
        rating: '',
        solved: '',
        title: '',
        topic: ''
    })

    const { quizId } = useParams();

    useEffect(() => {
        setCurrentQuizId(quizId)
        if (currentQuizId !== '') {

            try {
                console.log(token)
                fetch(`http://localhost:3001/api/quiz/${currentQuizId}`, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'token': token
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.result) {
                            setQuizData({
                                author: data.result.authorEmail,
                                _id: data.result._id,
                                difficulty: data.result.difficulty,
                                dislikes: data.result.dislikes,
                                likes: data.result.likes,
                                description: data.result.description,
                                rating: data.result.rating,
                                solved: data.result.solved,
                                title: data.result.title,
                                topic: data.result.topic,
                                peopleSolved: data.result.peopleSolved,
                                questions: data.result.questions
                            })
                        }

                        if (quizData) {
                            setMadeArrays(true)
                            for (let element of quizData.questions) {
                                setQuestionArray(questionArray => [...questionArray, element.question])
                                setCorrectAnswerArray(correctAnswerArray => [...correctAnswerArray, element.correctAnswer])
                                setWrongAnswer1Array(wrongAnswer1Array => [...wrongAnswer1Array, element.wrongAnswer1])
                                setWrongAnswer2Array(wrongAnswer2Array => [...wrongAnswer2Array, element.wrongAnswer2])
                                setWrongAnswer3Array(wrongAnswer3Array => [...wrongAnswer3Array, element.wrongAnswer3])

                            }

                        }
                        console.log(quizData)
                        setIsAuthor(data.isAuthor)
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            } catch (err) {
                console.log(err)
            }
        }

    }, [currentQuizId, madeArrays])

    const onBlurModalFields = (eventTarget) => {


        if (eventTarget.name === 'question') {
            if (eventTarget.value < 1) {
                setErrorsQuestion('Question is required')
            } else {
                setErrorsQuestion('')
            }
        }

        if (eventTarget.name === 'correctAnswer') {
            if (eventTarget.value < 1) {
                setErrorsCorrectAnswer('Correct Answer is required')
            } else {
                setErrorsCorrectAnswer('')
            }
        }

        if (eventTarget.name === 'wrongAnswer1') {
            if (eventTarget.value < 1) {
                setErrorsWrongAnswer1('Wrong answer 1 is required')
            } else {
                setErrorsWrongAnswer1('')
            }
        }
        if (eventTarget.name === 'wrongAnswer2') {
            if (eventTarget.value < 1) {
                setErrorsWrongAnswer2('Wrong answer 2 is required')
            } else {
                setErrorsWrongAnswer2('')
            }
        }

        if (eventTarget.name === 'wrongAnswer3') {
            if (eventTarget.value < 1) {
                setErrorsWrongAnswer3('Wrong answer 3 is required')
            } else {
                setErrorsWrongAnswer3('')
            }
        }

    }

    const onFormSubmit = (e, index) => {
        e.preventDefault()

        console.log('form submit')
        
        console.log(questionArray)
        console.log(correctAnswerArray)
        console.log(wrongAnswer1Array)
        console.log(wrongAnswer2Array)

        console.log(wrongAnswer3Array)


        setShow(false)
        setEditShow(false)
        setDetailsShow(false)

        console.log(quizData.questions)

        const newQuizData = quizData

        for (let i = 0; i < quizData.questions.length; i++) {
            newQuizData.questions[i].question = questionArray[i];
            newQuizData.questions[i].correctAnswer = correctAnswerArray[i];
            newQuizData.questions[i].wrongAnswer1 = wrongAnswer1Array[i]
            newQuizData.questions[i].wrongAnswer2 = wrongAnswer2Array[i]
            newQuizData.questions[i].wrongAnswer3 = wrongAnswer3Array[i]
        }

        setQuizData(newQuizData)

        console.log(quizData)


        fetch(`http://localhost:3001/api/updateQuiz/${quizData._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                data: quizData,

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'token': token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                alert ('Successfully edited the Quiz!')
                // Handle data
                // navigate('/my-profile')
            })



    }

    useEffect((e, index) => {
        if (quizData.peopleSolved) {
            for (let solved of quizData.peopleSolved) {
                if (solved.userId === localStorage.getItem('email')) {
                    setAlreadySolved(true)
                }
            }
        }

        // if (questionArray.length > 0) {
        //     let newQuesitonArray = [...questionArray]
        //     newQuesitonArray[1] = 'peshko'

        //     setQuestionArray(newQuesitonArray)

        // }

        console.log(questionArray)



    }, [quizData._id, JSON.stringify(questionArray)])

    const onStartButtonClick = () => {

        console.log(alreadySolved)

        if (alreadySolved) {
            alert('You have already solved that quiz!!!')
        } else {
            localStorage.removeItem('currentResult')
            localStorage.setItem('quizId', quizData._id)
            if (localStorage.email) {
                navigate(`/quiz-page/${quizData._id}/question/1`)

            } else {
                navigate('/login')
            }
        }


    }

    useEffect(() => {
    })

    const onDeleteClick = () => {
        const token = localStorage.getItem('accessToken')

        try {

            fetch(`http://localhost:3001/api/quiz/${currentQuizId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                },
            })
                .then((response) => response.json())
                .then((data) => {

                    console.log(data)
                    navigate("/quizes")

                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err)
        }
    }

    const handleClose = () => {
        setShow(false)
        setEditShow(false)
        setDetailsShow(false)
    }

    const handleShow = () => {
        setShow(true);
        setEditShow(false)
        setDetailsShow(true)
    }

    const handleEditShow = () => {
        setEditShow(true)
        setShow(true)
        setDetailsShow(false)
    }

    


    const onChange = (e, index) => {

        if (e.target.name == 'question') {
            if (questionArray.length > 0) {
                let newQuesitonArray = [...questionArray]
                newQuesitonArray[index] = e.target.value

                setQuestionArray(newQuesitonArray)

                console.log('questions',questionArray)
            }
        } else if (e.target.name == 'correctAnswer') {
            if (correctAnswerArray.length > 0) {
                let newCorrectAnswerArray = [...correctAnswerArray]
                newCorrectAnswerArray[index] = e.target.value

                setCorrectAnswerArray(newCorrectAnswerArray)

                console.log('correct',correctAnswerArray)
            }
        } else if (e.target.name == 'wrongAnswer1') {
            if (wrongAnswer1Array.length > 0) {
                let newwrongAnswer1Array = [...wrongAnswer1Array]
                newwrongAnswer1Array[index] = e.target.value

                setWrongAnswer1Array(newwrongAnswer1Array)

                console.log('wong1',wrongAnswer1Array)
            }
        } else if (e.target.name == 'wrongAnswer2') {
            if (wrongAnswer2Array.length > 0) {
                let newwrongAnswer2Array = [...wrongAnswer2Array]
                newwrongAnswer2Array[index] = e.target.value

                setWrongAnswer2Array(newwrongAnswer2Array)

                console.log('wrong2',wrongAnswer2Array)
            }
        } else if (e.target.name == 'wrongAnswer3') {
            if (wrongAnswer3Array.length > 0) {
                let newwrongAnswer3Array = [...wrongAnswer3Array]
                newwrongAnswer3Array[index] = e.target.value

                setWrongAnswer3Array(newwrongAnswer3Array)

                console.log('wrong3',wrongAnswer3Array)
            }
        }
    }







    //http://localhost:3001/api/quiz/::::IDDDDD"""""

    return (
        <div className={styles.quizHomeCardSolver}>

            <div className={styles.quizHomeCardSolverInfo}>
                <h1> <span style={{ color: 'white' }}>{quizData.title}</span></h1>

                <h2 >
                    Author:
                    <Link
                        to={`http://localhost:3000/profile/${quizData.author}`}

                    > <span style={{ color: 'white' }}>{quizData.author} </span>
                    </Link>
                </h2>

                <h3>Topic: <span style={{ color: 'white' }}> {quizData.topic}</span></h3>

                <h3>
                    People Solved:
                    {quizData.peopleSolved
                        ?
                        <span style={{ color: 'white' }}>
                            {quizData.peopleSolved.length}
                        </span>
                        : ''}
                </h3>

                <h3>Rating: <span style={{ color: 'white' }}>{quizData.rating}/5</span></h3>
                <h3>difficulty: <span style={{ color: 'white' }}>{quizData.difficulty}</span></h3>
                {quizData.description !== '' ? <h3 style={{ color: 'white' }}>{quizData.description}</h3> : ''}
            </div>

            {/* <Link to={`/quiz-page/${quizData._id}/question/1`}> */}

            {!isAuthor ? <button onClick={onStartButtonClick}>
                <h3>START THE QUIZ</h3>
            </button> : ''}

            {isAuthor
                ?
                <button onClick={onDeleteClick} style={{ background: 'red', width: '30%' }}>Delete Quiz</button>

                : ''}

            {isAuthor
                ?
                <div>
                    <button onClick={handleShow} style={{ background: 'blue', width: '30%', marginLeft: '20px' }}>Quiz Details</button>
                    <button onClick={handleEditShow} style={{ background: 'green', width: '30%', marginLeft: '20px' }}>Edit quiz</button>
                </div>

                : ''}


            <Modal show={show} onHide={handleClose} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title>Details of {quizData.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center', alignItems: 'center' }}>

                    {detailsShow

                        ?

                        <div>

                            <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }}>People solved: </h2>


                            <table style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>


                                <tr>
                                    <th>User</th>
                                    <th>Result</th>
                                </tr>

                                {quizData.peopleSolved ?

                                    quizData.peopleSolved.map((user) =>
                                        <tr key={user._id}>
                                            <td style={{ textDecoration: 'underline' }}>
                                                <Link to={`http://localhost:3000/profile/${user.userId}`}>
                                                    {user.userId}
                                                </Link>
                                            </td>
                                            <td>{user.result}/{quizData.questions.length} ({((user.result / quizData.questions.length) * 100).toFixed(2)}%)</td>
                                        </tr>
                                    )
                                    : 'No people have solved that quiz yet.'}

                            </table>

                            <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }}>Questions</h2>
                            <table style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>

                                <tr>
                                    <th>Question</th>
                                    <th>Correct Answer</th>
                                    <th>Wrong Answer 1</th>
                                    <th>Wrong Answer 2</th>
                                    <th>Wrong Answer 3</th>
                                </tr>

                                {quizData.questions ?

                                    quizData.questions.map((question) =>
                                        <tr key={question._id}>
                                            <td style={{ color: 'black' }}>
                                                {question.question}
                                            </td>

                                            <td style={{ color: 'green' }}>
                                                {question.correctAnswer}
                                            </td>

                                            <td style={{ color: 'red' }}>
                                                {question.wrongAnswer1}
                                            </td>

                                            <td style={{ color: 'red' }}>
                                                {question.wrongAnswer2}
                                            </td>

                                            <td style={{ color: 'red' }}>
                                                {question.wrongAnswer3}
                                            </td>
                                        </tr>
                                    ) : ''}

                            </table>
                        </div>

                        : <div>

                            {quizData.questions?.map((question, index) =>

                                <form id='modalForm' onSubmit={(e, i) => onFormSubmit(e, index)} style={{ borderBottom: '1px solid black' }} key={question._id}> {/*  */}
                                    <h1>{index + 1}</h1>
                                    <label htmlFor='question'>
                                        <input
                                            style={{ background: '#CBC3E3', marginLeft: 'auto', marginRight: 'auto' }}
                                            type='text'
                                            name='question'
                                            defaultValue={question.question}
                                            onChange={(e, i) => onChange(e, index)}
                                            onBlur={(e) => onBlurModalFields(e.target)}
                                        />
                                        {errorsQuestion ? <p>{errorsQuestion}</p> : ''}
                                    </label>
                                    <div style={{ display: 'flex' }}>
                                        <label htmlFor='answer1' style={{ color: 'green' }}>
                                            Correct Answer
                                            <input
                                                style={{ background: '#CBC3E3' }}
                                                type='text'
                                                name='correctAnswer'
                                                defaultValue={question.correctAnswer}
                                                onChange={(e, i) => onChange(e, index)}
                                                onBlur={(e) => onBlurModalFields(e.target)}
                                            />
                                            {errorsCorrectAnswer ? <p>{errorsCorrectAnswer}</p> : ''}
                                        </label>

                                        <label htmlFor='answer2' style={{ color: 'red' }}>
                                            Wrong Answer
                                            <input type='text'
                                                style={{ background: '#CBC3E3' }}
                                                name='wrongAnswer1'
                                                defaultValue={question.wrongAnswer1}
                                                onChange={(e, i) => onChange(e, index)}
                                                onBlur={(e) => onBlurModalFields(e.target)}
                                            />
                                            {errorsWrongAnswer1 ? <p>{errorsWrongAnswer1}</p> : ''}

                                        </label>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label htmlFor='answer3' style={{ color: 'red' }}>
                                            Wrong Answer
                                            <input type='text'
                                                style={{ background: '#CBC3E3' }}
                                                name='wrongAnswer2'
                                                defaultValue={question.wrongAnswer2}
                                                onChange={(e, i) => onChange(e, index)}
                                                onBlur={(e) => onBlurModalFields(e.target)}
                                            />
                                            {errorsWrongAnswer2 ? <p>{errorsWrongAnswer2}</p> : ''}


                                        </label>
                                        <label htmlFor='answer4' style={{ color: 'red' }}>
                                            Wrong Answer
                                            <input type='text'
                                                style={{ background: '#CBC3E3' }}
                                                name='wrongAnswer3'
                                                defaultValue={question.wrongAnswer3}
                                                onChange={(e, i) => onChange(e, index)}
                                                onBlur={(e) => onBlurModalFields(e.target)}

                                            />
                                            {errorsWrongAnswer3 ? <p>{errorsWrongAnswer3}</p> : ''}

                                        </label>
                                    </div>

                                </form>
                            )}

                        </div>
                    }




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" form='modalForm' type='submit'>
                        Update Quiz

                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
