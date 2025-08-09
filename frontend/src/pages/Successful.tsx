import React from "react";
import { Link } from "react-router-dom";

import styles from "../components/Content.module.scss";

import success from "../assets/images/success.png";

const Successful: React.FC = () => {
  return (
    <div className={styles.content__inner}>
      <div className={styles.empty__inner}>
        <h2>Ваш заказ принят!</h2>
        <p>Ожидайте, мы свяжемся с вами в ближайшее время!</p>
        <img className={styles.success_image} src={success} alt="success" />
        <Link to="/" className={`${styles.button} ${styles.button_black}`}>
          <span>На главную</span>
        </Link>
      </div>
    </div>
  );
};

export default Successful;
