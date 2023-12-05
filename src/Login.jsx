/*import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <Link to="/coordinator">
        <button>Get Volunteer Details</button>
      </Link>
    </div>
  );
}

export default Login;

*/
import './index.css'
import { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "./supabase";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [option, setOption] = useState('V');
    const handleOptionChange = (e) => {
        // Update the state with the selected option value
        setOption(e.target.value);
      };
  
    const handleSignUp = async () => {
      try {
        console.log(option);
        const { error } = await supabase
  .from('users')
  .insert({ username: username,password: password,phno:phonenumber,usertype:option});
  console.log(error);
      } catch (error) {
        console.error('Error during sign-up:', error.message);
      }
    };
  
    return (
      <div>
        <h2>Sign Up</h2>
        <form>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <label>Phone Number:</label>
          <input type="phone number" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
          <br />
          <label>Select Option:</label>
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="V">Volunteer</option>
          <option value="C">Coordinator</option>
        </select>
        <br />
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    );
  };
  
  
export default Login;