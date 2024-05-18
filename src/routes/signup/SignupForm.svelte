<script lang="ts">
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import Message from "$lib/ui/Message.svelte";

  let message = "";

</script>

{#if message}
  <Message {message} />
{/if}
<form method="POST" action="?/signup">
  <UserDetails />
  <UserCredentials />
  <button class="button is-success is-fullwidth">Create Account</button>
  <br />
</form>
