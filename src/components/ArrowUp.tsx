import styles from "./arrow-up.module.css";

export const ArrowUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.style}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  );
};
