import { MyQuizCard } from '../Cards/My-quiz-card/MyQuizCard';
import './MyProfile.module.css'
import styles from './MyProfile.module.css'; // Import css modules stylesheet as styles
import {Img} from 'react-image'


export const MyProfile = () => {
    return <div className={styles.myProfileSection}>
        <div className={styles.titleProfile}>
            <div className={styles.titleProfileName}>
                <h1>Peter Petrov - peter@abv.bg</h1>
            </div>

            <div className={styles.titleProfileData}>
                <div className={styles.titleProfileFollowers}>
                    <h2>Followers </h2>
                    <h2>26</h2>
                </div>

                <div className={styles.titleProfileFollowing}>
                    <h2>Following </h2>
                    <h2>26</h2>
                </div>

                <div className={styles.titleProfileRating}>
                    <h2>Rating </h2>
                    <h2>22/100</h2>
                </div>
            </div>
        </div>

        <div className={styles.titleProfileMobile}>


            <div className={styles.titleProfileNameDivMobile}>

                <div className={styles.titleProfileNameMobile}>
                    <h1>Peter Petrov - peter@abv.bg</h1>
                </div>

            </div>


            <div className={styles.titleProfileNameDataMobile}>



                <div className={styles.divTitleProfileImageMobile}>
                    <Img src="./Static images/profile-image.jpg" className={styles.titleProfileImageMobile}/>
                </div>


                <div className={styles.titleProfileDataMobile}>
                    <div className={styles.titleProfileFollowersMobile}>
                        <h2>Followers </h2>
                        <h3>26</h3>
                    </div>

                    <div className={styles.titleProfileFollowingMobile}>
                        <h2>Following </h2>
                        <h3>26</h3>
                    </div>

                    <div className={styles.titleProfileRatingMobile}>
                        <h2>Rating </h2>
                        <h3>22/100</h3>
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.asideProfile}>

            <Img src="./Static images/profile-image.jpg" className={styles.asideProfileImage}/>

                <div className={styles.asideQuizesInfo}>

                    <div className={styles.asideQuizesInfoHeadings}>
                        <h2 className={styles.quizesCreated}>Quizes Created: 10</h2>
                        <h2>Quizes Created: 10</h2>
                        <h2>Quizes Created: 10</h2>
                        <h2>Quizes Created: 10</h2>
                        <h2>Quizes Created: 10</h2>
                        <h2>Rating: 22</h2>
                    </div>
                </div>

        </div>

        <div className={styles.asideProfileMobile}>

        </div>



        <div className={styles.firstMainProfile}>


            {/* <div className={styles.coursesContainer}>
                <div className={styles.course}>
                    <div className={styles.coursePreview}>
                        <h6>Topic</h6>
                        <h2>Sports</h2>

                        <h5>Author:</h5>
                        <a href="#"> pesho_01 <i className="fas fa-chevron-right"></i></a>
                    </div>
                    <div className={styles.courseInfo}>

                        <h6>Title</h6>
                        <h2>Sports quiz to challenge you</h2>


                        <h6>FORMAT</h6>
                        <h4>Who wants to be a millionaire</h4>

                        <h6>Questions number</h6>
                        <h4>15</h4>

                        <h6>Privacy</h6>
                        <h4>Public</h4>
                        <button className={styles.btn}>Details</button>
                    </div>
                </div>
            </div>

            <div className={styles.coursesContainer}>
                <div className={styles.course}>
                    <div className={styles.coursePreview}>
                        <h6>Topic</h6>
                        <h2>Sports</h2>

                        <h5>Author:</h5>
                        <a href="#"> pesho_01 <i className="fas fa-chevron-right"></i></a>
                    </div>
                    <div className={styles.courseInfo}>

                        <h6>Title</h6>
                        <h2>Sports quiz to challenge you</h2>


                        <h6>FORMAT</h6>
                        <h4>Who wants to be a millionaire</h4>

                        <h6>Questions number</h6>
                        <h4>15</h4>

                        <h6>Privacy</h6>
                        <h4>Public</h4>
                        <button className={styles.btn}>Details</button>
                    </div>
                </div>
            </div>

            <div className={styles.coursesContainer}>
                <div className={styles.course}>
                    <div className={styles.coursePreview}>
                        <h6>Topic</h6>
                        <h2>Sports</h2>

                        <h5>Author:</h5>
                        <a href="#"> pesho_01 <i className="fas fa-chevron-right"></i></a>
                    </div>
                    <div className={styles.courseInfo}>

                        <h6>Title</h6>
                        <h2>Sports quiz to challenge you</h2>


                        <h6>FORMAT</h6>
                        <h4>Who wants to be a millionaire</h4>

                        <h6>Questions number</h6>
                        <h4>15</h4>

                        <h6>Privacy</h6>
                        <h4>Public</h4>
                        <button className={styles.btn}>Details</button>
                    </div>
                </div>
            </div> */}

            <MyQuizCard/>

            <MyQuizCard/>



        </div>

        <div className={styles.firstMainProfileMobile}>



            <button className={styles.openCoursesContainerMobile}>
                Quizes
            </button>


            <div className={styles.quizCardMobile}>
                <div className={styles.coursePreviewMobile}>

                    <div className={styles.quizTitleMobile}>
                        <h1>Sports quiz to challenge you</h1>
                    </div>

                    <button className={styles.quizDetailsMobile}>
                        Details
                    </button>

                </div>

                <div className={styles.coursePreviewMobile}>

                    <div className={styles.quizTitleMobile}>
                        <h1>Sports quiz to challenge you</h1>
                    </div>

                    <button className={styles.quizDetailsMobile}>
                        Details
                    </button>

                </div>
            </div>

            <button className={styles.openCoursesContainerMobile}>
                Statistics
            </button>

            <div className={styles.quizStatsMobile}>
                <div className={styles.asideQuizesInfoHeadings}>
                    <h2 className={styles.quizesCreated}>Quizes Created: 10</h2>
                    <h2>Quizes Created: 10</h2>
                    <h2>Quizes Created: 10</h2>
                    <h2>Quizes Created: 10</h2>
                    <h2>Quizes Created: 10</h2>
                    <h2>Rating: 22</h2>
                </div>
            </div>


            <button className={styles.openCoursesContainerMobile}>
                Recent quizes charts
            </button>

            <div className={styles.quizChartMobile}>
                <Img src="./Static images/how-to-bar-2.jpg" className={styles.chartImageMobile}/>
            </div>


        </div>


        <div className={styles.secondMainProfile}>


            <Img src="./Static images/how-to-bar-2.jpg"/>

        </div>
    </div>
        ;
};