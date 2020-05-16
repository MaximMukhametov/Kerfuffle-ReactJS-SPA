import classes from "../../common/Paginator/Paginator.module.css";
import React from "react";


let Paginator = ({currentPage, onPageChanged, totalUsersCount, pageSize}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            {pages.map(page =>
                <span className={currentPage === page && classes.selectPage}
                      onClick={(e) => onPageChanged(page)}>{page}</span>
            )}

        </div>

    )
};

export default Paginator;


