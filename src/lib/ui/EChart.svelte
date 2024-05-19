<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';

  export let options = {};

  let chartContainer: any;

  let chart: any;

  onMount(() => {
    if (typeof window !== 'undefined') {
      chart = echarts.init(chartContainer);
      chart.setOption(options);

      const resizeChart = () => {
        if (chart) {
          chart.resize();
        }
      };

      window.addEventListener('resize', resizeChart);

      return () => {
        chart.dispose();
        window.removeEventListener('resize', resizeChart);
      };
    }
  });

  $: if (chart) {
    chart.setOption(options);
  }
</script>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
  }
</style>

<div bind:this={chartContainer} class="chart-container"></div>