import { supabase } from "$lib/supabaseClient";

export const load = async ({ cookies }) => {
  cookies.delete("placemark-user", { path: "/" });
  // signOut();
};

// async function signOut() {
//   const { error } = await supabase.auth.signOut()
//   console.log(error);
// }