<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { onMount } from "svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { currentSession, subTitle } from "$lib/stores";
  import { get } from "svelte/store";
  import Card from "$lib/ui/Card.svelte";
  import type { DataSet } from "$lib/types/placemark-types";
  import { generateByLocationTemp, generateBusinessesPerLocation } from "$lib/services/placemark-utils";

  let topTemps: DataSet;
  let totalBusinessPerLocation: DataSet;

  subTitle.set("Welcome to the Charts");

  onMount(async () => {
    const locationList = await placemarkService.getLocations(get(currentSession));
    const businessList = await placemarkService.getBusinesses(get(currentSession));

    // Charts
    topTemps = generateByLocationTemp(locationList);
    totalBusinessPerLocation = generateBusinessesPerLocation(locationList, businessList);

  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Locations with the Highest Temperature">
      <Chart data={topTemps} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Business Per Location">
      <Chart data={totalBusinessPerLocation} type="pie" />
    </Card>
  </div>
  <div class="column has-text-centered">
    <img alt="Homer" src="/homer4.jpeg" width="300" />
  </div>
</div>
