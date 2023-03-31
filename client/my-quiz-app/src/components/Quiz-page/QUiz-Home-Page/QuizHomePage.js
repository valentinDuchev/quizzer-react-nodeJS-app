import { Img } from "react-image"

import styles from './QuizHomePage.module.css'

export const QuizHomePage = () => {




    return (
        <div className={styles.quizHomeCardSolver}>

            <div className={styles.quizHomeCardSolverInfo}>
                <h1>Welcome to the quiz!</h1>
                <h2>Author: <a href="#">Peter Petrov</a></h2>
                <h3>Type: Public</h3>
                <h3>Topic: Sports</h3>
                <h3>People Solved: 66</h3>
                <h3>Ratin: 8.5/10</h3>
            </div>


            <div className={styles.quizHomeCardSolverStatistics}>

                <div className={styles.quizHomeCardSolverLikes}>
                    <p>22 Likes</p>
                </div>

                <div className={styles.quizHomeCardSolverDislikes}>
                    <p>5 Dislikes</p>
                </div>

            </div>


            <button>
                <h3>START THE QUIZ</h3>
            </button>





            <div className={styles.containerMt-5 }>
                <div className={styles.rowFlexJustifyContentCenter}>
                    <div className={styles.colMd-8}>

                        <div >
                            <h5>Comments(6)</h5>
                        </div>

                        <div className={styles.cardP-3}>
                            <div>
                                <div className={styles.userDFlexFlexRowAlignItemsCenter}>
                                    <Img src="/2. My Profile/Static images/profile-image.jpg" width="30"
                                        className={styles.userImgRoundedCircleMr-2}/>
                                        <span><small className={styles.fontWeightBoldTextPrimary}>james_olesenn</small> 
                                        <small className={styles.fontWeightBold}>Hmm, This poster looks cool</small></span>
                                </div>
                                <small>2 days ago</small>
                            </div>
                        </div>

                        {/* <div className="card p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="user d-flex flex-row align-items-center">
                                    <Img src="/2. My Profile/Static images/profile-image.jpg" width="30"
                                        className="user-img rounded-circle mr-2"/>
                                        <span><small className="font-weight-bold text-primary">james_olesenn</small> <small
                                            className="font-weight-bold">Hmm, This poster looks cool</small></span>
                                </div>
                                <small>2 days ago</small>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className={styles.bottomPartQuizSolver}>
                End
            </div>



            <div className={styles.quizHomeCardSolverComments}>
                <h2>Comments:</h2>
                <div className={styles.quizHomeCardSolverComment}>
                    <h2><a href="#">Peter Petrov </a>: Amazing Quiz </h2>
                </div>

                <div className={styles.quizHomeCardSolverComment}>
                    <h2><a href="#">Peter Petrov </a>: Amazing Quiz </h2>
                </div>

            </div>



        </div>
    )
}
