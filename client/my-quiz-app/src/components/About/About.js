import React from 'react';

import styles from "./About.module.css";



export const About = () => {
    return (
        <div>
            <h1 className={styles.aboutHeading}>About</h1>

            <h2 className={styles.aboutHeading}>
                This website is a SoftUni project created by Valentin Duchev

                It gives the user the chance to Register and Log in, create quiz, solve quiz, Like and Dislike quizes.
                Each quiz that the user solves/likes/dislikes goes in his profile as solved/liked/disliked.
                User can follow other Users, as well as gain followers.

                The website features Newsfeed /similar to the Instagram one/ which shows all quizes created by people which the user follows
                The user can mark a quiz as seen, so it disappears from his newsfeed.
                He also can access his already seen quizes

                The final page of each quiz shows the result /points/ that the user gathered during the quiz
                It has a ranking for all users in the website

                The website gives the user a choice of light or dark mode 
                
                TO DO List
                As the project was built in a short time, it has a few more features to be added:
                -Make it responsive
                -


                As it is a project which is just for gaining more experience in React, its goal is not to be a real working website. 
                That is why it has a free hosting, which does not perform perfectly well.  
                
                
            </h2>
        </div>
    );
}