
import styles from './StartPage.module.css';

import imgSrc from '../Home/logo.png'
import { Img } from 'react-image';


export const StartPage = () => {


    return (
        <div className={styles.homeDiv} >

            <Img style={{height: '500px', marginLeft: '40px', marginTop: '40px'}} src={imgSrc}/>

            <div></div>
        </div>
    )

}

