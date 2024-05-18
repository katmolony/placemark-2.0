<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/services/placemark-service";
  import { currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  // let email = "";
  // let password = "";
  let message = "";

</script>

{#if message}
  <Message {message} />
{/if}
<form method="POST" action="?/login">
  <UserCredentials />
  <button class="button is-success is-fullwidth">Log In</button>
</form>
