import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { SingleQuizCard } from "../Cards/Single-quiz-card/SingleQuizCard"
import SortDropdown from "../Dropdowns/SortDropdown/SortDropdown"
import axios from "axios"

import styles from "./Quizes.Module.css"
import { MyQuizCard } from "../Cards/My-quiz-card/MyQuizCard"

import Dropdown from 'react-bootstrap/Dropdown';



export const Quizes = () => {

    const [quizes, setQuizes] = useState([])

    const [filterTopic, setFilterTopic] = useState('')

    const [reset, setReset] = useState(false)

    const { filter1 } = useParams('')

    const [filteredByTopicQuizes, setFilteredByTopicQuizes] = useState([])


    useEffect(() => {
        axios
            .get('http://localhost:3001/api/allQuizes')
            .then(res => {
                setQuizes([...quizes, res.data])
                console.log(filteredByTopicQuizes)
                console.log(quizes)
                if (filter1 == undefined) {
                    setFilteredByTopicQuizes(quizes[0].result)
                } else {
                    let filteredToPush = []

                    for (let element of quizes[0].result) {
                        if (element.topic === filter1) {
                            console.log('same topic')
                            filteredToPush.push(element)
                        }
                    }
                    setFilteredByTopicQuizes(filteredToPush)

                }

                console.log(filter1)


            })
            .catch((err => {
                console.log(err)
            }))
    }, [quizes[0]])

    useEffect(() => {
        console.log(filteredByTopicQuizes)
    }, [filteredByTopicQuizes, reset])


    const onDropdownChange = (e) => {
        console.log(e.target.name)

        setFilterTopic(e.target.name)

        let filteredToPush = []

        for (let element of quizes[0].result) {
            if (element.topic === e.target.name) {
                console.log('same topic')

                filteredToPush.push(element)
            }
        }

        setFilteredByTopicQuizes(filteredToPush)


        console.log(filteredByTopicQuizes)



    }

    const resetButton = () => {
        console.log(quizes[0].result)
        setReset(true)
        setFilteredByTopicQuizes(quizes[0].result)
    }

    return (
        <>

            <div className={styles.allQuizesPage}>
                <Dropdown className={styles.dropdown}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Filter By Topic
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/general" name="general" onClick={(e) => (onDropdownChange(e))}>General</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/sport" name="sport" onClick={(e) => (onDropdownChange(e))}>Sport</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/books" name="books" onClick={(e) => (onDropdownChange(e))}>Books</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/art" name="art" onClick={(e) => (onDropdownChange(e))}>Art</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/movies" name="movies" onClick={(e) => (onDropdownChange(e))}>Movies/TV</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/music" name="music" onClick={(e) => (onDropdownChange(e))}>Music</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/history" name="history" onClick={(e) => (onDropdownChange(e))}>History</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/geography" name="geography" onClick={(e) => (onDropdownChange(e))}>Geography</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/science" name="science" onClick={(e) => (onDropdownChange(e))}>Science</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/politics" name="politics" onClick={(e) => (onDropdownChange(e))}>Politics</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/human" name="human" onClick={(e) => (onDropdownChange(e))}>Human Body</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/medicine" name="medicine" onClick={(e) => (onDropdownChange(e))}>Medicine</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/animals" name="animals" onClick={(e) => (onDropdownChange(e))}>Animals/Nature</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/technology" name="technology" onClick={(e) => (onDropdownChange(e))}>Technology</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/stocks" name="stocks" onClick={(e) => (onDropdownChange(e))}>Stocks/Crypto</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/food" name="food" onClick={(e) => (onDropdownChange(e))}>Food/Drink</Dropdown.Item>
                        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/other" name="other" onClick={(e) => (onDropdownChange(e))}>Other</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Link to="http://localhost:3000/quizes" onClick={resetButton}>Reset Filters</Link>


                <div className={styles.allQuizesMainPage}>



                    {filteredByTopicQuizes ? filteredByTopicQuizes.map((quiz) =>
                        <SingleQuizCard
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
                            email={quiz.authorEmail}
                            questionsNumber={quiz.questions.length}
                            rating={quiz.rating.toFixed(2)}
                            ratedNumber={quiz.ratedNumber}
                            dateCreated={quiz.dateCreated}
                        />) : <h1>No quizes with that topic!</h1>}
                </div>
            </div>

        </>
    )
}