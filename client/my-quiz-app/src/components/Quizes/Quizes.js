import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { SingleQuizCard } from "../Cards/Single-quiz-card/SingleQuizCard"
import SortDropdown from "../Dropdowns/SortDropdown/SortDropdown"
import axios from "axios"

import styles from "./Quizes.module.css"
import { MyQuizCard } from "../Cards/My-quiz-card/MyQuizCard"

import Dropdown from 'react-bootstrap/Dropdown';

import {PaginatedItems} from './Pagination'



export const Quizes = () => {

    const [quizes, setQuizes] = useState([])

    const [filterTopic, setFilterTopic] = useState('')

    const [reset, setReset] = useState(false)

    const { filter1 } = useParams('')

    const [filteredByTopicQuizes, setFilteredByTopicQuizes] = useState([])

    const [sortType, setSortType] = useState('')


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
                    setSortType(filter1)
                    console.log(filter1)
                    for (let element of quizes[0].result) {
                        if (element.topic === filter1) {
                            filteredToPush.push(element)
                        } else if (element.difficulty.toLowerCase() === filter1) {
                            filteredToPush.push(element)

                        }
                    }

                    if (filter1 === 'newest') {
                        console.log('newest')
                        filteredToPush = quizes[0].result.sort((a, b) =>
                            new Date(b.dateCreated) - new Date(a.dateCreated)
                        )

                        console.log(filteredToPush)

                    } else if (filter1 === 'oldest') {
                        console.log('oldest')
                        filteredToPush = quizes[0].result.sort((a, b) =>
                            new Date(a.dateCreated) - new Date(b.dateCreated)
                        )

                        console.log(filteredToPush)
                    }

                    const topicArr = ['sport', 'general', 'books', 'art', 'movies', 'music', 'history', 'geography', 'science', 'politics', 'human', 'medicine', 'animals', 'technology', 'stocks', 'food', 'other']
                    const difficultyArr = ['easy', 'medium', 'hard']


                    if (topicArr.includes(filter1)) {
                        const word = filter1
                        const firstLetter = word.charAt(0)
                        const firstLetterCap = firstLetter.toUpperCase()
                        const remainingLetters = word.slice(1)
                        const capitalizedWord = firstLetterCap + remainingLetters

                        setSortType(`Topic - ${capitalizedWord}`)
                    } else if (difficultyArr.includes(filter1)) {
                        const word = filter1
                        const firstLetter = word.charAt(0)
                        const firstLetterCap = firstLetter.toUpperCase()
                        const remainingLetters = word.slice(1)
                        const capitalizedWord = firstLetterCap + remainingLetters

                        setSortType(`Difficulty - ${capitalizedWord}`)
                    } else if (filter1 === "newest" || filter1 === "oldest") {
                        const word = filter1
                        const firstLetter = word.charAt(0)
                        const firstLetterCap = firstLetter.toUpperCase()
                        const remainingLetters = word.slice(1)
                        const capitalizedWord = firstLetterCap + remainingLetters

                        setSortType(`Date Created - ${capitalizedWord}`)
                    }

                    setFilteredByTopicQuizes(filteredToPush)
                    setFilteredByTopicQuizes(filteredToPush)

                }



            })
            .catch((err => {
                console.log(err)
            }))
    }, [quizes[0]])

    useEffect(() => {
        console.log(filteredByTopicQuizes)
    }, [filteredByTopicQuizes, reset])


    const onDropdownChange = (e) => {
        setFilterTopic(e.target.name)

        console.log(e.target)
        if (e.target.id === "Topic") {
            const word = e.target.name
            const firstLetter = word.charAt(0)
            const firstLetterCap = firstLetter.toUpperCase()
            const remainingLetters = word.slice(1)
            const capitalizedWord = firstLetterCap + remainingLetters

            setSortType(`Topic - ${capitalizedWord}`)
        } else if (e.target.id === "Difficulty") {
            const word = e.target.name
            const firstLetter = word.charAt(0)
            const firstLetterCap = firstLetter.toUpperCase()
            const remainingLetters = word.slice(1)
            const capitalizedWord = firstLetterCap + remainingLetters

            setSortType(`Difficulty - ${capitalizedWord}`)
        } else if (e.target.id === "date") {
            const word = e.target.name
            const firstLetter = word.charAt(0)
            const firstLetterCap = firstLetter.toUpperCase()
            const remainingLetters = word.slice(1)
            const capitalizedWord = firstLetterCap + remainingLetters

            setSortType(`Date Created - ${capitalizedWord}`)
        }

        let filteredToPush = []

        for (let element of quizes[0].result) {
            if (element.topic === e.target.name) {

                filteredToPush.push(element)

            } else if (element.difficulty.toLowerCase() === e.target.name) {

                filteredToPush.push(element)
            }
        }

        if (e.target.name === 'newest') {
            console.log('newest')
            filteredToPush = quizes[0].result.sort((a, b) =>
                new Date(b.dateCreated) - new Date(a.dateCreated)
            )

            console.log(filteredToPush)

        } else if (e.target.name === 'oldest') {
            console.log('oldest')
            filteredToPush = quizes[0].result.sort((a, b) =>
                new Date(a.dateCreated) - new Date(b.dateCreated)
            )

            console.log(filteredToPush)
        }

        setFilteredByTopicQuizes(filteredToPush)
    }

    const resetButton = () => {
        console.log(quizes[0].result)
        setReset(true)
        setFilteredByTopicQuizes(quizes[0].result)
        setSortType('')
    }

    return (
        <>

            <div className={styles.allQuizesPage} >

                <div className={styles.dropdowns} >

                    <div>
                        <Dropdown className={styles.dropdown}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Filter By Topic
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/general" id="Topic" name="general" onClick={(e) => (onDropdownChange(e))}>General</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/sport" id="Topic" name="sport" onClick={(e) => (onDropdownChange(e))}>Sport</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/books" id="Topic" name="books" onClick={(e) => (onDropdownChange(e))}>Books</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/art" id="Topic" name="art" onClick={(e) => (onDropdownChange(e))}>Art</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/movies" id="Topic" name="movies" onClick={(e) => (onDropdownChange(e))}>Movies/TV</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/music" id="Topic" name="music" onClick={(e) => (onDropdownChange(e))}>Music</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/history" id="Topic" name="history" onClick={(e) => (onDropdownChange(e))}>History</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/geography" id="Topic" name="geography" onClick={(e) => (onDropdownChange(e))}>Geography</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/science" id="Topic" name="science" onClick={(e) => (onDropdownChange(e))}>Science</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/politics" id="Topic" name="politics" onClick={(e) => (onDropdownChange(e))}>Politics</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/human" id="Topic" name="human" onClick={(e) => (onDropdownChange(e))}>Human Body</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/medicine" id="Topic" name="medicine" onClick={(e) => (onDropdownChange(e))}>Medicine</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/animals" id="Topic" name="animals" onClick={(e) => (onDropdownChange(e))}>Animals/Nature</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/technology" id="Topic" name="technology" onClick={(e) => (onDropdownChange(e))}>Technology</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/stocks" id="Topic" name="stocks" onClick={(e) => (onDropdownChange(e))}>Stocks/Crypto</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/food" id="Topic" name="food" onClick={(e) => (onDropdownChange(e))}>Food/Drink</Dropdown.Item>
                                <Dropdown.Item as={Link} to="http://localhost:3000/quizes/other" id="Topic" name="other" onClick={(e) => (onDropdownChange(e))}>Other</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <Dropdown className={styles.dropdown}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Filter By Difficulty
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="http://localhost:3000/quizes/easy" id="Difficulty" name="easy" onClick={(e) => (onDropdownChange(e))}>Easy</Dropdown.Item>
                            <Dropdown.Item as={Link} to="http://localhost:3000/quizes/medium" id="Difficulty" name="medium" onClick={(e) => (onDropdownChange(e))}>Medium</Dropdown.Item>
                            <Dropdown.Item as={Link} to="http://localhost:3000/quizes/hard" id="Difficulty" name="hard" onClick={(e) => (onDropdownChange(e))}>Hard</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className={styles.dropdown}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort By Date
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="http://localhost:3000/quizes/newest" id="date" name="newest" onClick={(e) => (onDropdownChange(e))}>Newest to Oldest</Dropdown.Item>
                            <Dropdown.Item as={Link} to="http://localhost:3000/quizes/oldest" id="date" name="oldest" onClick={(e) => (onDropdownChange(e))}>Oldest to newest</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>



                </div>

                {sortType ? <span style={{ color: 'white' }}>Sorted by: {sortType}<br /></span> : ''}


                <Link to="http://localhost:3000/quizes" onClick={resetButton}><button style={{ marginTop: '20px' }}>Reset Filters</button></Link>



                <div className={styles.allQuizesMainPage}
                // style={{
                //     display: 'grid',
                //     gridTemplateColumns: ' 45% 45%',
                //     gap: '2%', marginLeft: '4%',
                //     marginRight: '4%',
                //     alignItems: 'center',
                //     justifyContent: 'center', 

                // }}
                >



                    {/* {filteredByTopicQuizes ? filteredByTopicQuizes.map((quiz) =>
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
                        />) : <h1>No quizes with that topic!</h1>} */}

                        <PaginatedItems data={filteredByTopicQuizes}/>
                </div>
            </div>

        </>
    )
}