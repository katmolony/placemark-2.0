<script lang="ts">
  import { CldImage } from "svelte-cloudinary";
  import type { Location } from "$lib/types/placemark-types";

  export let location: Location;
</script>

<CldImage width="auto" height="auto" src="placemark/locations/{location.title}_1" alt="{location.title} image" />
