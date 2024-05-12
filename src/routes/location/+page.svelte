<script lang="ts">
  import { currentSession, subTitle, currentLocation, currentLocationId } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import type { Location } from "$lib/types/placemark-types";

  let locationId: string; //get location id
  let location: Location | null = null;
  subTitle.set("Location Page");

  currentLocationId.subscribe((value) => {
    locationId = value;
  });

  onMount(async () => {
    if (locationId) {
      // add if statment with message
      location = await placemarkService.getLocation(locationId, get(currentSession));

      // Set if location is not null
      if (location) {
        subTitle.set(location.title);
      }
    }
  });
</script>

<p>
  Location page here! Location ID: {locationId}
</p>
{#if location}
  <p>
    Location Title: {location.title}
  </p>
{:else}
  <p>Loading location details...</p>
{/if}
