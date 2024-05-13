<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { currentSession, subTitle, latestLocation } from "$lib/stores";
  import LocationForm from "./LocationForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { DataSet, Location , Business} from "$lib/types/placemark-types";
  import LocationList from "$lib/ui/LocationList.svelte";
  import { generateByLocationTemp, generateBusinessesPerLocation } from "$lib/services/placemark-utils";

  let locations: Location[] = [];
  let businesses: Business[] = [];

  let topTemps: DataSet;
  let totalBusinessPerLocation: DataSet;

  subTitle.set("Welcome to the Dashboard");

  onMount(async () => {
    locations = await placemarkService.getLocations(get(currentSession));
    businesses = await placemarkService.getBusinesses(get(currentSession));

    topTemps = generateByLocationTemp(locations);
    totalBusinessPerLocation = generateBusinessesPerLocation(locations, businesses);
  });

  latestLocation.subscribe(async (location) => {
    if (location) {
      locations.push(location);
      locations = [...locations];
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Location List">
      <LocationList {locations} />
    </Card>
  </div>
  </div>
  <div class="columns">
  <div class="column">
    <Card title="Locations with the Hottest Temperatures">
      <Chart data={topTemps} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Businesses Per Location">
      <Chart data={totalBusinessPerLocation} type="pie" />
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
