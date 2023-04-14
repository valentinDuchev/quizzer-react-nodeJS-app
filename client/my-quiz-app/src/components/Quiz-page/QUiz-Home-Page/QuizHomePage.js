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

    }, [currentQuizId])


    useEffect(() => {
        if (quizData.peopleSolved) {
            for (let solved of quizData.peopleSolved) {
                console.log(solved.userId)
                console.log(localStorage.getItem('email'))
                if (solved.userId === localStorage.getItem('email')) {
                    setAlreadySolved(true)
                }
            }
        }


    }, [quizData._id])

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
        console.log(quizData)
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
    }

    const handleShow = () => {
        setShow(true);
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
                <h3>difficulty: <span style={{color: 'white'}}>{quizData.difficulty}</span></h3>
                {quizData.description !== '' ? <h3 style={{color: 'white'}}>{quizData.description}</h3> : ''}
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
                <button onClick={handleShow} style={{ background: 'blue', width: '30%', marginLeft: '20px' }}>Quiz Details</button>

                : ''}


            <Modal show={show} onHide={handleClose} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title>Details of {quizData.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center', alignItems: 'center' }}>

                    <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }}>People solved: </h2>


                    <table style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>


                        <tr>
                            <th>User</th>
                            <th>Result</th>
                        </tr>

                        {quizData.peopleSolved ?

                            quizData.peopleSolved.map((user) =>
                                <tr>
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
                                <tr>
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

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
