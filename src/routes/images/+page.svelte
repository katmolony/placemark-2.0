<script lang="ts">
  import { currentSession, subTitle, latestBusiness, currentLocationId } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import LocationDetails from "$lib/ui/LocationDetails.svelte";
  import ImageGalery from "$lib/ui/ImageGalery.svelte";
  import ImageForm from "./ImageForm.svelte";
  // import { UploadWidget } from "$lib/ui/UploadWidget.svelte";

  let locationId: string; //get location id
  let message = "";

  export let data: any;

  let location = data.location;

  subTitle.set("Image Page");

  if (location) {
    subTitle.set(`${location.title}'s Image Gallery`);
  }

  currentLocationId.subscribe((value) => {
    locationId = value;
  });
</script>

{#if location}
  <div class="columns">
    <div class="column">
      <Card title="{location.title} Details">
        <LocationDetails {location} />
      </Card>
    </div>
    <div class="column">
      <Card title="Upload Photos">
        <ImageForm location={location}/>
      </Card>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <Card title="Images of {location.title}">
        <ImageGalery images={data.locationImages} />
      </Card>
    </div>
  </div>
{:else}
  <p>Loading location images...</p>
{/if}
