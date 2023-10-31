import style from "./Detail.module.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { searchById } from "../../Redux/actions"

const Detail = () => {
    const dispatch = useDispatch()
    const detail = useSelector((state) => state.detail)
    const { id } = useParams()

    useEffect(() => {
       
        dispatch(searchById(id))
        
    }, [])
    return (
        <div >
            {detail ?(
            
                    <div className={style.divcontainer}>

                        <div className={style.divcontainerImage}>
                            {typeof detail.id === "number"
                            ?(<img className={style.image} src={detail.image.url } alt={detail.name} /> )
                            : (<img className={style.image} src={detail.image} alt={detail.name} />)}
                        </div>
                        
                        <div className={style.divcontainerInfo}>

                            <h1 className={style.name}>{detail.name}</h1>
                            <h1 className={style.info}>ID:{detail.id}</h1>
                            <h2 className={style.info}>DOB: {detail.dob}</h2>
                            <h2 className={style.info}>Nationality: {detail.nationality}</h2>
                            <h2 className={style.description}>{detail.description}</h2>
                            {typeof id !== "number" ? (
                            <h3 className={style.info}>{detail.teams?.join(" ")}</h3>)
                            : ("")}      
                            
                     </div>
                    </div>
                    )
                : null}
        </div>
    )

}

export default Detail