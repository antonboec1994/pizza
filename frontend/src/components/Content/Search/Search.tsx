import React from "react";
import debounce from "lodash.debounce";

import { useSelector, useDispatch } from "react-redux";

import styles from "./Search.module.scss";
import { filtersSelector } from "../../../redux/filters/selectors";
import { setSearchValue, setSearchValueLocal } from "../../../redux/filters/slice";

export const Search: React.FC = () => {
  const { searchValueLocal } = useSelector(filtersSelector);
  const dispath = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateInput = React.useCallback(
    debounce((value: string) => {
      dispath(setSearchValue(value));
    }, 1000),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispath(setSearchValueLocal(e.target.value));
    updateInput(e.target.value);
  };

  const onClickClearInput = () => {
    dispath(setSearchValueLocal(""));
    dispath(setSearchValue(""));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div className={styles.box}>
        <input className={styles.input} ref={inputRef} type="text" placeholder="Поиск ..." onChange={(e) => onChangeInput(e)} value={searchValueLocal} />
        {searchValueLocal !== "" ? <span onClick={onClickClearInput}></span> : ""}
      </div>
    </>
  );
};
