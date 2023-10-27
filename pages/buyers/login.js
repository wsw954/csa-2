// pages/buyers/login.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';

export default function BuyerLogin() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the email exists in the database using axios
    try {
      const response = await axios.get(`/api/users?action=check-email&email=${email}&context=login`);
      ;
  
      if (response.data.error) {
        console.error(response.data.error);
        // Handle error (e.g., show a notification or message to the user)
        return;
      }
  
      // Trigger the email sign-in flow
      const result = await signIn('email', { email, callbackUrl: '/buyers/dashboard.js', redirect: false });
      if (result.error) {
        console.error(result.error);
        // Handle error (e.g., show a notification or message to the user)
        return;
      }
      console.log("SignIn Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.error("Error verifying email:", error);
      // Handle error (e.g., show a notification or message to the user)
    }
  };
  


  return (
    <div>
      <h1>Buyer Login</h1>
      {emailSent ? (
        <p>Check your email for the sign-in link!</p> // Message to display once the email is sent
      ) : (
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
      )}
    </div>
  );
}
