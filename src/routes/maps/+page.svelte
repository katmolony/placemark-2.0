<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import WeatherMap from "$lib/ui/WeatherMap.svelte";
  import { onMount } from "svelte";
  import type { Location, Business } from "$lib/types/placemark-types";
  import { get } from "svelte/store";
  

  subTitle.set("Placemark Locations");
  let map: LeafletMap;
  let weatherMap: LeafletMap;
  let locations: Location[] = [];
  let businesses: Business[] = [];

  onMount(async () => {
    // locations = await placemarkService.getLocations(get(currentSession));
    // businesses = await placemarkService.getBusinesses(get(currentSession));
    // locations.forEach((location: Location) => {
    // //   if (typeof location.title !== "string") {
    //     const locationPopup = `${location.title} with temperature of ${location.temp}°C`;
    //     map.addLocationMarker(location.lat, location.lng, locationPopup);
    // // }
    
    // });
    // businesses.forEach((business:Business) => {
    //   const businessPopup = `${business.title}`;
    //   map.addBusinessMarker(business.lat, business.lng, businessPopup);
    // })
    // const lastLocation = locations[locations.length - 1];
    // if (lastLocation) map.moveTo(lastLocation.lat, lastLocation.lng);
  });
</script>

<Card title="Placemark Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
<Card title="Weather Locations">
  <WeatherMap height={60} bind:this={weatherMap} />
</Card>
