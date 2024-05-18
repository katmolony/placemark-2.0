<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import ImageGalery from "$lib/ui/ImageGalery.svelte";
  import { subTitle } from "$lib/stores";

  subTitle.set("Placemark Image Gallery");

  export let data: any;
</script>

<div class="columns">
  <div class="column">
    <Card title="Location Images">
      <ImageGalery images={data.allImages} />
    </Card>
  </div>
</div>
