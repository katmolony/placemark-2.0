<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import LocationForm from "./LocationForm.svelte";

  subTitle.set("Welcome to the Dashboard");
</script>

<Card title="Add Favourite Location">
  <LocationForm />
</Card>
