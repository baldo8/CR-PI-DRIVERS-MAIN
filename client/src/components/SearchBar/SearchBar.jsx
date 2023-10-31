import style from "./SearchBar.module.css"


const SearchBar = ({handleChange, handleSubmit}) => {

    return (
    <div className={style.searchContainer}>
        <input className={style.input}name="search" onChange={handleChange}></input>
        <button className={style.btn} onClick={handleSubmit}>Search</button>
    </div>
        )
}

export default SearchBar