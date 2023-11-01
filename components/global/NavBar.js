import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

const NavBar = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState(null);
  const router = useRouter();


  useEffect(() => {
    if (session && session.user.email) {
      async function fetchUsername() {
        try {
          const response = await axios.get(`/api/users?action=get-username&email=${session.user.email}`);
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
      fetchUsername();
    }
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
        {/* ... other navbar items */}
        {session && username && (
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
