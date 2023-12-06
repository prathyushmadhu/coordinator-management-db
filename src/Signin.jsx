// Signin.js
import React, { useState } from 'react';
import { useUser } from './UserContext';
import { useSupabase } from './SupabaseContext';
import { useNavigate } from 'react-router-dom';

function Signin(){
  const { setUserId } = useUser();
  const navigate = useNavigate();
  const {supabase} = useSupabase();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const customLoginFunction = async (username,password) => {
    try {   
  // Make a query to the 'customer' table to check if the provided credentials are valid
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('username',username).eq('password',password);
    console.log('data query done',data);
  if (error) {
    console.log('query error');
  }

  // If data is available, return the user object
  if (data) {
    return {
      uid: data[0].uid,
      usertype: data[0].usertype
    };
  }
}
  catch (error) {
    console.error('Error during login:', error);
  }


}
  // Your custom login logic
  const handleLogin = async () => {
    try {
      // Assuming you have some custom login logic
      const data = await customLoginFunction(username,password);
      // Assuming your user data has an 'id' property
      const userId = data.uid;

      // Set the user ID using the context function
      setUserId(userId);
        /*console.log(userId);
      const { newdata} = await supabase
      .from("users")
      .select("usertype")
      .eq("uid",userId);*/
    console.log(data);
    if (data.usertype.toLowerCase() === "v") {
        // Code to execute if userType is "v" (volunteer)
        console.log("User is a volunteer");
        navigate('/volunteer/events');
      }
      else{
        navigate('/getevents');
      }
      
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
        <h2>VOLUNTEER MANAGEMENT SYSTEM</h2>
      <form>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="button" onClick={handleLogin}>
            Sign In
          </button>
        </form>
    </div>
  );
};

export default Signin;
