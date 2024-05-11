<script lang="ts">
  import type { Location } from "$lib/types/placemark-types";

  export let locations: Location[];
</script>

<table class="table is-fullwidth">
  <thead>
    <th>City</th>
    <th>Cordinates</th>
    <th>Weather</th>
    <th>Temperature</th>
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
          <!-- <a class="button" href="/business"><i class="fas fa-search-location"></i></a> -->
        </td>
      </tr>
    {/each}
  </tbody>
</table>
