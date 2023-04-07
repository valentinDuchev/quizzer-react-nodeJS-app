import { Img } from "react-image"

import { Link, useNavigate } from "react-router-dom"

import styles from "./SingleQuizCard.module.css"

export const SingleQuizCard = (props) => {

    const navigate = useNavigate()


    const onDetailsClick = (id) => {
        console.log(id)
        navigate(`/quiz-page/${props.id}/firstPage`)
    }


    return (
        <div className={styles.cardAllQuizes} >
            <div className={styles.containerCardAllQuizes}>
                {/* bgWhiteBox */}

                <div className={styles.titleCardAllQuizes}>
                    <Img src="/Static images/Football-2.png" className={styles.imgIcon} />

                    <p className={styles.cardTitleAllQuizes}>{props.title}</p>
                </div>


                <p className={styles.cardDescriptionAllQuizes}>{props.description}</p>

                <div className={styles.footerCardAllQuizes}>

                    <h3 className={styles.likesH3}>{props.likes} Likes</h3>
                    <h3 className={styles.dislikesH3}>{props.dislikes} Dislikes</h3>
                        <button onClick={onDetailsClick}>Details</button>
                </div>

                <p className={styles.cardDescriptionAllQuizesFooter}>12.11.2022 - <a href="#">{props.author}</a></p>

            </div>
        </div>
    )
}