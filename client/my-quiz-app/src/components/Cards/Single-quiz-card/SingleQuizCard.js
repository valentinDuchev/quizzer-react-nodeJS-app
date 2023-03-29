import { Img } from "react-image"

import styles from "./SingleQuizCard.module.css"

export const SingleQuizCard = () => {
    return (
        <div className={styles.cardAllQuizes} >
            <div className={styles.containerCardAllQuizes}>
                {/* bgWhiteBox */}

                <div className={styles.titleCardAllQuizes}>
                    <Img src="/Static images/Football-2.png" className={styles.imgIcon}/>

                    <p className={styles.cardTitleAllQuizes}>Sport quiz for you to solve</p>
                </div>


                <p className={styles.cardDescriptionAllQuizes}>Deposit a variety of assets on Hubble, raise your collateral</p>

                <div className={styles.footerCardAllQuizes}>

                    <h3 className={styles.likesH3}>33 Likes</h3>
                    <h3 className={styles.dislikesH3}>2 Dislikes</h3>
                    <button >Details</button>
                </div>

                <p className={styles.cardDescriptionAllQuizesFooter}>12.11.2022 - <a href="#">peter_01</a></p>

            </div>
        </div>
    )
}