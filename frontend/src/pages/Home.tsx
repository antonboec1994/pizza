import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { Categories, Sort, PizzaBlock, PizzaBlockSkeleton, Pagination } from "../components";

import { useAppDispatch } from "../redux/store";
import { filtersSelector } from "../redux/filters/selectors";
import { getItemsSelector } from "../redux/getItems/selectors";
import { fetchAllPizzas, fetchPizzas } from "../redux/getItems/slice";
import { categoriesList, setFiltersUrl, sortList } from "../redux/filters/slice";

import styles from "../components/Content.module.scss";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);
  const { activeCategory, sortModalValue, searchValue, currentPage } = useSelector(filtersSelector);
  const { pizzas, status } = useSelector(getItemsSelector);

  const perPage = 8;
  const itemsEmpty = [...new Array(8)];

  const getPizzas = async () => {
    const category: string = activeCategory > 0 ? `category=${activeCategory}` : "";
    const sortBy: string = sortModalValue.sortType.replace("-", "");
    const order: string = sortModalValue.sortType.includes("-") ? "desc" : "asc";
    const search: string = searchValue ? searchValue : "";
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        perPage,
        currentPage,
      })
    );
    dispatch(fetchAllPizzas());
    window.scrollTo(0, 0);
  };
  // Если был первый рендер, тогда проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params: any = qs.parse(window.location.search.substring(1));
      const sortParams = sortList.find((obj) => obj.sortType === params.sortModalValue.sortType);
      dispatch(setFiltersUrl({ ...params, sortParams }));
    }
  }, []);

  // Если был первый рендер, тогда запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
  }, [activeCategory, sortModalValue, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortModalValue,
        activeCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortModalValue, activeCategory, currentPage]);

  const skeleton = itemsEmpty.map((_, index: number) => <PizzaBlockSkeleton key={index} />);
  const pizzasArray = pizzas.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className={styles.content__inner}>
      <div className={styles.content__top}>
        <Categories />
        <Sort />
      </div>
      <h2 className={styles.content__title}>{categoriesList[activeCategory]} пиццы</h2>
      {status === "error" ? (
        <div>
          <h2>Ошибка, не удалось получить пиццы!</h2>
        </div>
      ) : (
        <div className={styles.content__items}>{status === "loading" ? skeleton : pizzasArray}</div>
      )}
      <Pagination perPage={perPage} />
    </div>
  );
};
