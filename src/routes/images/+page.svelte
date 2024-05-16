<script lang="ts">
    import { currentSession, subTitle, latestBusiness, currentLocationId } from "$lib/stores";
    import { placemarkService } from "$lib/services/placemark-service";
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    import type { Location, Image } from "$lib/types/placemark-types";
    import Card from "$lib/ui/Card.svelte";
    import LocationDetails from "$lib/ui/LocationDetails.svelte";
    import Message from "$lib/ui/Message.svelte";
    import { CldImage } from "svelte-cloudinary";
    import ImageList from "$lib/ui/ImageDisplay.svelte";
    import ImageGalery from "$lib/ui/ImageGalery.svelte";
  
    const cloudinaryCloudName = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
    let locationId: string; //get location id
    let location: Location | null = null;
    let images: Image[] = [];
    let message = "";
  
    subTitle.set("Image Page");
  
    currentLocationId.subscribe((value) => {
      locationId = value;
    });
  
    onMount(async () => {
      if (locationId) {
        location = await placemarkService.getLocation(locationId, get(currentSession));
        // images = await placemarkService.getLocationImages(locationId, get(currentSession));
        images = await placemarkService.getAllImages( get(currentSession));
  
        // Set if location is not null
        if (location) {
          subTitle.set(location.title);
        }
  
        if (images.length === 0) {
          message = "No images added yet";
        }
      }
    });
  </script>
  
  {#if location}
    <div class="columns">
      <div class="column">
        <Card title="{location.title} Details">
          <LocationDetails {location} />
        </Card>
      </div>
      </div>
      <div class="columns">
      <div class="column">
        <Card title="Images of {location.title}">
          <ImageGalery {images} />
        </Card>
      </div>
    </div>
    {#if images}
      <div class="columns">
      </div>
    {:else}
      <Message {message} />
    {/if}
  {:else}
    <p>Loading location images...</p>
  {/if}
  