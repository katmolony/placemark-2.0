<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { onMount } from "svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { currentSession, subTitle } from "$lib/stores";
  import { get } from "svelte/store";
  import Card from "$lib/ui/Card.svelte";

  subTitle.set("Welcome to the Charts");

  const topTemps = {
    labels: ["", "", ""],
    datasets: [
      {
        values: [0, 0, 0]
      }
    ]
  };

  onMount(async () => {
    const locationList = await placemarkService.getLocations(get(currentSession));

    // Sort locations by temp in descending order
    const sortedLocations = locationList.sort((a, b) => b.temp - a.temp);

    sortedLocations.slice(0, 3).forEach((location, index) => {
      topTemps.datasets[0].values[index] = location.temp;
      topTemps.labels[index] = location.title;
    });
  });
</script>

<div class="columns">
    <div class="column">
      <Card title="Locations with the Highest Temperature">
        <Chart data={topTemps} type="bar" />
      </Card>
    </div>
    <div class="column has-text-centered">
      <img alt="Homer" src="/homer4.jpeg" width="300" />
    </div>
  </div>
