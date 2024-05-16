<script lang="ts">
  import { CldImage } from "svelte-cloudinary";
  import type { Location } from "$lib/types/placemark-types";

  const cloudinaryCloudName = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME;

  export let location: Location;

//   async function deleteImage() {
//     try {
//       // Send a DELETE request to Cloudinary API to delete the image
//       const response = await fetch('https://api.cloudinary.com/v1_1/{your_cloud_name}/delete_by_token', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer {your_api_key}:{your_api_secret}',
//         },
//         body: JSON.stringify({
//           public_id: location.publicId // or provide the URL of the image you want to delete
//         })
//       });

//       if (response.ok) {
//         // Image deletion successful
//         console.log('Image deleted successfully');
//       } else {
//         // Image deletion failed
//         console.error('Failed to delete image');
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   }
</script>

{#if cloudinaryCloudName}
  <CldImage width="auto" height="auto" src="placemark/locations/{location.title}_1" alt="{location.title} image" />
{:else}
  <p>Error loading images</p>
{/if}

