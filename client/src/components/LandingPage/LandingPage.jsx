import style from "./LandingPage.module.css"

import { Link } from "react-router-dom"

const LandingPage = () => {
    return (

        
    <div className={style.container}>
        <h1 className={style.wel}>Welcome Driver Fans</h1>
           
        <Link to={"/home"}>
        <button className={style.button}>Login find your driver</button>
        </Link>


    </div>
    )
}

export default LandingPage
