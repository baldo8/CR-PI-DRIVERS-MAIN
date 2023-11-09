import style from "./Nav.module.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getTeams,searchByName} from "../../Redux/actions"
import SearchBar from "../SearchBar/SearchBar"


const Nav = () => {
    const dispatch = useDispatch()
    const [cards, setCards] = useState([])
    const [searchE, setSearchE] = useState({})
    const handleChange = (event) => {
        event.preventDefault() 
        const values = event.target.value
        setCards(values)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(searchByName(cards))
        .then(() => {
            setSearchE({error:"Drivers found"});
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                setSearchE({error:"No drivers found"});
            } 
          });

    }

    useEffect(() => {
        dispatch(getTeams())

    }, [dispatch])

    return (
        <div className={style.search}>
            <p className={style.pE1}>{searchE.error}</p>
        <div className={style.nav}>
            
         <Link to={"/create"}>
                    <button className={style.btn}>Create a Driver</button>
         </Link>
         <SearchBar handleSubmit={handleSubmit} handleChange={handleChange} />
        </div>
        </div>
    )
}


export default Nav