
import styles from "./Create.module.css";

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";


export const Create = () => {

    const navigate = useNavigate();


    const [show, setShow] = useState(false);

    const [question, setQuestion] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [wrongAnswer1, setWrongAnswer1] = useState('')
    const [wrongAnswer2, setWrongAnswer2] = useState('')
    const [wrongAnswer3, setWrongAnswer3] = useState('')

    const [errorsQuestion, setErrorsQuestion] = useState('')
    const [errorsCorrectAnswer, setErrorsCorrectAnswer] = useState('')
    const [errorsWrongAnswer1, setErrorsWrongAnswer1] = useState('')
    const [errorsWrongAnswer2, setErrorsWrongAnswer2] = useState('')
    const [errorsWrongAnswer3, setErrorsWrongAnswer3] = useState('')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [topic, setTopic] = useState('')

    const [titleErrors, setTitleErrors] = useState('')
    const [topicErrors, setTopicErrors] = useState('')
    const [difficultyErrors, setDifficultyErrors] = useState('')

    const [questions, setQuestions] = useState([]);

    const [moreQuestionsNeeded, setMoreQuestionsNeeded] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()

        console.log('form submit')

        if (question.length < 1) {
            setErrorsQuestion('Question is required')
            console.log(errorsQuestion)
        } if (correctAnswer.length < 1) {
            setErrorsCorrectAnswer('Correct answer is required')
            console.log(errorsCorrectAnswer)
        } if (wrongAnswer1.length < 1) {
            setErrorsWrongAnswer1('Wrong answer 1 is required')
        } if (wrongAnswer2.length < 1) {
            setErrorsWrongAnswer2('Wrong answer 2 is required')
        } if (wrongAnswer3.length < 1) {
            setErrorsWrongAnswer3('Wrong answer 3 is required')
        }

        if (question != '' && correctAnswer != '' && wrongAnswer1 != '' && wrongAnswer2 != '' && wrongAnswer3 != '') {

            console.log('yes')

            const id = questions.length + 1;
            console.log(id)

            const newQuestion = {
                id,
                question,
                correctAnswer,
                wrongAnswer1,
                wrongAnswer2,
                wrongAnswer3
            }

            console.log(newQuestion)

            setQuestions([...questions, newQuestion])

            console.log(questions)

            setQuestion('')
            setCorrectAnswer('')
            setWrongAnswer1('')
            setWrongAnswer2('')
            setWrongAnswer3('')

            setErrorsQuestion('')
            setErrorsCorrectAnswer('')
            setErrorsWrongAnswer1('')
            setErrorsWrongAnswer2('')
            setErrorsWrongAnswer3('')

            setShow(false)
        }

    }

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

    const handleClose = () => {
        setQuestion('')
        setCorrectAnswer('')
        setWrongAnswer1('')
        setWrongAnswer2('')
        setWrongAnswer3('')

        setErrorsQuestion('')
        setErrorsCorrectAnswer('')
        setErrorsWrongAnswer1('')
        setErrorsWrongAnswer2('')
        setErrorsWrongAnswer3('')

        setShow(false)
    }

    const handleShow = () => {
        setShow(true);
    }

    const deleteQuestionHandler = (id) => {
        setQuestions(questions.filter(question => question.id !== id));

    }

    const onMainFormChange = (eventTarget) => {
        if (eventTarget.name === 'title') {
            setTitle(eventTarget.value)
        } else if (eventTarget.name === 'description') {
            setDescription(eventTarget.value)
        } else if (eventTarget.name === 'difficulty') {
            setDifficulty(eventTarget.value);
        } else if (eventTarget.name === 'topic') {
            setTopic(eventTarget.value);
        }



    }

    const onBlurMainForm = (eventTarget) => {
        if (eventTarget.name === 'title') {
            if (eventTarget.value < 1) {
                setTitleErrors('Title is required')
            } else {
                setTitleErrors('')
            }
        }

        if (eventTarget.name === 'difficulty') {
            if (eventTarget.value !== '') {
                setDifficultyErrors('')
            }
        }

        if (eventTarget.name === 'topic') {
            if (eventTarget.value !== '') {
                setTopicErrors('')
            }
        }

    }


    const mainFormSubmit = (e) => {

        e.preventDefault()

        if (title !== '' && difficulty !== '' && topic !== '' && questions.length >= 3 && questions.length < 15) {
            console.log('were in')
            const newQuiz = {
                questions: questions,
                title: title,
                description: description,
                topic: topic,
                difficulty: difficulty
            }
            console.log(newQuiz)
            const emptyArr = []

            setQuestions([...questions, emptyArr])

            setTitle('')
            setDescription('')
            setTitle('')

            setDifficulty('')

            const token = localStorage.getItem('accessToken')

            try {
                fetch('https://quizzer-react-node-js-app.vercel.app/api/createQuiz', {
                    method: 'POST',
                    body: JSON.stringify({
                        questions: questions,
                        title: title,
                        description: description,
                        topic: topic,
                        difficulty: difficulty,
                        authorId: localStorage.getItem('id')
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'token': token
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        // Handle data
                        navigate('/home')
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            } catch (err) {
                console.log(err)
            }

        } else {
            if (title.length < 1) {
                setTitleErrors('Title is required')
            }

            if (difficulty.length < 1) {
                setDifficultyErrors('Difficulty is required')
            }

            if (topic.length < 1) {
                setTopicErrors('Topic is required')
            }

            console.log(questions)

            if (questions.length < 3 && topic !== '' && title !== '' && difficulty !== '') {
                // setMoreQuestionsNeeded('You need at least 3 questions in order to create quiz')

                alert('You need at least 3 questions in order to create quiz')
            } else if (questions.length > 15 && topic !== '' && title !== '' && difficulty !== '') {
                alert(`You cannot have more than 15 questions in your quiz. Please delete ${questions.length - 15} of the questions`)
            }


        }





    }





    return (


        <div className={styles.createPage}>

            <div className=''>


                <form action='' className='form' id='mainForm' onSubmit={mainFormSubmit}>


                    <p className='field required' style={{marginTop: '1px'}}>
                        <label className='label required' htmlFor='name'>Title</label>
                        <input
                            className='text-input'
                            id='title'
                            name='title'
                            type='text'
                            onChange={(e) => onMainFormChange(e.target)}
                            onBlur={(e) => onBlurMainForm(e.target)}
                            value={title}
                            style={{marginTop: '-30px'}}
                        />

                        <br />

                    </p>

                    {titleErrors ? <p style={{ fontWeight: 'bold', color: 'red' }}>{titleErrors}</p> : ''}


                    <div className='field' style={{marginTop: '-40px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                        <label className='label'>Difficulty</label>
                        <ul className='checkboxes' style={{marginLeft: 'auto', marginLeft: 'auto', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                            <li className='checkbox'>
                                <input className='checkbox-input'
                                    style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}
                                    id='easy' name='difficulty'
                                    type='radio'
                                    value='Easy'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}


                                />
                                <label className='checkbox-label' htmlFor='easy'>Easy</label>
                            </li>
                            <li className='checkbox'>
                                <input className='checkbox-input' id='medium' name='difficulty' type='radio' value='Medium'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}

                                />
                                <label className='checkbox-label' htmlFor='medium'>Medium</label>
                            </li>
                            <li className='checkbox'>
                                <input className='checkbox-input' id='hard' name='difficulty' type='radio' value='Hard'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='checkbox-label' htmlFor='hard'>Hard</label>
                            </li>
                        </ul>

                        {difficultyErrors ? <p>{difficultyErrors}</p> : ''}

                    </div>

                    <div className='field'>
                        <label className='label'>Topic</label>
                        <ul className='options'>
                            <li className='option'>
                                <input className='option-input' id='general' name='topic' type='radio' value='general'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='general'>General</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='sport' name='topic' type='radio' value='sport'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='sport'>Sport</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='books' name='topic' type='radio' value='books'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='books'>Books</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='art' name='topic' type='radio' value='art'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='art'>Art</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='movies' name='topic' type='radio' value='movies'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='movies'>Movies/TV</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='music' name='topic' type='radio' value='music'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='music'>Music</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='history' name='topic' type='radio' value='history'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='history'>History</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='geography' name='topic' type='radio' value='geography'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='geography'>Geography</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='science' name='topic' type='radio' value='science'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='science'>Science</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='politics' name='topic' type='radio' value='politics'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='politics'>Politics</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='humanBody' name='topic' type='radio' value='humanBody'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='humanBody'>Human body</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='medicine' name='topic' type='radio' value='medicine'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='medicine'>Medicine</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='animalsNature' name='topic' type='radio' value='animalsNature'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='animalsNature'>Animals/Nature</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='technology' name='topic' type='radio' value='technology'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='technology'>Technology</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='stocks' name='topic' type='radio' value='stocks'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='stocks'>Stocks/Crypto</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='foodDrink' name='topic' type='radio' value='foodDrink'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='foodDrink'>Food/Drink</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='other' name='topic' type='radio' value='other'
                                    onChange={(e) => onMainFormChange(e.target)}
                                    onBlur={(e) => onBlurMainForm(e.target)}
                                />
                                <label className='option-label' htmlFor='other'>Other</label>
                            </li>
                        </ul>
                        {topicErrors ? <p>{topicErrors}</p> : ''}
                    </div>
                    <p className='field'>
                        <label className='label' htmlFor='about'>Description</label>
                        <textarea
                            className='textarea'
                            cols='50'
                            id='description'
                            name='description'
                            rows='4'
                            onChange={(e) => onMainFormChange(e.target)}
                            value={description}
                        >
                            {description}
                        </textarea>
                    </p>

                    <Button variant="primary" onClick={handleShow}>
                        Add a question
                    </Button>

                    
                    <p className='field half'>
                        <input className='button' type='submit' form='mainForm' value='Create Quiz' />
                    </p>

                </form>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form id='modalForm' onSubmit={onFormSubmit}>
                            <label htmlFor='question'>
                                Question
                                <input
                                    type='text'
                                    name='question'
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    onBlur={(e) => onBlurModalFields(e.target)}
                                    style={{backgroundColor: 'lightBlue'}}
                                />
                                {errorsQuestion ? <p>{errorsQuestion}</p> : ''}
                            </label>

                            <label htmlFor='answer1' style={{ color: 'green' }}>
                                Correct Answer
                                <input
                                    type='text'
                                    name='correctAnswer'
                                    value={correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    onBlur={(e) => onBlurModalFields(e.target)}
                                    style={{backgroundColor: 'lightBlue'}}
                                />
                                {errorsCorrectAnswer ? <p>{errorsCorrectAnswer}</p> : ''}
                            </label>


                            <label htmlFor='answer2' style={{ color: 'red' }}>
                                Wrong Answer
                                <input type='text'
                                    name='wrongAnswer1'
                                    value={wrongAnswer1}
                                    onChange={(e) => setWrongAnswer1(e.target.value)}
                                    onBlur={(e) => onBlurModalFields(e.target)}
                                    style={{backgroundColor: 'lightBlue'}}
                                />
                                {errorsWrongAnswer1 ? <p>{errorsWrongAnswer1}</p> : ''}

                            </label>
                            <label htmlFor='answer3' style={{ color: 'red' }}>
                                Wrong Answer
                                <input type='text'
                                    name='wrongAnswer2'
                                    value={wrongAnswer2}
                                    onChange={(e) => setWrongAnswer2(e.target.value)}
                                    onBlur={(e) => onBlurModalFields(e.target)}
                                    style={{backgroundColor: 'lightBlue'}}
                                />
                                {errorsWrongAnswer2 ? <p>{errorsWrongAnswer2}</p> : ''}


                            </label>
                            <label htmlFor='answer4' style={{ color: 'red' }}>
                                Wrong Answer
                                <input type='text'
                                    name='wrongAnswer3'
                                    value={wrongAnswer3}
                                    onChange={(e) => setWrongAnswer3(e.target.value)}
                                    onBlur={(e) => onBlurModalFields(e.target)}
                                    style={{backgroundColor: 'lightBlue'}}

                                />
                                {errorsWrongAnswer3 ? <p>{errorsWrongAnswer3}</p> : ''}

                            </label>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" form='modalForm' type='submit'>
                            Save Changes

                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Stack gap={questions.length}>
                    <h2 style={{ color: 'white' }}>Questions: </h2>
                    {questions.map(current =>
                    
                        questions.length > 0 ?
                            <div className="bg-light border" key={current.id} style={{ borderRadius: '20px', marginTop: '5px' }}>

                                <span style={{ fontWeight: 'bold' }}>
                                    {current.question}:
                                </span>

                                <span style={{ color: 'green' }}>
                                    {current.correctAnswer};
                                </span>

                                <span style={{ color: 'red' }}>
                                    {current.wrongAnswer1};
                                </span>

                                <span style={{ color: 'red' }}>
                                    {current.wrongAnswer2};
                                </span>

                                <span style={{ color: 'red' }}>
                                    {current.wrongAnswer3};
                                </span>

                                <button onClick={() => deleteQuestionHandler(current.id)} style={{ backgroundColor: 'red', borderRadius: '30px', fontWeight: 'bold' }}>
                                    Delete
                                </button>

                            </div>
                            : <p style={{ color: 'white', textAlign: 'center', marginTop: 0, marginBottom: 0 }}>
                                No Questions added
                            </p>
                    )}
                </Stack>

            </div>

        </div >

    )
}