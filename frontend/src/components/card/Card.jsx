import style from "./Card.module.scss";

export const Card = ({ children }) => {
  return <div className={style.cardStyle}>{children}</div>;
};
