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
    const user: User = {
      // _id: "",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password, 
      userType: "user",
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
