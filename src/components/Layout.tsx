import styles from "./layout.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  return <div className={styles.layout}>{children}</div>;
};
