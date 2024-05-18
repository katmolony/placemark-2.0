import { dev } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { placemarkService } from "$lib/services/placemark-service";
// import Message from "$lib/ui/Message.svelte";

export const actions = {
  signup: async ({ request, cookies }) => {
    const form = await request.formData();
    const firstName = form.get("firstName") as string;
    const lastName = form.get("lastName") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    // Validation
    if (!isValidName(firstName) || !isValidName(lastName)) {
        // message = "First name and last name must be strings";
        return;
      }
      if (!isValidEmail(email)) {
        // message = "Invalid email format";
        return;
      }
      if (!isValidPassword(password)) {
        // message = "Password must be at least 6 characters long and contain at least one number and one capital letter";
        return;
      }
  

    if (email === "" || password === "" || firstName === "" || lastName === "") {
      throw redirect(307, "/signup");
    } else {
      console.log(`signing up: ${firstName} with email: ${email}`);

      const user = {
        // _id: "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userType: "user"
      };
      let success = await placemarkService.signup(user);
      if (success) {
        throw redirect(303, "/login");
      } else {
        throw redirect(307, "/signup");
      }
    }
  }
};

  function isValidName(name: string): boolean {
    // Check if the name is a non-empty string
    return typeof name === "string" && name.trim().length > 0;
  }

  function isValidEmail(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password: string): boolean {
    // Regular expression for password validation (at least 6 characters, one number, one capital letter)
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  }