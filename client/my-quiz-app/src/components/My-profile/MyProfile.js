import { MyQuizCard } from '../Cards/My-quiz-card/MyQuizCard';
import './MyProfile.module.css'
import styles from './MyProfile.module.css'; // Import css modules stylesheet as styles
import { Img } from 'react-image'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Image from './profile-image.jpg';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export const MyProfile = () => {

    const [profileData, setProfileData] = useState({})
    const [isMyOwnProfile, setIsMyOwnProfile] = useState(true)

    const [followers, setFollowers] = useState('')


    const [unfollowButton, setUnfollowButton] = useState(false)
    const [unfollowButtonSecond, setUnollowButtonSecond] = useState(true)

    const [show, setShow] = useState(false);
    const [detailsShow, setDetailsShow] = useState(false)
    const [quizesSolvedShow, setQuizesSolvedShow] = useState(false)

    const [zeroFollowing, setZeroFollowing] = useState(false)

    const navigate = useNavigate()

    const { email } = useParams()
    console.log(email)

    useEffect(() => {
        try {
            const token = localStorage.getItem('accessToken')
            console.log(token)
            fetch(`http://localhost:3001/api/users/profile/${email}`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setProfileData(data.userData)
                    console.log(profileData)
                    setIsMyOwnProfile(data.isMyOwnProfile)
                    setFollowers(data.userData.followersNumber)
                    if (!isMyOwnProfile) {
                        for (let follower of data.userData.followers) {
                            if (follower._id === data.myUserData._id) {
                                setUnfollowButton(true)
                            }
                        }
                    }
                    let followingOnlyId = []



                    console.log()
                    // Handle data
                    // navigate('/my-profile') 
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err)
        }
    }, [profileData.followingNumber,
    profileData.followersNumber,
        followers, unfollowButton,
        unfollowButtonSecond,
    profileData.followingNumber,
        zeroFollowing,
        followers])


    // Redirecting to the quiz page in case of click
    const onDetailsClick = (quizId) => {
        navigate(`/quiz-page/${quizId}/firstPage`)
    }

    //FIRST Follow functionality - on opening another account, you can follow it from the main page
    const follow = () => {
        const token = localStorage.getItem('accessToken')
        try {
            fetch(`http://localhost:3001/api/users/${email}/follow`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error !== '') {
                        alert(data.error)
                    }

                    setFollowers(data.userToFollow.followersNumber)
                    setUnfollowButton(true)
                    if (profileData.followingNumber < 1) {
                        setZeroFollowing(true)
                    }
                    console.log(data)

                    // navigate('/my-profile')
                })
                .catch((err) => {
                    console.log(err.message);

                });
        } catch (err) {
            console.log(err)
        }
    }

    //FIRST UnFollow functionality - on opening another account, you can unfollow it (if followed) from the main page
    const unfollow = () => {
        const token = localStorage.getItem('accessToken')
        try {
            fetch(`http://localhost:3001/api/users/${email}/unfollow`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error !== '') {
                        alert(data.error)
                    }

                    setFollowers(data.userToFollow.followersNumber)
                    setUnfollowButton(false)
                    console.log(data)

                    // navigate('/my-profile')
                })
                .catch((err) => {
                    console.log(err.message);

                });
        } catch (err) {
            console.log(err)
        }

    }

    //Don't remmeber why is that here, just scared to remove it
    useEffect(() => {
        console.log('useef')
    }, [followers, unfollowButton])


    //Handling the MODAL showing
    const handleShow = () => {
        setShow(true);
        setDetailsShow(false)
        setQuizesSolvedShow(true)
    }

    //Handling the MODAL closing
    const handleClose = () => {
        setShow(false)
        setQuizesSolvedShow(false)
        setDetailsShow(false)

    }

    //Handling the conditional showing of the modal - whether the Followers/Following or the Solved quizes
    const handleDetailsShow = () => {
        setDetailsShow(true)
        setQuizesSolvedShow(false)
        setShow(true)
    }

    //SECOND Unfollow - on opening the modal, the user has the people he already followed shown. 
    //He can choose to unfollow some of them from there (same as instagram)
    const unfollowSecond = (email) => {
        const token = localStorage.getItem('accessToken')
        try {
            fetch(`http://localhost:3001/api/users/${email}/unfollow`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error !== '') {
                        alert(data.error)
                    }

                    setFollowers(data.userToFollow.followersNumber)
                    setUnollowButtonSecond(false)
                    if (profileData.followingNumber < 1) {
                        setZeroFollowing(true)
                    } else {
                        setZeroFollowing(false)
                    }
                    profileData.followingNumber--;
                    console.log(data)
                    if (profileData.followingNumber < 2) {
                    }

                    // navigate('/my-profile')
                })
                .catch((err) => {
                    console.log(err.message);

                });
        } catch (err) {
            console.log(err)
        }
    }

    //SECOND Follow button (named third because it is in the same area as the third unfollow)
    //It is activated when the user has its followers shown and has the choice to follow them (if still not followed)
    //So, if he hasn't followed some of his followers, he can do it here (same as instagram as well)
    const followButtonThird = (email) => {

        const token = localStorage.getItem('accessToken')
        try {
            fetch(`http://localhost:3001/api/users/${email}/follow`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error !== '') {
                        alert(data.error)
                    }

                    setFollowers(data.userToFollow.followersNumber)
                    if (profileData.followingNumber < 1) {
                        setZeroFollowing(true)
                    }
                    console.log(data)

                    // navigate('/my-profile')
                })
                .catch((err) => {
                    console.log(err.message);

                });
        } catch (err) {
            console.log(err)
        }

        console.log(email)
    }

    //THIRD Unfollow button - activated the same way as the second follow button (named third) -
    //Basically, when the user sees his followers and in case he has followed some of them and wants to
    //unfollow them, he can do that here (same as instagram as weeeell)
    const unfollowButtonThird = (email) => {

        const token = localStorage.getItem('accessToken')
        try {
            fetch(`http://localhost:3001/api/users/${email}/unfollow`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error !== '') {
                        alert(data.error)
                    }

                    setFollowers(data.userToFollow.followersNumber)
                    setUnollowButtonSecond(false)
                    if (profileData.followingNumber < 1) {
                        setZeroFollowing(true)
                    } else {
                        setZeroFollowing(false)
                    }
                    profileData.followingNumber--;
                    console.log(data)

                    // navigate('/my-profile')
                })
                .catch((err) => {
                    console.log(err.message);

                });
        } catch (err) {
            console.log(err)
        }

        console.log(email)
    }





    return (
        <div className={styles.profileDiv}>

            {/*  Should remove that aside, but scared as well :D*/}
            <div className={styles.aside}>

                <div className={styles.imageDiv}>
                    <Img className={styles.profileImage} src={Image} />

                </div>

                <div className={styles.asideDataProfile}>

                    {!isMyOwnProfile
                        ? unfollowButton
                            ? <button
                                className={`${styles.ghostRound} ${styles.fullWidth} ${styles.buttonDiv}`}
                                onClick={unfollow}>
                                Unfollow
                            </button>

                            : <button
                                className={`${styles.ghostRound} ${styles.fullWidth} ${styles.buttonDiv}`}
                                onClick={follow}>
                                Follow
                            </button>
                        : <button
                            className={`${styles.ghostRound} ${styles.fullWidth} ${styles.buttonDiv}`}
                            onClick={handleDetailsShow}
                        >
                            Profile Details
                        </button>
                    }

                    <div>
                        {isMyOwnProfile ? <button
                            className={`${styles.ghostRound} ${styles.fullWidth} ${styles.buttonDiv}`}
                            onClick={handleShow}
                        >
                            Solved Quizes
                        </button> : ''}
                    </div>

                    {isMyOwnProfile ? <div>
                        <button
                            className={`${styles.ghostRound} ${styles.fullWidth} ${styles.buttonDiv}`}
                            onClick={handleDetailsShow}
                        >
                            Generate statistics
                        </button>
                    </div> : ''}



                </div>

            </div>

            {/* The easiest part - showing some user data (without much detail) */}
            <div className={styles.main}>
                <div className={styles.firstRow}>
                    <div className={styles.name}>
                        <h2>{profileData.firstName}</h2>
                    </div>

                    <div className={styles.data}>
                        <h3> Followers<br /> {profileData.followersNumber}</h3>
                        <h3> Following<br /> {profileData.followingNumber}</h3>
                        <h3> Rating <br /> {profileData.rating} </h3>
                    </div>
                </div>

                <h1>Quizes Created ({profileData.quizesCreated ? profileData.quizesCreated.length : ''})</h1>


                <div className={styles.quizes}>


                    {profileData.quizesCreated ? profileData.quizesCreated.map((quiz) =>
                        <div className={styles.quizCard}>
                            <h1>{quiz.title}</h1>
                            <h2>{quiz.topic}</h2>
                            <button onClick={() => onDetailsClick(quiz._id)}>Details</button>
                        </div>
                    ) : <><h1>NO </h1> <h1>QUIZES</h1> <h1>CREATED</h1></>}


                </div>

            </div>


            {/* MODALS BEING SHOWED BY CLICK ON SOME OF THE BUTTOND - 
            BAD TECHNIQUE, BUT NO TIME TO MAKE IT PROPPERLY, TO BE FIXED LATER */}


            {/*1. Solved quizes - 
            all quizes the user has solved along with some details for them
            Showing the same modal twice (for now) and changing the data in it conditionaly
            */}

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>All solved quizes of {profileData.firstName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {quizesSolvedShow
                        //First Modal type - showing the User's solved quizes
                        ?
                        <table style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <tr>
                                <th>Title</th>
                                <th>Topic</th>
                                <th>Author</th>
                                <th>Rating</th>
                                <th>Result</th>

                            </tr>
                            {
                                profileData.quizesSolved
                                    ?
                                    profileData.quizesSolved.map((quiz) =>
                                        <tr>
                                            <td>
                                                <Link
                                                    to={`http://localhost:3000/quiz-page/${quiz._id}/firstPage`}
                                                    style={{ textDecoration: 'underline' }}
                                                >
                                                    {quiz.title}
                                                </Link>
                                            </td>

                                            <td>
                                                {quiz.topic}
                                            </td>

                                            <td>
                                                <Link
                                                    to={`http://localhost:3000/profile/${quiz.authorEmail}`}
                                                    style={{ textDecoration: 'underline' }}
                                                >
                                                    {quiz.authorEmail}
                                                </Link>
                                            </td>

                                            <td>
                                                {
                                                    quiz.rating
                                                        ?
                                                        <span>{quiz.rating}/5 ({quiz.ratedNumber} rating/s) </span>
                                                        : <span>Not rated</span>
                                                }
                                            </td>
                                            <td>
                                                {quiz.result}/{quiz.questions.length}
                                                ({(quiz.result / quiz.questions.length * 100).toFixed(2)}%)
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <h2>NO QUIZES SOLVED</h2>}
                        </table>

                        //Second Modal type - showing the User's Followers/People Followed                           
                        :
                        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                            {/* FIRST Section of second modal type - FOLLOWERS*/}
                            <div>
                                <h1>Followers: </h1>
                                {profileData.followersNumber > 0
                                    ?
                                    profileData.followers.map((follower) =>
                                        <div>

                                            {profileData.followingId.includes(follower._id)
                                                //Followers section - giving the user the option to FOLLOW/UNFOLLOW some of his followers
                                                ?
                                                <div>
                                                    <span>{follower.email}</span>
                                                    <span style={{ color: 'violet' }}>*following*</span>
                                                    <button onClick={(email) => unfollowButtonThird(follower.email)}>Unfollow</button>
                                                </div>

                                                :
                                                <div>
                                                    <span>{follower.email}</span>
                                                    <button onClick={(email) => followButtonThird(follower.email)}>Follow</button>
                                                </div>
                                            }
                                        </div>
                                    )
                                    :
                                    <span>No followers</span>
                                }
                            </div>

                            {/* SECOND section of second modal type - PEOPLE FOLLOWED*/}
                            <div>
                                <h1>Following: </h1>
                                {profileData.followingNumber > 0
                                    ?
                                    profileData.following.map((following) =>
                                        <div>
                                            <span>{following.email}</span>
                                            {
                                                Number(profileData.followingNumber) > 0
                                                    ?
                                                    <button onClick={(email) => unfollowSecond(following.email)}>Unfollow</button>
                                                    :
                                                    ''
                                            }
                                        </div>
                                    )
                                    :
                                    <span>No People Followed</span>

                                }
                            </div>

                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};


