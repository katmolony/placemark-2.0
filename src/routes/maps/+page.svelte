<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Location } from "$lib/types/placemark-types";
  import { get } from "svelte/store";

  subTitle.set("Placemark Locations");
  let map: LeafletMap;
  let locations: Location[] = [];

  onMount(async () => {
    locations = await placemarkService.getLocations(get(currentSession));
    locations.forEach((location: Location) => {
    //   if (typeof location.title !== "string") {
        const popup = `${location.title} with temperature of ${location.temp}°C`;
        map.addMarker(location.lat, location.lng, popup);
    //   }
    });
    const lastLocation = locations[locations.length - 1];
    if (lastLocation) map.moveTo(lastLocation.lat, lastLocation.lng);
  });
</script>

<Card title="Placemark Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
