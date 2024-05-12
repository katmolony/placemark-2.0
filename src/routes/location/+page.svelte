<script lang="ts">
  // import { placemarkService } from "$lib/services/placemark-service";
  // import type { Location } from "$lib/types/placemark-types";
  import { currentSession, subTitle } from "$lib/stores";
  // import Card from "$lib/ui/Card.svelte";
  // import LocationList from "$lib/ui/LocationList.svelte";
  // import { onMount } from "svelte";
  // import { get } from "svelte/store";

  subTitle.set("Locations Page");
  // let locations: Location[] = [];
  // onMount(async () => {
  //   locations = await placemarkService.getLocations(get(currentSession));
  // });
</script>

<p>
Location page here!
</p>
