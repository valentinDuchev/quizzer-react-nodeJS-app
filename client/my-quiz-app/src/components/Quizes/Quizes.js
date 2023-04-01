import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SingleQuizCard } from "../Cards/Single-quiz-card/SingleQuizCard"
import SortDropdown from "../Dropdowns/SortDropdown/SortDropdown"
import axios from "axios"

import styles from "./Quizes.Module.css"
import { MyQuizCard } from "../Cards/My-quiz-card/MyQuizCard"


export const Quizes = () => {

    const [quizes, setQuizes] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/allQuizes')
            .then(res => {
                console.log(res.data.result)
                setQuizes([...quizes, res.data])
                console.log(quizes)
                console.log(quizes[0].result)
            })
            .catch((err => {
                console.log(err)
            }))
    }, [quizes[0]])

    return (
        <>

            <div className={styles.allQuizesPage}>
                <SortDropdown className={styles.sortDropdown} />

                <div className={styles.allQuizesMainPage}>
                    <div className={styles.containerAllQuizCards}>
                        <div className={styles.gradientCards}>

                            {quizes[0] ? quizes[0].result.map((quiz) => <SingleQuizCard
                                key={quiz._id}
                                id={quiz._id}
                                author={quiz.author}
                                description={quiz.description}
                                difficulty={quiz.difficulty}
                                likes={quiz.likes}
                                dislikes={quiz.dislikes}
                                topic={quiz.topic}
                                raitng={quiz.rating}
                                solved={quiz.solved}
                                title={quiz.title}
                            />) : ''}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}