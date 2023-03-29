import styles from "./MyQuizCard.module.css"

import {Img} from 'react-image'


export const MyQuizCard = () => {

    return <div className={styles.coursesContainer}>
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


};