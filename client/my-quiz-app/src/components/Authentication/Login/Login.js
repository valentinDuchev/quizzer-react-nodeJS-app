import styles from "./Login.module.css"

import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from "../../../context/AuthProvider";
import axios from 'axios'
import { useNavigate, Link, useLocation } from "react-router-dom";

export const Login = () => {

    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/quizes";

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState('')




    useEffect(() => {
        setErrorMessage('')
    }, [user, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user, password)



        try {

            fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: user,
                    password: password
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

                    if (emailData !== undefined && nameData !== undefined && idData !== undefined && accessTokenData !== undefined) {
                        localStorage.setItem('email', emailData)
                        localStorage.setItem('name', nameData)
                        localStorage.setItem('accessToken', accessTokenData)
                        localStorage.setItem('id', idData)

                        const email = localStorage.getItem('email')
                        const name = localStorage.getItem('name')
                        const id = localStorage.getItem('id')
                        const accessToken = localStorage.getItem('accessToken')

                        if (email !== undefined && name !== undefined && id !== undefined && accessToken !== undefined) {
                            setAuth({
                                email, name, id, accessToken
                            })
                            console.log(from)
                            navigate(from, { replace: true })
                        } else {
                            setErrorMessage(data.message)
                        }
                    } else {
                        setErrorMessage(data.message)
                    }




                })
                .catch((err) => {
                    setErrorMessage(err.message)
                });
        } catch (err) {
            console.log(err)
        }


        setUser('')
        setPassword('')
        setSuccess(true)
    }

    return (

        <div className={styles.registerForm}>
            <div className={styles.boldLine}></div>
            <div className={styles.container}>
                <div className={styles.window}>
                    <div className={styles.overlay}></div>
                    <div className={styles.content}>
                        {errorMessage ? <p style={{ backgroundColor: 'red' }}>{errorMessage}</p> : ''}

                        <div className={styles.welcome}>Hello There!</div>
                        <div className={styles.subtitle}>Please log into your existing account.</div>
                        <div className={styles.inputFields}>

                            <form onSubmit={handleSubmit}>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}
                                    style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                                    id="email"
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
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

                                <div><button className={`${styles.ghostRound} ${styles.fullWidth} ${styles.buttonDiv}`}>Log in</button></div>
                                <div className={styles.subtitle}>Don't have an account yet? Sign up here.</div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div >

    )
}



