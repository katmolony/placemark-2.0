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

  const TotalBusinessPerLocation = {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  };

  // export const load = async () => {
  //     const locations = await placemarkService.getLocations(get(currentSession));
  //     TotalBusinessPerLocation.labels = [];
  //     locations.forEach((location) => {
  //     // @ts-ignore
  //     TotalBusinessPerLocation.labels.push(`${location.title}`);
  //     TotalBusinessPerLocation.datasets[0].values.push(0);
  //   });

  onMount(async () => {
    const locationList = await placemarkService.getLocations(get(currentSession));
    const businessList = await placemarkService.getBusinesses(get(currentSession));

    // Sort locations by temp in descending order
    const sortedLocations = locationList.sort((a, b) => b.temp - a.temp);

    sortedLocations.slice(0, 3).forEach((location, index) => {
      topTemps.datasets[0].values[index] = location.temp;
      topTemps.labels[index] = location.title;
    });

    // for TotalBusinessPerLocation
    const locations = await placemarkService.getLocations(get(currentSession)); // repeated above
    TotalBusinessPerLocation.labels = [];
    locations.forEach((location) => {
      // @ts-ignore
      TotalBusinessPerLocation.labels.push(`${location.title}`);
      TotalBusinessPerLocation.datasets[0].values.push(0);
    });
    locations.forEach((location, i) => {
      businessList.forEach((business) => {
        // @ts-ignore
        if (business.locationid == location._id) {
          TotalBusinessPerLocation.datasets[0].values[i] += 1;
        }
      });
    });
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
      <Chart data={TotalBusinessPerLocation} type="pie" />
    </Card>
  </div>
  <div class="column has-text-centered">
    <img alt="Homer" src="/homer4.jpeg" width="300" />
  </div>
</div>
