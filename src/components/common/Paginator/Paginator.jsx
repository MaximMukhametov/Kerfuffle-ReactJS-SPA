import classes from "../../common/Paginator/Paginator.module.css";
import React, {useEffect, useState} from "react";


let Paginator = ({currentPage, onPageChanged, totalUsersCount, pageSize, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(Math.ceil((currentPage) / portionSize));
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    let changePortion = (page) => {
        onPageChanged((page - 1) * portionSize + 1);
        setPortionNumber(page);
    };

    useEffect(() => {
        setPortionNumber(Math.ceil((currentPage) / portionSize))
    }, [totalUsersCount]);


    return (<div className={classes.paginator}>
            {portionNumber > 1 &&
            <button className={classes.paginator_prev} onClick={() => {
                changePortion(portionNumber - 1)
            }}></button>}
            <div
                className={classes.pages}>{pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(page =>
                    <span key={page}
                          className={currentPage === page ? classes.select_page : classes.other_page}
                          onClick={(e) => onPageChanged(page)}>{page} </span>
                )}</div>

            {portionCount > portionNumber &&
            <button className={classes.paginator_next} onClick={() => {
                changePortion(portionNumber + 1)
            }}></button>}
        </div>
    )
};

export default Paginator;


