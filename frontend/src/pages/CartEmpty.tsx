import React from "react";
import { Link } from "react-router-dom";

import styles from "../components/Content.module.scss";

import EmptyCart from "../assets/images/empty-cart.png";

export const CartEmpty: React.FC = () => {
  return (
    <div className={styles.content__inner}>
      <div className={styles.empty__inner}>
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={EmptyCart} alt="Empty cart" />
        <Link to="/" className={`${styles.button} ${styles.button_black}`}>
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
