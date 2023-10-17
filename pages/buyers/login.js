// pages/buyers/login.js

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLinkSent, setLinkSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSendLink = async () => {
    try {
      // Check if email exists in the database
      const response = await axios.get(`/api/check-email?email=${email}`);
      if (response.data.exists) {
        await signIn('email', { email });
        setLinkSent(true);
      } else {
        setEmailError('This email is not registered. Please sign up.');
        // Optionally, redirect the user to the registration page after a few seconds
        setTimeout(() => {
          window.location.href = '/pages/buyers/new.js';
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle other errors (e.g., show a general error message to the user)
    }
  };

  return (
    <div>
      {!isLinkSent ? (
        <>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
          />
          <button onClick={handleSendLink}>Send Link</button>
          {emailError && <p>{emailError}</p>}
        </>
      ) : (
        <p>Please check your email and click on the magic link to continue.</p>
      )}
    </div>
  );
}

export default LoginPage;
