import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Bizzle</h1>
        <p className={styles.description}>
          New Buyer Form
        </p>
        <p className={styles.description}></p>
        <div></div>
      </main>
    </div>
  );
}