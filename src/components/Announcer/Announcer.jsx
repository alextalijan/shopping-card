import styles from './Announcer.module.css';

function Announcer({ title, text, type }) {
  return (
    <div className={`${styles.announcer} ${styles[type]}`}>
      <span className={styles.title}>{title}</span>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default Announcer;
