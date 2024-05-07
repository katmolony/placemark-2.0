<script lang="ts">
  import { subTitle } from "$lib/stores";
  import LocationForm from "./LocationForm.svelte";

  subTitle.set("Welcome to the Dashboard");
</script>

<LocationForm />