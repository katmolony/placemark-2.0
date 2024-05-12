<script lang="ts">
  import { currentSession, subTitle, currentLocation, currentLocationId } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import type { Location } from "$lib/types/placemark-types";
  import Card from "$lib/ui/Card.svelte";
  import LocationDetails from "$lib/ui/LocationDetails.svelte";

  let locationId: string; //get location id
  let location: Location | null = null;
  subTitle.set("Location Page");

  currentLocationId.subscribe((value) => {
    locationId = value;
  });

  onMount(async () => {
    if (locationId) {
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
  <div class="columns">
    <div class="column">
      <Card title="{location.title} Details">
        <LocationDetails {location} />
      </Card>
    </div>
    <div class="column">
      <Card title="Images of {location.title}">
        <!-- <LocationForm /> -->
      </Card>
    </div>
  </div>
  
{:else}
  <p>Loading location details...</p>
{/if}
