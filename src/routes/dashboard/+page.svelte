<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { currentSession, subTitle, latestLocation } from "$lib/stores";
  import LocationForm from "./LocationForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LocationList from "$lib/ui/LocationList.svelte";
  import { browser } from "$app/environment";

  export let data: any;
  subTitle.set("Welcome to the Dashboard");

  // Map
  let LeafletMap: any;
  // Download map in browser
  if (browser) {
    import("$lib/ui/LeafletMap.svelte").then((module) => {
      LeafletMap = module.default;
    });
  }

</script>

<div class="columns">
  <div class="column">
    <Card title="Location List">
      <LocationList locations={data.locations} />
    </Card>
  </div>
  {#if browser && LeafletMap}
    <div class="column">
      <Card title="Location Coordinates">
        <LeafletMap height={60}/>
      </Card>
    </div>
  {/if}
</div>
<div class="columns">
  <div class="column">
    <Card title="Locations with the Hottest Temperatures">
      <Chart data={data.topTemps} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Businesses Per Location">
      <Chart data={data.totalBusinessPerLocation} type="pie" />
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Add Favourite Location">
      <LocationForm />
    </Card>
  </div>
</div>
