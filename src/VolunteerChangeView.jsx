// Signin.js
import React, { useState } from 'react';
import { useUser } from './UserContext';
import { useSupabase } from './SupabaseContext';
import { useNavigate, useParams } from 'react-router-dom';


function VolunteerChangeView(){
    const navigate = useNavigate();
    const {userId} = useUser();
    const {supabase}=useSupabase();
    const { eventId } = useParams();

    async function deleteVol() {

        const data = await supabase
            .from('volunteers')
            .select()
            .eq('uid', userId);
        console.log(data.data[0].vid);
        const newdata = await supabase
            .from('volunteershifts')
            .select()
            .eq('eid', eventId).eq('vid',data.data[0].vid);
            console.log(newdata);
            await supabase
            .from('volunteershifts')
            .delete()
            .eq('vsid',newdata.data[0].vsid );
        
            navigate('/volunteer/events');
    
    
      }
      async function goback() {
        
            navigate('/volunteer/events');
    
            
    
      }
    return(
  <div>
    <div>
        <button type="button" onClick={deleteVol}>
                Withdraw Volunteering for the chosen event?
              </button>
        </div>
        <div>
        <button type="button" onClick={goback}>
                Go Back
              </button>
        
        </div>
  </div>

    

    );
}
export default VolunteerChangeView;