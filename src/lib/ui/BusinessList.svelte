<script lang="ts">
  import type { Business } from "$lib/types/placemark-types";
  import Card from "./Card.svelte";

  export let businesses: Business[];
</script>

{#each businesses as business}
  <Card title="">
    <h3>{business.title}</h3>
    <p><strong>Category:</strong> {business.category}</p>
    <!-- <p><strong>Coordinates:</strong> {business.lat}, {business.lng}</p> -->
    <p><strong>Address:</strong> {business.address}</p>
    <p><strong>Description:</strong> {business.description}</p>
    <a href="/business" class="button">
      <!-- <FontAwesomeIcon icon={faSearch} /> -->
    </a>
  </Card>
{/each}
