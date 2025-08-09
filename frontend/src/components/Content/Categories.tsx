import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory, categoriesList, setCurrentPage } from "../../redux/filters/slice";
import { filtersSelector } from "../../redux/filters/selectors";

import styles from "./Categories.module.scss";

export const Categories: React.FC = React.memo(() => {
  const { activeCategory } = useSelector(filtersSelector);
  const dispatch = useDispatch();

  const onClickCategory = (index: number) => {
    dispatch(setActiveCategory(index));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.categories}>
      <ul>
        {categoriesList.map((name, index) => (
          <li onClick={() => onClickCategory(index)} className={activeCategory === index ? styles.active : ""} key={index}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});
