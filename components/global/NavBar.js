import React, { useState, useEffect } from "react";
import Link from "next/link";
import SimpleDropdown from "../utils/SimpleDropdown";
import styles from "@/styles/Home.module.css";
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const NavBar = () => {
 const { data: session } = useSession();
 const [username, setUsername] = useState(null);
 const router = useRouter();

  useEffect(() => {
    if (!session || !session.user.email)  return; // Exit early if there's no session

    async function fetchUsername() {
      try {
        const response = await axios.get(`/api/users?action=get-username&email=${session.user.email}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    }
    fetchUsername();
  }, [session]);


  const handleAuthClick = () => {
    if (session) {
      signOut();
    } else {
      router.push('/buyers/login');
    }
  };


  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navbarItem}>
          <SimpleDropdown title="Buyers">
            <Link href="/buyers/login">Log In</Link>
            <Link href="/buyers/new">Create Buyer Account</Link>
          </SimpleDropdown>
        </li>
        <li className={styles.navbarItem}>
          <SimpleDropdown title="Dealers">
            <Link href="/dealers/login">Log In</Link>
            <Link href="/dealers/new">Create Dealer Account</Link>
          </SimpleDropdown>
        </li>
        {session && (
                    <li className={styles.navbarItem}>
                        {username}
                    </li>
                )}
         <li className={styles.navbarItem} onClick={handleAuthClick}>
          {session ? "Sign Out" : "Sign In"}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;