import styles from "./Error404Page.module.sass";

const Error404Page = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span>[404]</span>
      </div>
    </div>
  );
}

export default Error404Page;
