import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css";

import dbConnect from "../utils/db"; //Test code for db connection
import { useEffect } from "react";  //Test code for db connection

export default function Home() {

//   useEffect(() => {
//     async function testDbConnection() {
//         await dbConnect();
//     }
//     testDbConnection();
// }, []);




  return (
    <div>
      <div>
        <NavBar />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Bizzle</h1>
        <p className={styles.description}>
          CSA-2 Index Page
        </p>
        <p className={styles.description}>
         
        </p>
        <p className={styles.description}></p>
        <div></div>
      </main>
    </div>
  );
}