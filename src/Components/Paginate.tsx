import * as React from "react";
import 'bootstrap';

interface Prop {
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    pageSelected: (number: number) => void; 
}

const Paginate = (props : Prop): React.ReactElement => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination pagination pagination-md justify-content-center border-0 pages">
        {pageNumbers.map((number: number) => {
          let classes = "page-item ";
          if (number === props.currentPage) {
            classes += "active";
          }
          return (
            <li className={classes} key={number}>
              <a
                onClick={() => props.pageSelected(number)}
                className="page-link"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginate;