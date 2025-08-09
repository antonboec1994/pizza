import { Link } from "react-router-dom";

import styles from "../components/Content.module.scss";

import ErrorImage from "../assets/images/404.png";

const NotFound: React.FC = () => {
  return (
    <div className={styles.content__inner}>
      <div className={styles.empty__inner}>
        <h2>Страница не найдена 😕</h2>
        <img className={styles.errorImage} src={ErrorImage} alt="Empty cart" />
        <Link to="/" className={`${styles.button} ${styles.button_black}`}>
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
