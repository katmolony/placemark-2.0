<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import LocationForm from "./LocationForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Location } from "$lib/types/placemark-types";

  let locationList: Location[] = [];
  subTitle.set("Welcome to the Dashboard");

  onMount(async () => {
    locationList = await placemarkService.getLocations(get(currentSession));
  });
</script>

<Card title="Add Favourite Location">
  <LocationForm />
</Card>
