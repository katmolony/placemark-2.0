<script lang="ts">
  import type { Location } from "$lib/types/placemark-types";
  import { goto } from "$app/navigation";

  export let locations: Location[];
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
          <!-- <a class="button" href="/business?locationId=${location._id}"><i class="fas fa-search-location"></i></a> -->
          <a class="button" href="/location"><i class="fas fa-search-location"></i></a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
