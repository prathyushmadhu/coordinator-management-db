import { useSupabase } from '../SupabaseContext';

function GetUserId() {
    const { supabase } = useSupabase();
  const userid = useState( );

  useEffect(() => {
    getuserid();
  }, []);

  async function getuserid() {
    const { data } = await supabase.from("volunteers").select(uid);
    setvolunteers(data);
  }

  return (
userid
  );
}