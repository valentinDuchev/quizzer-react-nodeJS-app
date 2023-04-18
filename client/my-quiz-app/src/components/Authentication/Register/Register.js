import styles from "./Register.module.css"

import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from "../../../context/AuthProvider";
import axios from 'axios'
import { useNavigate, Link, useLocation } from "react-router-dom";

export const Register = () => {

    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/quizes";

    const [firstName, setFirstName] = useState('')
    const [lastName, setIsLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePass, setRepass] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState('')




    useEffect(() => {
        setErrorMessage('')
    }, [email, password, firstName, lastName, rePass])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, firstName, lastName, rePass)

        try {
            if (password === '' || rePass === '' || email === '') {
                setErrorMessage("All fields are required")
            }

            if (password === rePass) {
                fetch('http://localhost:3001/api/users/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password,
                        firstName,
                        lastName, rePass
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        const emailData = data.user?.email
                        const nameData = `${data.user?.firstName} ${data.user?.lastName}`
                        const idData = data.user?._id
                        const accessTokenData = data.token || ''

                        console.log(idData)

                        localStorage.setItem('email', emailData)
                        localStorage.setItem('name', nameData)
                        localStorage.setItem('accessToken', accessTokenData)
                        localStorage.setItem('id', idData)

                        const email = localStorage.getItem('email')
                        const name = localStorage.getItem('name')
                        const id = localStorage.getItem('id')
                        const accessToken = localStorage.getItem('accessToken')

                        if (email && name && id && accessToken) {
                            setAuth({
                                email, name, id, accessToken
                            })
                            console.log(from)
                            navigate(from, { replace: true })
                        } else {
                            setErrorMessage(data.message)
                        }


                    })
                    .catch((err) => {
                        setErrorMessage(err.message)
                    });
            } else {
                setErrorMessage('Passwords must be equal')
            }


        } catch (err) {
            console.log(err)
        }


        setPassword('')
        setSuccess(true)
    }


    return (

        <div className={styles.divRegister}>
            <div className={styles.container}>
                <div className={styles.window}>
                    <div className={styles.overlay}></div>
                    <div className={styles.content}>
                        <div className={styles.welcome}>Hello There!</div>
                        <div className={styles.inputFields}>


                            <input
                                type='text'
                                placeholder='First Name'
                                className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                required
                            ></input>

                            <input
                                type='text'
                                placeholder='Last Name'
                                className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}
                                id="lastName"
                                onChange={(e) => setIsLastName(e.target.value)}
                                value={lastName}
                                required
                            ></input>

                            <input
                                type='email'
                                placeholder='Email'
                                className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}
                                style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            ></input>

                            <input
                                type='password'
                                placeholder='Password'
                                className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            ></input>
                            <input
                                type='password'
                                placeholder='Repeat password'
                                className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}
                                id="rePass"
                                onChange={(e) => setRepass(e.target.value)}
                                value={rePass}
                                required
                            ></input>


                        </div>
                        <div className={styles.buttonDiv}><button onClick={handleSubmit} className={`${styles.ghostRound} ${styles.fullWidth}`}>Create Account</button></div>
                        <div className={styles.subtitle}>Already have an account:<br />
                            Sign in <Link style={{ textDecoration: 'underline', color: 'black', fontWeight: 'bold' }} to="http://localhost:3000/login">here</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div >


    )
}