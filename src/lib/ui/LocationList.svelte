<script lang="ts">
  import type { Location } from "$lib/types/placemark-types";
  import { goto } from "$app/navigation"; 
  import { currentLocationId } from "$lib/stores"; 

  export let locations: Location[];

  function navigateToLocation(locationId: string) {
    currentLocationId.set(locationId);
    goto('/location');
  }
</script>

<table class="table is-fullwidth">
  <thead>
    <th>City</th>
    <th>Cordinates</th>
    <th>Weather</th>
    <th>Temperature</th>
    <th></th>
    <th></th>
  </thead>
  <tbody>
    {#each locations as location}
      <tr>
        <td>
          {location.title}
        </td>
        <td>
          {location.lat}, {location.lng}
        </td>
        <td>
          {location.weather}
        </td>
        <td>
          {location.temp}
        </td>
        <td>
          {location.userid}
        </td>
        <td>
            <button class="button" on:click={() => navigateToLocation(location._id)}>
              <i class="fas fa-search-location"></i>
            </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>