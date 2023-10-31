import style from "./Pagination.module.css"


const Pagination = ({page, setPage, max, setpInput, pInput}) => {

    // const [input, setpInput] = useState(1)

    const nextPage = ()=> {
        setpInput(parseInt(pInput)+1)
        setPage(parseInt(page) +1)
    }
    const previousPage = ()=> {
        setpInput(parseInt(pInput)-1)
        setPage(parseInt(page) -1)
    }

    return (
       <div className={style.pageDiv}>
        <button className={style.previousPage}disabled={page === 1 || page <1 } onClick={previousPage}>◀</button>

        
        <button className={style.nextPage} disabled={page === Math.ceil(max) || page >  Math.ceil(max) } onClick={nextPage}>▶</button>
       </div>
    )
}

export default Pagination