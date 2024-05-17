<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/services/placemark-service";
  import { currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    console.log(`attemting to log in email: ${email} with password: ${password}`);

    // Validation
    if (!isValidEmail(email)) {
      message = "Invalid email format";
      return;
    }
    if (!isValidPassword(password)) {
      message = "Password must be at least 6 characters long and contain at least one number and one capital letter";
      return;
    }

    let session = await placemarkService.login(email, password);
    if (session) {
      currentSession.set(session);
      // currentUserid.set(userid);
      localStorage.user = JSON.stringify(session);
      goto("/dashboard");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  }
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={login}>
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Log In</button>
</form>
