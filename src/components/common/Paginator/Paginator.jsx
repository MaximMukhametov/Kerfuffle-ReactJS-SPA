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


    return (<div>
            {portionNumber > 1 &&
            <button onClick={() => {
                changePortion(portionNumber - 1)
            }}>Prev</button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(page =>
                    <span key={page}
                          className={currentPage === page? classes.selectPage: classes.otherPage}
                          onClick={(e) => onPageChanged(page)}>{page} </span>
                )}

            {portionCount > portionNumber &&
            <button onClick={() => {
                changePortion(portionNumber + 1)
            }}>Next</button>}
        </div>
    )
};

export default Paginator;


