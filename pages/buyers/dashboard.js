import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css";
import withAuth from "components/global/withAuth";

function Dashboard() {

 


  return     (
    <div>
      <div>
        <NavBar />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Bizzle</h1>
        <p className={styles.description}>
          Buyers Dashboard
        </p>
        <p className={styles.description}>
         
        </p>
        <p className={styles.description}></p>
        <div></div>
      </main>
    </div>
  )
}


export default withAuth(Dashboard)