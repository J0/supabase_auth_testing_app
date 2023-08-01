import { supabase } from "@/components/init";
import { createClient } from "@supabase/supabase-js";

export default function GenerateLink() {

  return (
    <>
      <div> Generate link page </div>
      <button onClick={()=>console.log("test")}>Generate Sign Up Link</button>
    </>
  );
}
