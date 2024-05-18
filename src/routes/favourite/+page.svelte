<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import LocationList from "$lib/ui/LocationList.svelte";

  export let data: any;

  subTitle.set("All Locations");
</script>

<Card title="Favourite Locations">
  <LocationList locations={data.locations}/>
</Card>
