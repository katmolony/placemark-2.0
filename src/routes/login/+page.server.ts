import { dev } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { placemarkService } from "$lib/services/placemark-service";
// import Message from "$lib/ui/Message.svelte";

export const actions = {
  login: async ({ request, cookies }) => {
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
  }
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
  return passwordRegex.test(password);
}
