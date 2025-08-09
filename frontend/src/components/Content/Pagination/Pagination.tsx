import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import { getItemsSelector } from "../../../redux/getItems/selectors";
import { filtersSelector } from "../../../redux/filters/selectors";
import { setCurrentPage } from "../../../redux/filters/slice";

import styles from "./Pagination.module.scss";

type PaginationProps = { perPage: number };

export const Pagination: React.FC<PaginationProps> = ({ perPage }) => {
  const { currentPage } = useSelector(filtersSelector);
  const { itemsCount } = useSelector(getItemsSelector);
  const dispatch = useDispatch();

  const pages = Math.ceil(itemsCount / perPage);

  return <>{pages > 1 ? <ReactPaginate forcePage={currentPage - 1} className={styles.pagination} breakLabel="..." nextLabel=">" onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))} pageRangeDisplayed={3} pageCount={pages} previousLabel="<" /> : ""}</>;
};
