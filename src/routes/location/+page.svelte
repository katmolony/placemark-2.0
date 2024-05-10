<script lang="ts">
  import { currentSession, subTitle, latestLocation } from "$lib/stores";
  import LocationForm from "./LocationForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Location } from "$lib/types/placemark-types";
  import LocationList from "$lib/ui/LocationList.svelte";

  // let locationList: Location[] = [];
  let locations: Location[] = [];
  subTitle.set("Welcome to the Dashboard");

  onMount(async () => {
    locations = await placemarkService.getLocations(get(currentSession));
  });

  latestLocation.subscribe(async (location) => {
    if (location) {
      locations.push(location);
      locations = [...locations];
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Location List">
      <LocationList {locations} />
    </Card>
  </div>
  <div class="column">
    <Card title="Add Favourite Location">
      <LocationForm />
    </Card>
  </div>
</div>
