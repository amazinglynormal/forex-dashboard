import styles from "./header.module.css";

interface Props {
  headingSize: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headingText: String;
}

export const Header = ({ headingSize, headingText }: Props) => {
  const headings = {
    h1: <h1 className={styles.headingText}>{headingText}</h1>,
    h2: <h2 className={styles.headingText}>{headingText}</h2>,
    h3: <h3 className={styles.headingText}>{headingText}</h3>,
    h4: <h4 className={styles.headingText}>{headingText}</h4>,
    h5: <h5 className={styles.headingText}>{headingText}</h5>,
    h6: <h6 className={styles.headingText}>{headingText}</h6>,
  };

  return (
    <header
      className={headingSize === "h1" ? styles.header : styles.widgetHeader}
    >
      {headings[headingSize]}
    </header>
  );
};
