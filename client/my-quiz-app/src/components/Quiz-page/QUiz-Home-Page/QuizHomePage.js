import axios from "axios"
import { createRef, useEffect, useState } from "react"
import { Img } from "react-image"

import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './QuizHomePage.module.css'

export const QuizHomePage = () => {

    const navigate = useNavigate()

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
            axios
                .get(`http://localhost:3001/api/quiz/${currentQuizId}`)
                .then(res => {
                    if (res.data.result) {
                        setQuizData({
                            author: res.data.result.author,
                            _id: res.data.result._id,
                            difficulty: res.data.result.difficulty,
                            dislikes: res.data.result.dislikes,
                            likes: res.data.result.likes,
                            description: res.data.result.description,
                            rating: res.data.result.rating,
                            solved: res.data.result.solved,
                            title: res.data.result.title,
                            topic: res.data.result.topic
                        })
                    }
                    console.log(quizData)
                })
                .catch((err => {
                    console.log(err)
                }))
        }

    }, [currentQuizId, quizData.author])

    const onStartButtonClick = () => {
        localStorage.removeItem('currentResult')
        if (localStorage.email) {
            navigate(`/quiz-page/${quizData._id}/question/1`)

        } else {
            navigate('/login')
        }

    }





    //http://localhost:3001/api/quiz/::::IDDDDD"""""

    return (
        <div className={styles.quizHomeCardSolver}>

            <div className={styles.quizHomeCardSolverInfo}>
                <h1>{quizData.title}</h1>
                <h2>Author: <a href="#">{quizData.author}</a></h2>
                <h3>Topic: {quizData.topic}</h3>
                <h3>People Solved: {quizData.solved}</h3>
                <h3>Ratin: {quizData.rating}/10</h3>
            </div>


            <div className={styles.quizHomeCardSolverStatistics}>

                <div className={styles.quizHomeCardSolverLikes}>
                    <p>{quizData.likes} Likes</p>
                </div>

                <div className={styles.quizHomeCardSolverDislikes}>
                    <p>{quizData.dislikes} Dislikes</p>
                </div>

            </div>


            {/* <Link to={`/quiz-page/${quizData._id}/question/1`}> */}

            <button onClick={onStartButtonClick}>
                <h3>START THE QUIZ</h3>
            </button>

            {/* </Link> */}





            <div className={styles.containerMt}>
                <div className={styles.rowFlexJustifyContentCenter}>
                    <div className={styles.colMd}>

                        <div >
                            <h5>Comments(6)</h5>
                        </div>

                        <div className={styles.cardP}>
                            <div>
                                <div className={styles.userDFlexFlexRowAlignItemsCenter}>
                                    <Img src="/2. My Profile/Static images/profile-image.jpg" width="30"
                                        className={styles.userImgRoundedCircleMr} />
                                    <span><small className={styles.fontWeightBoldTextPrimary}>james_olesenn</small>
                                        <small className={styles.fontWeightBold}>Hmm, This poster looks cool</small></span>
                                </div>
                                <small>2 days ago</small>
                            </div>
                        </div>

                        {/* <div className="card p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="user d-flex flex-row align-items-center">
                                    <Img src="/2. My Profile/Static images/profile-image.jpg" width="30"
                                        className="user-img rounded-circle mr-2"/>
                                        <span><small className="font-weight-bold text-primary">james_olesenn</small> <small
                                            className="font-weight-bold">Hmm, This poster looks cool</small></span>
                                </div>
                                <small>2 days ago</small>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className={styles.bottomPartQuizSolver}>
                End
            </div>



            <div className={styles.quizHomeCardSolverComments}>
                <h2>Comments:</h2>
                <div className={styles.quizHomeCardSolverComment}>
                    <h2><a href="#">Peter Petrov </a>: Amazing Quiz </h2>
                </div>

                <div className={styles.quizHomeCardSolverComment}>
                    <h2><a href="#">Peter Petrov </a>: Amazing Quiz </h2>
                </div>

            </div>



        </div>
    )
}
