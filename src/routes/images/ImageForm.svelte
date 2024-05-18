<script lang="ts">
  import type { Image } from "$lib/types/placemark-types";
  import { currentLocationId } from "$lib/stores";
  import { enhance } from "$app/forms";
  import type { Location } from "$lib/types/placemark-types";
  import { CldImage, CldUploadWidget } from "svelte-cloudinary";

  let file: any;

  export let location: Location;

  let locationId: string;
  let message = "Please add your business";

  currentLocationId.subscribe((value) => {
    locationId = value;
  });

  let uploadedImageUrl = "";

  function handleUploadSuccess(result) {
    if (result.event === "success") {
      uploadedImageUrl = result.info.secure_url;
    }
  }
</script>

<form method="POST" action="?/addImage&locationId={locationId}" use:enhance>
  <CldUploadWidget uploadPreset="e0f25hvs" onSuccess={handleUploadSuccess} let:open let:isLoading>
    <button class="button" on:click={open} disabled={isLoading}> Upload an Image </button>
  </CldUploadWidget>

  {#if uploadedImageUrl}
    <!-- Hidden input to send the uploaded image URL with the form -->
    <input type="hidden" name="imageUrl" value={uploadedImageUrl} />
    <p>Image uploaded, press submit</p>
  {/if}

  <div class="field">
    <button class="button is-primary" type="submit">Submit</button>
  </div>
</form>
