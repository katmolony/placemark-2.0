import { dev } from "$app/environment";
import { fail, redirect } from "@sveltejs/kit";
import { placemarkService } from "$lib/services/placemark-service";
// import Message from "$lib/ui/Message.svelte";
import { supabase } from "$lib/supabaseClient";
import type { Provider } from "@supabase/supabase-js";
import { AuthApiError } from "@supabase/supabase-js";
import { OAuth2Client } from "google-auth-library";
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from "$env/static/private";

export const actions = {
  login: async ({ request, cookies, url }) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    // Validation
    if (!isValidEmail(email)) {
      //   message = "Invalid email format";
      return;
    }
    if (!isValidPassword(password)) {
      //   message = "Password must be at least 6 characters long and contain at least one number and one capital letter";
      return;
    }

    if (email === "" || password === "") {
      throw redirect(307, "/");
    } else {
      console.log(`attemting to log in email: ${email} with password: ${password}`);
      const session = await placemarkService.login(email, password);

      if (session) {
        const userJson = JSON.stringify(session);
        cookies.set("placemark-user", userJson, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: !dev,
          maxAge: 60 * 60 * 24 * 7 // one week
        });
        throw redirect(303, "/dashboard");
      } else {
        throw redirect(307, "/");
      }
    }
  },

  githubLogin: async ({ request, cookies, url }) => {
    const provider = url.searchParams.get("provider") as Provider;

    if (provider) {
      const { data, error: err } = await supabase.auth.signInWithOAuth({
        provider: provider
      });

      if (err) {
        console.log(err);
        return fail(400, {});
      }
      throw redirect(303, data.url);

      if (err) {
        if (err instanceof AuthApiError && err.status === 400) {
          return fail(400, {
            error: "Invalid credentails"
          });
        }
        return fail(500);
      }
    }
    const session = await placemarkService.login(email, password);

    if (session) {
      const userJson = JSON.stringify(session);
      cookies.set("placemark-user", userJson, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: !dev,
        maxAge: 60 * 60 * 24 * 7 // one week
      });
      throw redirect(303, "/dashboard");
    }
  },

  OAuth2: async ({}) => {
    const redirectURL = "http://localhost:5173/oauth";
    // console.log("id", SECRET_CLIENT_ID);

    const oAuth2Client = new OAuth2Client(SECRET_CLIENT_ID, SECRET_CLIENT_SECRET, redirectURL);

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid ",
      prompt: "consent"
    });
  //   console.log( "authorizeUrl", authorizeUrl);

    throw redirect(302, authorizeUrl);
  }
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
  return passwordRegex.test(password);
};