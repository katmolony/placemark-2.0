<script lang="ts">
  import { subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import LocationList from "$lib/ui/LocationList.svelte";

  subTitle.set("Favourite Locations");
</script>

<Card title="Favourite Locations">
  <LocationList />
</Card>
