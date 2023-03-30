
import styles from "./Create.module.css";

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import Modal from 'react-bootstrap/Modal';

export const Create = () => {


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


    const [questions, setQuestions] = useState([]);

    const onFormSubmit = (e) => {
        e.preventDefault()

    }

    const handleSave = () => {

        if (question.length < 2) {
            setErrorsQuestion('Question is required')
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

        else {

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

            setQuestions([...questions, newQuestion])

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
    };

    const onBlurModalFields = (eventTarget) => {
        console.log(eventTarget);

        if (eventTarget < 1) {
            setErrorsQuestion('Question is required')
        } else {
            setErrorsQuestion('')
        }

        
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {

        setShow(true);


    }


    const deleteQuestionHandler = (id) => {
        setQuestions(questions.filter(question => question.id !== id));

    }





    return (
        <div className={styles.createPage}>

            <div className='createForm'>


                <form action='' className='form'>


                    <p className='field half required error'>
                        <label className='label' for='login'>Title</label>
                        <input className='text-input' id='login' name='login' required type='text' value='mican' />
                    </p>

                    <div className='field'>
                        <label className='label'>Difficulty</label>
                        <ul className='checkboxes'>
                            <li className='checkbox'>
                                <input className='checkbox-input' id='choice-0' name='choice' type='checkbox' value='0' />
                                <label className='checkbox-label' for='choice-0'>Easy</label>
                            </li>
                            <li className='checkbox'>
                                <input className='checkbox-input' id='choice-1' name='choice' type='checkbox' value='1' />
                                <label className='checkbox-label' for='choice-1'>Medium</label>
                            </li>
                            <li className='checkbox'>
                                <input className='checkbox-input' id='choice-2' name='choice' type='checkbox' value='2' />
                                <label className='checkbox-label' for='choice-2'>Hard</label>
                            </li>

                        </ul>
                    </div>
                    <div className='field'>
                        <label className='label'>Topic</label>
                        <ul className='options'>
                            <li className='option'>
                                <input className='option-input' id='option-0' name='option' type='radio' value='0' />
                                <label className='option-label' for='option-0'>Overall</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='option-1' name='option' type='radio' value='1' />
                                <label className='option-label' for='option-1'>Sport</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='option-2' name='option' type='radio' value='2' />
                                <label className='option-label' for='option-2'>History</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='option-3' name='option' type='radio' value='3' />
                                <label className='option-label' for='option-3'>Geography</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='option-4' name='option' type='radio' value='4' />
                                <label className='option-label' for='option-4'>Science</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='option-5' name='option' type='radio' value='5' />
                                <label className='option-label' for='option-5'>Politics</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='option-6' name='option' type='radio' value='6' />
                                <label className='option-label' for='option-6'>Technology</label>
                            </li>
                            <li className='option'>
                                <input className='option-input' id='option-7' name='option' type='radio' value='7' />
                                <label className='option-label' for='option-7'>Other</label>
                            </li>
                        </ul>
                    </div>
                    <p className='field'>
                        <label className='label' for='about'>About</label>
                        <textarea className='textarea' cols='50' id='about' name='about' rows='4'></textarea>
                    </p>

                    <Button variant="primary" onClick={handleShow}>
                        Add a question
                    </Button>

                    {/* <p className='field half'>
                    <label className='label' for='select'>Position</label>
                    <select className='select' id='select'>
                        <option selected value=''></option>
                        <option value='ceo'>CEO</option>
                        <option value='front-end'>Front-end developer</option>
                        <option value='back-end'>Back-end developer</option>
                    </select>
                </p> */}
                    <p className='field half'>
                        <input className='button' type='submit' value='Create Quiz' />
                    </p>

                </form>




                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
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
                                    onBlur={(e) => onBlurModalFields(e.target.value)}
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
                                />
                                {errorsCorrectAnswer ? <p>{errorsCorrectAnswer}</p> : ''}
                            </label>
                            <label htmlFor='answer2' style={{ color: 'red' }}>
                                Wrong Answer
                                <input type='text'
                                    name='wrongAnswer1'
                                    value={wrongAnswer1}
                                    onChange={(e) => setWrongAnswer1(e.target.value)}
                                />
                                {errorsWrongAnswer1 ? <p>{errorsWrongAnswer1}</p> : ''}

                            </label>
                            <label htmlFor='answer3' style={{ color: 'red' }}>
                                Wrong Answer
                                <input type='text'
                                    name='wrongAnswer2'
                                    value={wrongAnswer2}
                                    onChange={(e) => setWrongAnswer2(e.target.value)}
                                />
                                {errorsWrongAnswer2 ? <p>{errorsWrongAnswer2}</p> : ''}


                            </label>
                            <label htmlFor='answer4' style={{ color: 'red' }}>
                                Wrong Answer
                                <input type='text'
                                    name='wrongAnswer3'
                                    value={wrongAnswer3}
                                    onChange={(e) => setWrongAnswer3(e.target.value)}
                                />
                                {errorsWrongAnswer3 ? <p>{errorsWrongAnswer3}</p> : ''}

                            </label>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave} form='modalForm' type='submit'>
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
                            <div className="bg-light border" key={current.id}>{current.question}:
                                <span style={{ color: 'green' }}>
                                    {current.correctAnswer}
                                </span>
                                <button onClick={() => deleteQuestionHandler(current.id)}>delete</button>
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