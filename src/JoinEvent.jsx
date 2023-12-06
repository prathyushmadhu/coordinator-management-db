
import { useUser } from "./UserContext";
import { useSupabase } from "./SupabaseContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function JoinEvent(){
    const{eventId} = useParams();
    const {supabase} = useSupabase();
    const {userId} = useUser();
    const navigate = useNavigate();


      const joinasvolunteer = async () =>{
        console.log(userId);
        const tempdata = await supabase.from('volunteers').select().eq('uid',userId);
        console.log(tempdata.data[0].vid);
        const { data, error } = await supabase.from("volunteershifts").insert({vid:tempdata.data[0].vid,eid:eventId}).select();
        console.log(data);
        navigate("/volunteer/events");
        
      }
      function goback()
{
    navigate("/volunteer/events");
}      return (
        <div>
        <div>
            <button type="button" onClick={joinasvolunteer} >
                Confirm to Join as a Volunteer for the event
            </button>
        </div>
        <div>
        <button type="button" onClick={goback} >
            Go Back
        </button>
    </div>
    </div>
      );
        
      

}
export default JoinEvent;