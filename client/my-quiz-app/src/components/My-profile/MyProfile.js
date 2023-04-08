import { MyQuizCard } from '../Cards/My-quiz-card/MyQuizCard';
import './MyProfile.module.css'
import styles from './MyProfile.module.css'; // Import css modules stylesheet as styles
import { Img } from 'react-image'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const MyProfile = () => {

    const [profileData, setProfileData] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        try {
            const token = localStorage.getItem('accessToken')
            console.log(token)
            fetch('http://localhost:3001/api/users/myProfile', {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setProfileData(data.userData)
                    console.log(profileData)
                    // Handle data
                    // navigate('/my-profile')
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err)
        }
    }, [profileData.liked])

    
    const onDetailsClick = (quizId) => {
        navigate(`/quiz-page/${quizId}/firstPage`)
    }

    return (
        <div className={styles.profileDiv}>

            <div className={styles.aside}>

                <div className={styles.imageDiv}>
                    <Img className={styles.profileImage} src="./Static images/profile-image.jpg" />
                </div>

                <div className={styles.asideDataProfile}>
                    <div className={styles.personal}>
                        <h3>Quizes Created <span style={{ fontWeight: 'bold' }}></span></h3>
                        <h3>Likes <span style={{ fontWeight: 'bold' }}>TODO</span></h3>
                        <h3>Dislikes <span style={{ fontWeight: 'bold' }}>TODO</span></h3>
                    </div>
                    <div className={styles.personal2}>
                        <h3>Quizes Liked <span style={{ fontWeight: 'bold' }}>{profileData.liked}</span></h3>
                        <h3>Quizes Disliked <span style={{ fontWeight: 'bold' }}>{profileData.disliked}</span></h3>
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
                        <h3> Followers<br /> TODO</h3>
                        <h3> Following<br /> TODO</h3>
                        <h3> Quizes Created<br /> </h3>
                    </div>


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


