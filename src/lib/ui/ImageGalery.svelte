<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
  import type { Image } from "$lib/types/placemark-types";
  import { CldImage } from "svelte-cloudinary";
  import { currentSession, latestImage } from "$lib/stores";
  import { get } from "svelte/store";

  const cloudinaryCloudName = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME;

  export let images: Image[];

  function deleteImage(imageid: string) {
    placemarkService.deleteImage(imageid, get(currentSession));
    // Add in this code once Consistency in app
//     .then(() => {
//         // Reload the page after deleting the image
//         window.location.reload();
//       })
//       .catch(error => {
//         console.error('Error deleting image:', error);
//       });
  }


  latestImage.subscribe(async (image) => {
    if (image) {
        images.push(image);
        images = [...images];
    }
  });
</script>

{#each images as image, index}
  <CldImage
    width="auto"
    height="auto"
    src={`placemark/locations/${image.url}`}
    alt={`${image.title} image`}
  />
  <button class="button" on:click={() => deleteImage(image._id)}>
    Delete {image.title}
  </button>
{/each}