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
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { SupabaseProvider, useSupabase } from './SupabaseContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const { supabase } = useSupabase();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [organisationmission, setOrganisationMission] = useState('');
    
    const [digit, setDigit] = useState('');


    const [option, setOption] = useState('V');
    const handleOptionChange = (e) => {
        // Update the state with the selected option value
        setOption(e.target.value);
      };
    const newvaluecreation = async () =>{
      if (option.toLowerCase() ==='v'){
          await supabase.from('volunteers').insert({ uid:400, name:username, phno:phonenumber });
          
        
      }
      else{
        await supabase.from("organisations").insert({uid:405, name:organisation,contact:phonenumber,mission:organisationmission});
        
      }
    }
  
    const handleSignUp = async () => {
      try {
        console.log(option);
        const newdata = await supabase.from('users').insert({ username: username,password: password,phno:phonenumber,usertype:option}).select();
        setDigit(newdata.data[0].uid.value);
        console.log(digit);
        //await newvaluecreation();
        if (option.toLowerCase() ==='v'){
          await supabase.from('volunteers').insert({ uid:digit, name:username, phno:phonenumber });
          
        
      }
      else{
        await supabase.from("organisations").insert({uid:digit, name:organisation,contact:phonenumber,mission:organisationmission});
        
      }
        
        
        navigate('/signin');

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
        {option === 'C' && (
          <div>
            <label>
          Organization:
          <input
            type="text"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
          />
        </label>
        <label>
          Organization Mission : 
          <input
            type="text"
            value={organisationmission}
            onChange={(e) => setOrganisationMission(e.target.value)}
          />
        </label>
        </div>
        
      )}
        <br />
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    );
  };
  
  
export default Login;