<script lang="ts">
  import { placemarkService } from "$lib/services/placemark-service";
  import type { Image } from "$lib/types/placemark-types";
  import { CldImage } from "svelte-cloudinary";
  import { currentSession, latestImage } from "$lib/stores";
  import { get } from "svelte/store";
  import { enhance } from "$app/forms";

  export let images: Image[];

</script>

{#each images as image}
  <CldImage width="auto" height="auto" src={`${image.url}`} alt={`${image.title} image`} />
  <form method="POST" action="?/deleteImage&imageId={image._id}" use:enhance>
    <button class="button">
      Delete {image.title}
    </button>
  </form>
{/each}
