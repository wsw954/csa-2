import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please sign in to view this page.</div>;
  }

  // Rest of your dashboard code
  return <div>Welcome to Buyers Dashboard.</div>
}
