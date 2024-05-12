<script lang="ts">
  import { currentSession, subTitle , currentLocation, currentLocationId} from "$lib/stores";
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let locationId: string;

    // Subscribe to the currentLocation store to get the locationId
    currentLocationId.subscribe((value) => {
    locationId = value;
  });

  let locationDetails: any;

  // Fetch location details when the component mounts
  // onMount(async () => {
  //   if (locationId) {
  //     // Fetch location details using locationId (replace this with your actual fetch logic)
  //     locationDetails = await fetchLocationDetails(locationId);
  //   }
  // });

  subTitle.set("Locations Page");

</script>

<p>
Location page here!
Location ID: {locationId}
</p>
