import style from "./OrderAndFilter.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { filterByOrigin, filterByTeams, getTeams, orderAlfhabetically, orderDateOfBirth } from "../../Redux/actions"


const OrderAndFilter = ({setPage, setpInput}) => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => state.teams)

   const abcOrder = (event) => {
        dispatch(orderAlfhabetically(event.target.value))
        setPage(1)
        setpInput(1)

    }
    const dobOrder = (event) => {
        dispatch(orderDateOfBirth(event.target.value))
        setPage(1)
        setpInput(1)
    }
    const teamFilter = (event) => {
        dispatch(filterByTeams(event.target.value))
        setPage(1)
        setpInput(1)
    }
    
    const handleOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value))
        setPage(1)
        setpInput(1)
    }
  
    return (
        <div className={style.selectorContainer}>
        <select className={style.selector} onChange={abcOrder}>
        <option disabled selected>Order Alphabetically</option>
        <option value="Ascending">Ascending_Order</option>
        <option value="Descending">Descending_Order</option>
        </select>
        
        <select  className={style.selector} onChange={dobOrder}>
        <option disabled selected>Order_by_DOB</option>
        <option value="AscendenteDOB">Ascendent_DOB</option>
        <option value="DescendenteDOB">Descendent_DOB</option>
        </select>
        <select className={style.selector} onChange={teamFilter} >
        <option disabled value="">Filter_by_Teams</option>
            {(teams?.uniqueTeams || []).map((team) => (
                    <option value={team} key={team}>
                      {team}
                    </option>
            ))}
       </select>
            <select className={style.selector}onChange={handleOrigin}>
            <option disabled selected>Filter_by_Origin</option>
            <option value="AllDrivers">By_All_Drivers</option>
            <option value="createdDrivers">DB_Created_Drivers</option>
            <option value="driverList">Api_Driver_List</option>
        </select> 
      </div>
    )
}
export default OrderAndFilter