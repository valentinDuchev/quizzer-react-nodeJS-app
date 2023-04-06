import styles from "./Register.module.css"

export const Register = () => {


    return (

        <div className={styles.divRegister}>
            <div className={styles.container}>
                <div className={styles.window}>
                    <div className={styles.overlay}></div>
                    <div className={styles.content}>
                        <div className={styles.welcome}>Hello There!</div>
                        <div className={styles.inputFields}>


                            <input type='text' placeholder='First Name' className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}></input>

                            <input type='text' placeholder='Last Name' className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}></input>

                            <input type='email' placeholder='Email' className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`} style={{ color: 'rgba(255, 255, 255, 0.65)' }}></input>
                            <input type='password' placeholder='Password' className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}></input>
                            <input type='password' placeholder='Repeat password' className={`${styles.inputLine} ${styles.fullWidth} ${styles.inputPlaceholder}`}></input>


                        </div>
                        <div className={styles.buttonDiv}><button className={`${styles.ghostRound} ${styles.fullWidth}`}>Create Account</button></div>
                        <div className={styles.subtitle}>Already have an account: Sign in here</div>

                    </div>
                </div>
            </div>
        </div>


    )
}