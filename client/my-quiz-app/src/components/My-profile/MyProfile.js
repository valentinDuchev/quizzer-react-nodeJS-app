import { MyQuizCard } from '../Cards/My-quiz-card/MyQuizCard';
import './MyProfile.module.css'
import styles from './MyProfile.module.css'; // Import css modules stylesheet as styles
import { Img } from 'react-image'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



export const MyProfile = () => {

    const [profileData, setProfileData] = useState({})
    const [isMyOwnProfile, setIsMyOwnProfile] = useState(true)

    const [followers, setFollowers] = useState('')

    const [hasFollowed, setHasFollowed] = useState('')

    const [unfollowButton, setUnfollowButton] = useState(false)



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
                        console.log(data.userData.followers.includes(data.myUserData._id))
                        if (data.userData.followers.includes(data.myUserData._id)) {
                            setUnfollowButton(true)
                        }

                    }

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
    }, [profileData.followingNumber, profileData.followersNumber, followers, unfollowButton])


    const onDetailsClick = (quizId) => {
        navigate(`/quiz-page/${quizId}/firstPage`)
    }

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


    useEffect(() => {
        console.log('useef')
    }, [followers, unfollowButton])

    return (
        <div className={styles.profileDiv}>

            <div className={styles.aside}>

                <div className={styles.imageDiv}>
                    <Img className={styles.profileImage} src="./Static images/profile-image.jpg" />
                </div>

                <div className={styles.asideDataProfile}>
                ☆★
                    <div className={styles.personal}>
                        <h3>Quizes Created <span style={{ fontWeight: 'bold' }}></span></h3>
                        <h3>Likes <span style={{ fontWeight: 'bold' }}>TODO</span></h3>
                        <h3>Dislikes <span style={{ fontWeight: 'bold' }}>TODO</span></h3>
                    </div>
                    <div className={styles.personal2}>
                        <h3>Quizes Liked <span style={{ fontWeight: 'bold' }}></span></h3>
                        <h3>Quizes Disliked <span style={{ fontWeight: 'bold' }}></span></h3>
                        <h3>Quizes Solved <span style={{ fontWeight: 'bold' }}>{profileData.solved}</span></h3>
                    </div>

                    <div>
                        <button className={`${styles.ghostRound} ${styles.fullWidth} ${styles.buttonDiv}`}>Generate statistics</button>
                    </div>

                </div>

            </div>

            <div className={styles.main}>
                <div className={styles.firstRow}>

                    <div className={styles.name}>
                        <h2>{profileData.firstName}</h2>
                    </div>

                    <div className={styles.data}>
                        <h3> Followers<br /> {profileData.followersNumber}</h3>
                        <h3> Following<br /> {profileData.followingNumber}</h3>
                        <h3> Quizes <br /> {profileData.quizesNumber} </h3>
                    </div>

                    {!isMyOwnProfile
                        ? unfollowButton
                            ? <button onClick={unfollow}>Unfollow</button>
                            : <button onClick={follow}>Follow</button>
                        : <button>Edit</button>
                    }


                </div>

                <div className={styles.quizes}>


                    {profileData.quizesCreated ? profileData.quizesCreated.map((quiz) =>
                        <div className={styles.quizCard}>
                            <h1>{quiz.title}</h1>
                            <h2>{quiz.topic}</h2>
                            <button onClick={() => onDetailsClick(quiz._id)}>Details</button>
                        </div>
                    ) : ''}


                </div>

            </div>
        </div>
    )
};


