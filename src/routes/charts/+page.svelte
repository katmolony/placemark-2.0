<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { currentSession, subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import EChart from "$lib/ui/EChart.svelte";

  export let data: any;
  subTitle.set("Welcome to the Charts");

</script>

<div class="columns">
  <div class="column">
    <Card title="Locations with the Highest Temperature">
      <Chart data={data.topTemps} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Business Per Location">
      <Chart data={data.totalBusinessPerLocation} type="pie" />
    </Card>
  </div>
  </div>
  <div class="column has-text-centered">
    <EChart options={data.chartOptions} />
  </div>
