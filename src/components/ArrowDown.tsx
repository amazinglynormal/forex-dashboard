import styles from "./arrow-down.module.css";

export const ArrowDown = () => {
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
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );
};
