
import { useDispatch } from "react-redux"
import { deleteDriver } from "../../Redux/actions"
import style from "./Card.module.css"
import { Link } from "react-router-dom"

const Card = ({ id, image, name, teams,  }) => {
const dispatch = useDispatch()
    let index = 0
    
    const onClose = (id) => {
        
        console.log(id);
        dispatch(deleteDriver(id))
    }
    return (
        <div className={style.card}>
            {/*//if the id is not a number it is created in database and can be deleted */}
            {typeof id !== "number" ?(<button onClick={()=>onClose(id)} >Delete</button>) : ("")}
                
                <h1 className={style.name}>{name}</h1>
                <Link to={`/detail/${id}`}>
                    {typeof id !== "number"
                    ? <img className={style.image} src={image} alt={name} />
                    :  <img className={style.image} src={image.url} alt={image.imageby}/>
                    }
                  
                </Link>
                <h4 className={style.teams}>Teams: {teams?.map((e) => {
                    index = index + 1
                    if (index === teams.length) {return e} else {return e + "/ "}})}
                </h4>
        </div>
    )
}

export default Card