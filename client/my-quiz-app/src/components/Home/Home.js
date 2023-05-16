import { useEffect, useState } from 'react';
import { Img } from 'react-image';
import styles from './Home.module.css'

import Image from '../My-profile/profile-image.jpg';
import { Link } from 'react-router-dom';


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import imgSrc from './logo.png'
import profileImg from '../My-profile/profile-image.jpg'

export const Home = () => {

    const [newsFeed, setNewsFeed] = useState([])
    const [newsFeedSeen, setNewsFeedSeen] = useState([])
    const [topUsers, setTopUsers] = useState([])
    const [topQuizes, setTopQuizes] = useState([])
    const [hasLoadedUsers, setHasLoadedUsers] = useState(false)
    const [user, setUser] = useState('')

    const [hasSeen, setHasSeen] = useState(false)

    const [show, setShow] = useState(false);

    const [hasLoadedSeen, setHasLoadedSeen] = useState(false)



    useEffect(() => {
        console.log('yeaaj')
        try {
            const token = localStorage.getItem('accessToken')
            console.log(token)
            fetch(`http://localhost:3001/api/newsFeed`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.userData.newsFeedSeen);
                    setNewsFeed(data.userData.newsFeed)
                    setNewsFeedSeen(data.userData.newsFeedSeen)
                    setTopUsers(data.topUsers)
                    setTopQuizes(data.topQuizes)
                    setHasLoadedUsers(true)
                    setUser(data.userData.firstName)

                    const newDate = Date.now()

                    for (let item of data.userData.newsFeed) {
                        console.log(Date(item.dateCreated.slice(6, 16)).slice(4, 16))
                        console.log(Date(newDate).slice(8, 10))
                    }
                    let arr = []
                    setHasSeen(false)
                    setHasLoadedSeen(true)
                    console.log(topQuizes)
                    console.log(topUsers)
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err)
        }
    }, [hasSeen, hasLoadedSeen, hasLoadedUsers, user])

    useEffect(() => {

        console.log(newsFeedSeen)

    }, [hasLoadedSeen])

    const onHoverFunc = () => {
        const token = localStorage.getItem('accessToken')

        console.log('yeas')

        setHasSeen(true)


        fetch(`http://localhost:3001/api/newsFeedRemove`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'token': token,
                'seen': newsFeed.map((item) => (item._id))
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
    }

    const markAsSeen = (id) => {
        const token = localStorage.getItem('accessToken')

        fetch(`http://localhost:3001/api/markAsSeen/${id}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'token': token,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setHasSeen(true)

            })

    }

    const quizesAlreadySeen = () => {
        const token = localStorage.getItem('accessToken')

        fetch(`http://localhost:3001/api/getSeenQuizes`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'token': token,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })

    }


    const handleShow = () => {
        setShow(true);

    }

    //Handling the MODAL closing
    const handleClose = () => {
        setShow(false)
    }


    return (


        <>
            {localStorage.getItem('email')

                ? <div className={styles.homeDiv} >
                    <div>


                        <h2 styles={{ color: 'white', }}>Our top Users</h2>


                        {topUsers.map((item) =>
                            <div >
                                <Link to={`http://localhost:3000/profile/${item.email}`} key={item._id}>

                                    <div className={styles.ourTeam}>
                                        <div className={styles.picture}>
                                            <Img className={styles.imgFluid} src={profileImg} />
                                        </div>
                                        <div className={styles.teamContent}>
                                            <h3 className={styles.name}>{item.firstName} {item.lastName}</h3>
                                            <h4 className={styles.title}>Rating: {item.rating}</h4>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ---------------------------------------------------------------- */}

                    <div className={styles.quizesDiv}>

                        <h1 style={{ color: 'white' }}>Newsfeed</h1>


                        <button onClick={onHoverFunc} className={`${styles.ghostRound} ${styles.fullWidth}`}>Mark all as seen</button><br />

                        <button onClick={handleShow} className={`${styles.ghostRound} ${styles.fullWidth}`}>Seen quizes</button>


                        <Link to="/create" >
                            <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', background: 'white' }}>
                                <Img className={styles.profileImage} src={Image} style={{ width: '50px', height: '50px', borderRadius: '50%', marginLeft: 'auto', marginRight: '20px' }} />

                                Create Your own quiz, {user}
                            </div>
                        </Link>



                        {newsFeed.length > 0 ? newsFeed.map((item) => {
                            item &&
                                <div className={styles.quizCard} key={item._id}>
                                    <div className={styles.quizCardBody}>
                                        <h4 ><Link to={`http://localhost:3000/profile/${item.authorEmail}`} style={{ textDecoration: 'underline', color: 'black' }}>{item.authorEmail}</Link> posted a quiz!</h4>
                                        <h5>Title: {item.title}</h5>
                                        <p>Topic: {item.topic}</p>
                                        <Link to={`http://localhost:3000/quiz-page/${item._id}/firstPage`} className={styles.cardLink}>Check it out!</Link>
                                        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                                            <h6>{Date(item.dateCreated.slice(6, 16)).slice(4, 16)}</h6>
                                            <button style={{ marginBottom: '0px' }} onClick={(id) => markAsSeen(item._id)}>Mark as seen</button>
                                        </div>
                                    </div>
                                </div>
                        }

                        ) : ''}


                        <div style={{ marginTop: '50px' }}>
                            <h1 style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>You are up to date!</h1>
                            <button className={`${styles.ghostRound} ${styles.fullWidth}`} onClick={handleShow}>Quizes already seen</button>
                        </div>





                    </div>

                    <div>

                        <h2>Our top Quizes</h2>

                        {topQuizes.map((item) =>
                            <div >
                                <Link to={`http://localhost:3000/quiz-page/${item._id}/firstPage`} key={item._id}>

                                    <div className={styles.ourTeam}>
                                        <div className={styles.picture}>
                                            <Img className={styles.imgFluid} src={imgSrc} />
                                        </div>
                                        <div className={styles.teamContent}>
                                            <h3 className={styles.name}>{item.title}</h3>
                                            <h4 className={styles.title}>Topic: {item.topic}</h4>
                                            <h4 className={styles.title}>Author: {item.authorEmail}</h4>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        )}




                    </div>



                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>All solved quizes of </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            {newsFeedSeen.length > 0 ? newsFeedSeen.map((item) =>
                                <div className={styles.quizCard} key={item._id} style={{ background: 'grey' }}>
                                    <div className={styles.quizCardBody}>
                                        <h4>Peter posted a quiz!</h4>
                                        <h5>Title: {item.title}</h5>
                                        <p>Topic: {item.topic}</p>
                                        <Link to={`http://localhost:3000/quiz-page/${item._id}/firstPage`} className={styles.cardLink}>Check it out!</Link>
                                        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                                            <h6 style={{ color: 'black' }}>{Date(item.dateCreated.slice(6, 16)).slice(4, 16)}</h6>
                                        </div>
                                    </div>
                                </div>

                            ) : <h1>You have no quizes seen!</h1>}

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </div>

                : <div className={styles.homeDiv2} >

                    <Img style={{ height: '500px', marginLeft: '40px', marginTop: '40px' }} src={imgSrc} />

                    <div>

                        {/* <h1 className={styles.h1Home}>Discover,
                            <span className={`${styles.underlined} ${styles.underlineClip}`}>Sell</span>
                            <br />
                            & Collect
                            <span clasNames={`${styles.underlined} ${styles.underlineMask}`}>Rare</span>
                            <br />
                            <span className={`${styles.underlined} ${styles.underlineOverflow}`}>NFTs</span>
                        </h1> */}

                        <div className={styles.containerHome}>
                            <h1 contenteditable className={styles.h1Home}>Quizzer</h1>
                            <p className={styles.pHome}>Create and Solve quizes</p>
                            <p className={styles.pHome}>Earn rating by Solving and Creating as many quizes as possible!</p>
                            <h3 className={styles.h3Home}>
                                <Link style={{ color: 'black', textDecoration: 'underline' }} to={`http://localhost:3000/login`}>Log in</Link>
                            </h3>
                            <h3 className={styles.h3Home}>
                                <Link style={{ color: 'black', textDecoration: 'underline' }} to={`http://localhost:3000/register`}>Register</Link>
                            </h3>
                        </div>


                    </div>
                </div>}

        </>
    )
};