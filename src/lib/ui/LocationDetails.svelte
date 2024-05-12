<script lang="ts">
  import type { Location } from "$lib/types/placemark-types";

  export let location: Location | null = null;
</script>

{#if location}
  <div class="location-container">
    <div class="location-details">
      <p>Latitude: {location.lat}, Longitude: {location.lng}</p>
      <p>Weather: {location.weather}</p>
      <p>Temperature: {location.temp}°C</p>
    </div>
  </div>
{:else}
  <p>Loading location details...</p>
{/if}
