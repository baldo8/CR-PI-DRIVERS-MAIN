
import style from "./Form.module.css"
import { useDispatch, useSelector } from "react-redux"
import { createNewDriver, getTeams } from "../../Redux/actions"
import { useEffect, useState } from "react"
import { Link, } from "react-router-dom"
import validate from "./validate"


const DriverForm = () => {

    const dispatch = useDispatch()
    const teams = useSelector((state) => state.teams)
    
    const initialValues = {
        name: "",
        surname: "",
        nationality: "",
        image: "",
        dob: "",
        teams: [],
        description: ""
    }
    const [inputData, setInputData] = useState(initialValues)
    const [error, setError] = useState({})
    const [createdDriver, setCreatedDriver] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const handleChange = (event) => {
        if (event.target.name === "teams") {
            if (!inputData.teams.includes(event.target.value)) {
                setInputData({ ...inputData, teams: [...inputData.teams, event.target.value] });  
            }else {
                setInputData({ ...inputData, teams: inputData.teams.filter((e) => e !== event.target.value) });  
            }
        } else {
            setInputData({ ...inputData, [event.target.name]: event.target.value }); 
        }    
    };
        const handleSubmit = (event) => {
        event.preventDefault()
        setError(validate(inputData))
        console.log(error)
        setIsSubmit(true)
    }
    useEffect(() => {
        console.log(error)
        if (Object.keys(error).length === 0 && isSubmit) {
            dispatch(createNewDriver(inputData))
            setCreatedDriver({driverCreated:"Driver has been Created"})
        }
    }, [error])
        useEffect(() => {
        dispatch(getTeams())
        }, [])
        return (
        <div className={style.divContainer}>
           {/*  <pre>{JSON.stringify(inputData, null, 2)}</pre> */}
            <form className={style.form}
                  onSubmit={handleSubmit} >
                <div className={style.divContainerInfo}>
                    <p className={style.p}>Create a Driver Easy</p>
                    <label className={style.label}>Name:</label>
                    <input className={style.inputField}
                     name="name"
                     onChange={handleChange}
                     value={inputData.name}
                     />
                     <p className={style.pE}>{error.name}</p>
                    <br />
                    <label className={style.label}>SurName:</label>
                    <input className={style.inputField}
                     name="surname"
                     onChange={handleChange}
                     value={inputData.surname}
                     />
                    <p className={style.pE}>{error.surname}</p>
                    <br />
                    <label className={style.label}>Nationality:</label>
                    <input className={style.inputField}
                     name="nationality"
                     onChange={handleChange}
                     value = {inputData.nationality}
                    />
                    <p className={style.pE}>{error.nationality}</p>
                    <br />
                    <label className={style.label}>Image Link:</label>
                    <input className={style.inputField}
                     name="image"
                     onChange={handleChange}
                     value = {inputData.image}
                    />
                    <p className={style.pE}>{error.image}</p>
                    <br />
                    <label className={style.label}>Fecha DOB:</label>
                    <input className={style.date}
                     type="date" name="dob"
                     onChange={handleChange}
                     value={inputData.dob} 
                     />
                    <p className={style.pE}>{error.dob}</p>
                    <br />
                    <label className={style.label}>Description: </label>
                    <textarea className={style.textarea}
                     name="description"
                     onChange={handleChange}
                     value={inputData.description}>
                     </textarea>
                    <p className={style.pE}>{error.description}</p>
                    <br />
                    <label className={style.label}>Teams:</label>
                    <select multiple className={style.select}
                     name="teams"
                     onChange={handleChange}>
                    <option disabled defaultValue="">Pick a team</option>
                    {(teams?.uniqueTeams || []).map((team) => {return (<option value={team} key={team}>{team}
                    </option>);})}
                    </select>
                    <br />
                    <p className={style.pE}>{error.teams}</p>
                    <button className={style.button} type="submit"  >Create</button> 
                    <p className={style.pE}>{createdDriver.driverCreated}</p>
                    <Link className={style.buttonhome}  to="/home">
                    <button>Home</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
export default DriverForm