import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";
import { dev } from "$app/environment";
import { placemarkService } from "$lib/services/placemark-service";


import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from "$env/static/private";

async function getUserData(access_token) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  console.log("response", response);
  const data = await response.json();
  console.log("data", data);

  return data;
}

export const GET = async ({ url, cookies }) => {
  const redirectURL = "http://localhost:5173/oauth";
  const code = await url.searchParams.get("code");

  //console.log('returned state',state)
  console.log("returned code", code);

  try {
    const oAuth2Client = new OAuth2Client(SECRET_CLIENT_ID, SECRET_CLIENT_SECRET, redirectURL);
    const r = await oAuth2Client.getToken(code);
    // Make sure to set the credentials on the OAuth2 client.
    oAuth2Client.setCredentials(r.tokens);
    console.info("Tokens acquired.");

    const user = oAuth2Client.credentials;
    console.log("credentials this is for user", user);

    const data = await getUserData(user.access_token);
    console.log("this is the data: ", data);

    //    if (user && data) {
    const token = user.access_token;
    const id = user.id_token;
    const name = data.name;

    const googleUser = {
      // _id: "",
      firstName: data.given_name,
      lastName: data.family_name,
      email: data.email,
      password: data.sub,
      userType: "user"
    };
    let createGoogleUser = await placemarkService.signup(googleUser);
    console.log("Google user made :", createGoogleUser);

    const session = await placemarkService.login(data.email, data.sub);

    if (session) {
      const userJson = JSON.stringify(session);
      // After setting the cookie
      const cookieOptions = {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: !dev,
        maxAge: 60 * 60 * 24 * 7 // one week
      };

      await cookies.set("placemark-user", userJson, cookieOptions);
      console.log("Cookie set successfully");

      // Immediately after setting, try to retrieve the cookie
      const cookieValue = cookies.get("placemark-user");
      console.log("Retrieved cookie value:", cookieValue);

      //currentSession.set(session);

      // Introduce a delay before redirecting
   //   await new Promise((resolve) => setTimeout(resolve, 10000)); // Adjust the delay as needed

      throw redirect(303, "/dashboard");
    } else {
      throw redirect(307, "/");
    }
  } catch (err) {
    console.log("Error logging in with OAuth2 user", err);
  }

  throw redirect(303, "/");
};

