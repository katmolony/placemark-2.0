<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import WeatherMap from "$lib/ui/WeatherMap.svelte";
  import { onMount } from "svelte";
  import type { Location, Business } from "$lib/types/placemark-types";

  export let data: any;
  let map: LeafletMap;
  let weatherMap: WeatherMap;
  subTitle.set("Placemark Locations");

  onMount(async () => {
    const leaflet = await import("leaflet");
    const locations = data.locations;
    const businesses = data.businesses;
    // Location Markers
    locations.forEach((location: Location) => {
      const locationPopup = `${location.title} with temperature of ${location.temp}°C`;
      map.addLocationMarker(location.lat, location.lng, locationPopup);
    });
    // Business Markers
    businesses.forEach((business: Business) => {
      const businessPopup = `${business.title}`;
      map.addBusinessMarker(business.lat, business.lng, businessPopup);
    });
    const lastLocation = locations[locations.length - 1];
    if (lastLocation && map) map.moveTo(lastLocation.lat, lastLocation.lng);
    if (lastLocation && weatherMap) weatherMap.moveTo(lastLocation.lat, lastLocation.lng);
  });
</script>

<Card title="Placemark Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
<Card title="Weather Locations">
  <WeatherMap height={60} bind:this={weatherMap} />
</Card>
