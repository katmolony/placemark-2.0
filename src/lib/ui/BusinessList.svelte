<script lang="ts">
    import type { Business } from "$lib/types/placemark-types";
  
    export let businesses: Business[];
  </script>
  
  <table class="table is-fullwidth">
    <thead>
      <th>Business Name</th>
      <th>Category</th>
      <th>Coordinates</th>
      <th>Address</th>
      <th>description</th>
      <th></th>
    </thead>
    <tbody>
      {#each businesses as business}
        <tr>
          <td>
            {business.title}
          </td>
          <td>
            {business.category}
          </td>
          <td>
            {business.lat}, {business.lng}
          </td>
          <td>
            {business.address}
          </td>
          <td>
            {business.description}
          </td>
          <td>
            <a class="button" href="/business"><i class="fas fa-search-business"></i></a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>