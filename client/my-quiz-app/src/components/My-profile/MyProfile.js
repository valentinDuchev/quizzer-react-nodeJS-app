import { MyQuizCard } from '../Cards/My-quiz-card/MyQuizCard';
import './MyProfile.module.css'
import styles from './MyProfile.module.css'; // Import css modules stylesheet as styles
import { Img } from 'react-image'



export const MyProfile = () => {
    return (
        <div className={styles.profileDiv}>

            <div className={styles.aside}>

                <div className={styles.imageDiv}>
                    <Img className={styles.profileImage} src="./Static images/profile-image.jpg" />
                </div>

                <div className={styles.asideDataProfile}>
                    <div className={styles.personal}>
                        <h3>Quizes Created <span style={{ fontWeight: 'bold' }}>10</span></h3>
                        <h3>Likes <span style={{ fontWeight: 'bold' }}>10</span></h3>
                        <h3>Dislikes <span style={{ fontWeight: 'bold' }}>10</span></h3>
                    </div>
                    <div className={styles.personal2}>
                        <h3>Quizes Liked <span style={{ fontWeight: 'bold' }}>10</span></h3>
                        <h3>Quizes Disliked <span style={{ fontWeight: 'bold' }}>10</span></h3>
                        <h3>Quizes Solved <span style={{ fontWeight: 'bold' }}>10</span></h3>
                    </div>

                    <div>
                        <button className={`${styles.ghostRound} ${styles.fullWidth} ${styles.buttonDiv}`}>Generate statistics</button>
                    </div>

                </div>

            </div>

            <div className={styles.main}>
                <div className={styles.firstRow}>

                    <div className={styles.name}>
                        <h2>Peter Petrov</h2>
                    </div>

                    <div className={styles.data}>
                        <h3> Followers<br /> 64</h3>
                        <h3> Followers<br /> 64</h3>
                        <h3> Followers<br /> 64</h3>
                    </div>
                </div>

            </div>
        </div>
    )
};


{/* <div classNameName={styles.myProfileSection}>
        <div classNameName={styles.titleProfile}>
            <div classNameName={styles.titleProfileName}>
                <h1>Peter Petrov - peter@abv.bg</h1>
            </div>

            <div classNameName={styles.titleProfileData}>
                <div classNameName={styles.titleProfileFollowers}>
                    <h2>Followers </h2>
                    <h2>26</h2>
                </div>

                <div classNameName={styles.titleProfileFollowing}>
                    <h2>Following </h2>
                    <h2>26</h2>
                </div>

                <div classNameName={styles.titleProfileRating}>
                    <h2>Rating </h2>
                    <h2>22/100</h2>
                </div>
            </div>
        </div>

        <div classNameName={styles.titleProfileMobile}>


            <div classNameName={styles.titleProfileNameDivMobile}>

                <div classNameName={styles.titleProfileNameMobile}>
                    <h1>Peter Petrov - peter@abv.bg</h1>
                </div>

            </div>


            <div classNameName={styles.titleProfileNameDataMobile}>



                <div classNameName={styles.divTitleProfileImageMobile}>
                    <Img src="./Static images/profile-image.jpg" classNameName={styles.titleProfileImageMobile}/>
                </div>


                <div classNameName={styles.titleProfileDataMobile}>
                    <div classNameName={styles.titleProfileFollowersMobile}>
                        <h2>Followers </h2>
                        <h3>26</h3>
                    </div>

                    <div classNameName={styles.titleProfileFollowingMobile}>
                        <h2>Following </h2>
                        <h3>26</h3>
                    </div>

                    <div classNameName={styles.titleProfileRatingMobile}>
                        <h2>Rating </h2>
                        <h3>22/100</h3>
                    </div>
                </div>
            </div>
        </div>

        <div classNameName={styles.asideProfile}>

            <Img src="./Static images/profile-image.jpg" classNameName={styles.asideProfileImage}/>

                <div classNameName={styles.asideQuizesInfo}>

                    <div classNameName={styles.asideQuizesInfoHeadings}>
                        <h2 classNameName={styles.quizesCreated}>Quizes Created: 10</h2>
                        <h2>Quizes Created: 10</h2>
                        <h2>Quizes Created: 10</h2>
                        <h2>Quizes Created: 10</h2>
                        <h2>Quizes Created: 10</h2>
                        <h2>Rating: 22</h2>
                    </div>
                </div>

        </div>

        <div classNameName={styles.asideProfileMobile}>

        </div>



        <div classNameName={styles.firstMainProfile}>


            <div classNameName={styles.coursesContainer}>
                <div classNameName={styles.course}>
                    <div classNameName={styles.coursePreview}>
                        <h6>Topic</h6>
                        <h2>Sports</h2>

                        <h5>Author:</h5>
                        <a href="#"> pesho_01 <i classNameName="fas fa-chevron-right"></i></a>
                    </div>
                    <div classNameName={styles.courseInfo}>

                        <h6>Title</h6>
                        <h2>Sports quiz to challenge you</h2>


                        <h6>FORMAT</h6>
                        <h3>Who wants to be a millionaire</h3>

                        <h6>Questions number</h6>
                        <h3>15</h3>

                        <h6>Privacy</h6>
                        <h3>Public</h3>
                        <button classNameName={styles.btn}>Details</button>
                    </div>
                </div>
            </div>

            <div classNameName={styles.coursesContainer}>
                <div classNameName={styles.course}>
                    <div classNameName={styles.coursePreview}>
                        <h6>Topic</h6>
                        <h2>Sports</h2>

                        <h5>Author:</h5>
                        <a href="#"> pesho_01 <i classNameName="fas fa-chevron-right"></i></a>
                    </div>
                    <div classNameName={styles.courseInfo}>

                        <h6>Title</h6>
                        <h2>Sports quiz to challenge you</h2>


                        <h6>FORMAT</h6>
                        <h3>Who wants to be a millionaire</h3>

                        <h6>Questions number</h6>
                        <h3>15</h3>

                        <h6>Privacy</h6>
                        <h3>Public</h3>
                        <button classNameName={styles.btn}>Details</button>
                    </div>
                </div>
            </div>

            <div classNameName={styles.coursesContainer}>
                <div classNameName={styles.course}>
                    <div classNameName={styles.coursePreview}>
                        <h6>Topic</h6>
                        <h2>Sports</h2>

                        <h5>Author:</h5>
                        <a href="#"> pesho_01 <i classNameName="fas fa-chevron-right"></i></a>
                    </div>
                    <div classNameName={styles.courseInfo}>

                        <h6>Title</h6>
                        <h2>Sports quiz to challenge you</h2>


                        <h6>FORMAT</h6>
                        <h3>Who wants to be a millionaire</h3>

                        <h6>Questions number</h6>
                        <h3>15</h3>

                        <h6>Privacy</h6>
                        <h3>Public</h3>
                        <button classNameName={styles.btn}>Details</button>
                    </div>
                </div>
            </div>

            <MyQuizCard/>

            <MyQuizCard/>



        </div>

        <div classNameName={styles.firstMainProfileMobile}>



            <button classNameName={styles.openCoursesContainerMobile}>
                Quizes
            </button>


            <div classNameName={styles.quizCardMobile}>
                <div classNameName={styles.coursePreviewMobile}>

                    <div classNameName={styles.quizTitleMobile}>
                        <h1>Sports quiz to challenge you</h1>
                    </div>

                    <button classNameName={styles.quizDetailsMobile}>
                        Details
                    </button>

                </div>

                <div classNameName={styles.coursePreviewMobile}>

                    <div classNameName={styles.quizTitleMobile}>
                        <h1>Sports quiz to challenge you</h1>
                    </div>

                    <button classNameName={styles.quizDetailsMobile}>
                        Details
                    </button>

                </div>
            </div>

            <button classNameName={styles.openCoursesContainerMobile}>
                Statistics
            </button>

            <div classNameName={styles.quizStatsMobile}>
                <div classNameName={styles.asideQuizesInfoHeadings}>
                    <h2 classNameName={styles.quizesCreated}>Quizes Created: 10</h2>
                    <h2>Quizes Created: 10</h2>
                    <h2>Quizes Created: 10</h2>
                    <h2>Quizes Created: 10</h2>
                    <h2>Quizes Created: 10</h2>
                    <h2>Rating: 22</h2>
                </div>
            </div>


            <button classNameName={styles.openCoursesContainerMobile}>
                Recent quizes charts
            </button>

            <div classNameName={styles.quizChartMobile}>
                <Img src="./Static images/how-to-bar-2.jpg" classNameName={styles.chartImageMobile}/>
            </div>


        </div>


        <div classNameName={styles.secondMainProfile}>


            <Img src="./Static images/how-to-bar-2.jpg"/>

        </div>
    </div>
        ; */}