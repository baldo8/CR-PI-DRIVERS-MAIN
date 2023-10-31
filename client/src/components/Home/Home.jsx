import style from "./Home.module.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDrivers, getTeams, } from "../../Redux/actions"
import Card from "../Card/Card"
import Nav from "../Nav/Nav"
import Pagination from "../Pagination/Pagination/"
import OrderAndFilter from "../OrderAndFilter/OrderAndFilter"

const Home = () => {

    const drivers = useSelector((state) => state.drivers)
   const dispatch = useDispatch()
    

    // pagination state per page Page and user input
    const [page, setPage] = useState(1)
    const [porPage, setPorPage] = useState(9)
    const [pInput, setpInput] = useState(1)

    const max = Math.ceil(drivers.length / porPage)

    useEffect(() => {
        dispatch(getTeams()) 
        if(!drivers.length) {
            dispatch(getDrivers())

        }

    }, [dispatch]) 


    return (
        <div >
            <div className={style.div}>

                 <Nav /> 
                <OrderAndFilter setPage={setPage} setpInput={setpInput} />
                <Pagination page={page} setPage={setPage} max={max} setpInput={setpInput} pInput={pInput} />


            </div>

            <div className={style.divCard}>

                {drivers 
                    ? drivers.slice((page - 1) * porPage, (page - 1) * porPage + porPage)
                        .map((driver) => {
                            return (
                                <Card
                                    key={driver.id}
                                    id={driver.id}
                                    image={driver.image}
                                    name={driver.name}
                                    teams={driver.teams}
                                    dob={driver.dob}

                                 />)}): <p>{""}</p>
                }
            </div>
            <Pagination page={page} setPage={setPage} max={max} setpInput={setpInput} pInput={pInput} />
 
        </div>
    )
}

export default Home