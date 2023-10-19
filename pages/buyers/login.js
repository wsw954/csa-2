// pages/buyers/login.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function BuyerLogin() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Trigger the email sign-in flow
    const result = await signIn('email', { email, redirect: false });
    if (result.error) {
      // Handle error (e.g., show a notification or message to the user)
      console.error(result.error);
    }
    console.log("SignIn Email Sent")
  };

  return (
    <div>
      <h1>Buyer Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Send Sign-In Email</button>
        </div>
      </form>
    </div>
  );
}
