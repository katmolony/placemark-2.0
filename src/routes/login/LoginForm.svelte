<script lang="ts">
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { supabase } from "$lib/supabaseClient";

  let message = "";

</script>

{#if message}
  <Message {message} />
{/if}
<div class="column">
  <form method="POST" action="?/login">
    <UserCredentials />
    <button class="button is-success is-fullwidth">Log In</button>
  </form>
</div>
<!-- <div class="column">
  <form method="POST" action="?/githubLogin&provider=github">
    <button class="button is-fullwidth">Login with Github</button>
  </form>
</div> -->
<div class="column">
  <form method="POST" action="?/OAuth2">
    <!-- <form class="auth-form" method="post" action="?/OAuth2"> -->
    <button class="button is-fullwidth" type="submit"> Sign Up with Google </button>
  </form>
</div>
