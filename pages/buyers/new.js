import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css";

import { useState } from 'react';
import axios from 'axios';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function NewBuyer() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    creditScore: '',
  });
  const [message, setMessage] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username already exists
    try {
      await axios.get(`/api/users?action=check-username&username=${formData.username}`);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setMessage(error.response.data.error);
        return;
      }
    }

    // Check if email already exists
    try {
      await axios.get(`/api/users?action=check-email&email=${formData.email}&context=register`);
      ;
    } catch (error) {
      if (error.response && error.response.data.error) {
        console.log("Line 45 in /buyers/new.js")
        setMessage(error.response.data.error);
        return;
      }
    }

    // If both username and email don't exist, proceed with form submission (e.g., save to database)
    // TODO: Implement the API call to save the new Buyer's details
    const response = await axios.post("/api/buyers", formData);
    if (response.status !== 201) {
      throw new Error(`MongoDB: ${response.data.error}`);
    }

       // Auto-login the user after successful registration
       const loginResult = await signIn('email', { email: formData.email, redirect: false });
       if (loginResult.error) {
           console.error(loginResult.error);
           // Handle error (e.g., show a notification or message to the user)
           return;
       }
   
       setRegistrationStatus('Please check your email and click on the magic link to complete the registration.');
  };

  return (
    <div>
      <h2>Register New Buyer</h2>
      <form onSubmit={handleSubmit}>
        {/* Render input fields for each attribute */}
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
{registrationStatus && <p>{registrationStatus}</p>}
    </div>
  );
}
