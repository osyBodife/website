import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";

const Pagination = (props) => {
  //recall itemsCount=this.state.movie.length>> number of movies in DB or array length
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  //console.log(currentPage);
  // we need to create an array of pages like [1,2 3,4 etc] to be able to use map() method
  // to do that we need the total number of pages=pageCount=length of the array/number of movies per page(pageSize)
  ////to convert float number to integer we use Math.ceil() method
  const pagesCount = Math.ceil(itemsCount / pageSize);
  //if the number of pages is 1, we return null : we do not want 1 to show
  if (pagesCount === 1) return null;

  // we use lodash to generate the array
  // syntax const arrayName=_.range(1, number_of_items +1)

  const pages = _.range(1, pagesCount + 1);
  //we add onClick() to each page, so that when user clicks on the page it show display it contents only

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            id="page-item"
          >
            <Link className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
