<script lang="ts">
  import { goto } from "$app/navigation";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import Message from "$lib/ui/Message.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { User } from "$lib/types/placemark-types";

  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let message = "";

  async function signup() {
    
    // Validation
    if (!isValidName(firstName) || !isValidName(lastName)) {
      message = "First name and last name must be strings";
      return;
    }
    if (!isValidEmail(email)) {
      message = "Invalid email format";
      return;
    }
    if (!isValidPassword(password)) {
      message = "Password must be at least 6 characters long and contain at least one number and one capital letter";
      return;
    }

    const user: User = {
      // _id: "",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userType: "user"
    };
    let success = await placemarkService.signup(user);
    console.log(success);
    // const success = false;
    if (success) {
      goto("/login");
    } else {
      message = "Error Trying to sign up";
    }
  }

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
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={signup}>
  <UserDetails bind:firstName bind:lastName />
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Create Account</button>
  <br />
</form>
