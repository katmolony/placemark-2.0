<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { currentSession, subTitle, latestLocation } from "$lib/stores";
  import LocationForm from "./LocationForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { DataSet, Location, Business } from "$lib/types/placemark-types";
  import LocationList from "$lib/ui/LocationList.svelte";
  import { generateByLocationTemp, generateBusinessesPerLocation } from "$lib/services/placemark-utils";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  let locations: Location[] = [];
  let businesses: Business[] = [];
  let map: LeafletMap;

  let topTemps: DataSet;
  let totalBusinessPerLocation: DataSet;

  subTitle.set("Welcome to the Dashboard");

  onMount(async () => {
    locations = await placemarkService.getLocations(get(currentSession));
    businesses = await placemarkService.getBusinesses(get(currentSession));

    // Graphs
    topTemps = generateByLocationTemp(locations);
    totalBusinessPerLocation = generateBusinessesPerLocation(locations, businesses);
    // Map
    locations.forEach((location: Location) => {
      const popup = `${location.title} with temperature of ${location.temp}°C`;
      map.addMarker(location.lat, location.lng, popup);
    });
    const lastLocation = locations[locations.length - 1];
    if (lastLocation) map.moveTo(lastLocation.lat, lastLocation.lng);
  });

  latestLocation.subscribe(async (location) => {
    if (location) {
      locations.push(location);
      locations = [...locations];
      // Graphs
      topTemps = generateByLocationTemp(locations);
      totalBusinessPerLocation = generateBusinessesPerLocation(locations, businesses);
      // Map
      const popup = `${location.title} with temperature of ${location.temp}°C`;
      map.addMarker(location.lat, location.lng, popup);
      map.moveTo(location.lat, location.lng);
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Location List">
      <LocationList {locations} />
    </Card>
  </div>
  <div class="column">
    <Card title="Location Coordinates">
      <LeafletMap height={30} bind:this={map} />
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
