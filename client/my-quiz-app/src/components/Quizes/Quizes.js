import { Link } from "react-router-dom"
import { SingleQuizCard } from "../Cards/Single-quiz-card/SingleQuizCard"
import SortDropdown from "../Dropdowns/SortDropdown/SortDropdown"

import styles from "./Quizes.Module.css"


export const Quizes = () => {

    return (
        <>

            <div className={styles.allQuizesPage}>
                <SortDropdown className={styles.sortDropdown} />

                <div className={styles.allQuizesMainPage}>
                    <div className={styles.containerAllQuizCards}>
                        <div className={styles.gradientCards}>
                            <SingleQuizCard />
                            <SingleQuizCard />
                            <SingleQuizCard />
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/cska">CSKA</Link>
        </>
    )
}