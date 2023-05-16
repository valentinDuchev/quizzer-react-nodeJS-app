import { useEffect, useState } from "react";
import { Img } from "react-image";
import { useNavigate, useParams } from "react-router-dom";


import styles from "./QuizFinalPage.module.css"

export const QuizFinalPage = (props) => {

    const result = localStorage.getItem('currentResult')
    const userId = localStorage.getItem('id')
    const userEmail = localStorage.getItem('email')

    const [rating, setRating] = useState(0)

    const { quizId } = useParams()
    const token = localStorage.getItem('accessToken')

    const navigate = useNavigate();


    const [isAuthor, setIsAuthor] = useState(true)


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


    useEffect(() => {
        setCurrentQuizId(quizId)
        if (currentQuizId !== '') {

            try {
                console.log(token)
                fetch(`https://quizzer-react-node-js-app-dz4a-askhahef5-valentinduchev.vercel.app//api/quiz/${currentQuizId}`, {
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
                                peopleSolved: data.result.peopleSolved
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

    const totalQuestionsNumber = localStorage.getItem('questionsNumber')

    const finish = () => {
        console.log('finish')
        console.log(result)

        try {
            console.log(token)
            fetch(`https://quizzer-react-node-js-app-dz4a-askhahef5-valentinduchev.vercel.app//api/quiz/${quizId}/solve`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token,
                    'result': result, 
                    'rating': rating, 
                    'quizCreator': quizData.author
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    navigate('/quizes')
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err)
        }


        console.log(quizId, userEmail, userId)
    }

    const onRatingChange = (e) => {
        setRating(Number(e.target.value))
    }


    return (

        <>

            <div className={styles.quizHomeCardSolver}>

                <h1 style={{ fontWeight: 'bold', color: 'black' }}>{quizData.title}</h1>


                <h1 style={{ color: 'black' }}>Your result is:  <span style={{ color: 'white' }}>{result}/{totalQuestionsNumber}</span></h1>

                <div className={styles.quizHomeCardSolverInfo}>
                    {/* <h3 style={{ color: 'black' }}>People Solved: <span style={{ color: 'white' }}>{quizData.solved}</span></h3> */}
                    <h3 style={{ color: 'black' }}>Rating: <span style={{ color: 'white' }}>{quizData.rating}/5</span></h3>
                </div>

                <div>

                    <h2>How satisfied are you with that quiz?</h2>

                    <span classname={styles.starContainer}>
                        <input type="radio" name="rating" value="4" id="star-4"
                            className={`${styles.starRadio}  ${styles.visuhide}`}
                            onChange={(e) => onRatingChange(e)}
                        />
                        <input type="radio" name="rating" value="2" id="star-2"
                            className={`${styles.starRadio}  ${styles.visuhide}`}
                            onChange={(e) => onRatingChange(e)}
                        />
                        <input type="radio" name="rating" value="3" id="star-3"
                            className={`${styles.starRadio}  ${styles.visuhide}`}
                            onChange={(e) => onRatingChange(e)}
                        />
                        <input type="radio" name="rating" value="1" id="star-1"
                            className={`${styles.starRadio}  ${styles.visuhide}`}
                            onChange={(e) => onRatingChange(e)}
                        />
                        <input type="radio" name="rating" value="5" id="star-5"
                            className={`${styles.starRadio}  ${styles.visuhide}`}
                            onChange={(e) => onRatingChange(e)}
                        />

                        <label className={styles.starItem} for="star-1"><span className={styles.visuhide}>1 star</span></label>
                        <label className={styles.starItem} for="star-2"><span className={styles.visuhide}>2 stars</span></label>
                        <label className={styles.starItem} for="star-3"><span className={styles.visuhide}>3 stars</span></label>
                        <label className={styles.starItem} for="star-4"><span className={styles.visuhide}>4 stars</span></label>
                        <label className={styles.starItem} for="star-5"><span className={styles.visuhide}>5 stars</span></label>
                    </span>

                </div>




                {!isAuthor ? <button onClick={finish}><h3>Finish quiz</h3></button> : ''}


                {isAuthor ? <button style={{ background: 'red' }}>Delete Quiz</button> : ''}



                {/* </Link> */}












            </div>




        </>

    )

}

