<!-- <script lang="ts">
    import type { Business } from "$lib/types/placemark-types";
  
    export let businesses: Business[];

    // mcdonalds: {
    //   title: 'Mc Donalds Middle Street',
    //   address: '123 Ronald Street, New Orleans',
    //   description: 'Lovely food, fun for families',
    //   lat: 100,
    //   lng: 200,
    //   category: 'Dining',
    //   _id: new ObjectId('663f946e5753f4b92e70ce53'),
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
  </table> -->

  <script lang="ts">
    import { page } from '$app/stores';
  
    let locationId: string | undefined;
  
    // $: {
    //   // Extract locationId from the query parameters
    //   locationId = $page.query.get('locationId') as string | undefined;
    // }
  </script>
  
  <h1>Business Page</h1>
  <p>Location ID: {locationId}</p>