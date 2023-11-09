import React from "react";
import style from "../PaginateNumbers/PaginateNumbers.module.css"
const PaginateNumbers = ({porPage,totalDrivers,paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalDrivers / porPage); i++){
        pageNumbers.push(i);
    }
    return(
        <div className="container">
        
            <ul className={style.paginateUl}>
            {pageNumbers.map(number => (
                <li key={number} className={style.paginateLi}>
                    <button onClick={() => paginate(number)} className={style.paginateBtn}>{number}</button>
                </li>
            ))}
            </ul>
         
         </div>
    )
}

export default PaginateNumbers