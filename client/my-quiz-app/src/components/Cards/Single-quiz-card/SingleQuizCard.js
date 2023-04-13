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
                    <button onClick={onDetailsClick}>Details</button>
                </div>


                <p className={styles.cardDescriptionAllQuizesFooter}>12.11.2022 - <Link to={`/profile/${props.email}`}>{props.email}</Link></p>

                <div className={styles.footerCardAllQuizes}>
                    <span style={{ color: 'white' }}>
                        Rating({props.ratedNumber}): <br />

                        {props.rating < 1.5 ? <span>⭐★★★★</span> : ''}
                        {props.rating < 2.5 && props.rating > 1.49 ? <span>⭐⭐★★★</span> : ''}
                        {props.rating < 3.5 && props.rating > 2.49 ? <span>⭐⭐⭐★★</span> : ''}
                        {props.rating < 4.5 && props.rating > 3.49 ? <span>⭐⭐⭐⭐★</span> : ''}
                        {props.rating < 6 && props.rating > 4.5 ? <span>⭐⭐⭐⭐⭐</span> : ''}
                        <br />
                        {props.rating}/5
                    </span>

                </div>

            </div>
        </div >
    )
}