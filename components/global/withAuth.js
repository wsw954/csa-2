import React, {useEffect } from "react";
import { useSession } from 'next-auth/react';
import {useRouter } from 'next/router';


const withAuth = (WrappedComponent) => {
  return function WithAuthComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;
      if (status === "unauthenticated") {
        router.push('/buyers/login');
        return;
      }
    }, [status, session]);

    return <WrappedComponent {...props} />;
  }
}

export default withAuth;
