<script lang="ts">
  import { currentSession, subTitle, latestBusiness, currentLocationId } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import type { Location, Business } from "$lib/types/placemark-types";
  import Card from "$lib/ui/Card.svelte";
  import LocationDetails from "$lib/ui/LocationDetails.svelte";
  import BusinessList from "$lib/ui/BusinessList.svelte";
  import Message from "$lib/ui/Message.svelte";
  import BusinessForm from "./BusinessForm.svelte";
  import { CldImage } from "svelte-cloudinary";
  import { goto } from "$app/navigation";
  import ImageDisplay from "$lib/ui/ImageDisplay.svelte";

  function navigateToImages(locationId: string) {
    currentLocationId.set(locationId);
    goto("/images");
  }

  function navigateToDashboard() {
    goto("/dashboard");
  }

  let locationId: string; //get location id
  let location: Location | null = null;
  //  let location: Location;
  let businesses: Business[] = [];
  let message = "";

  subTitle.set("Location Page");

  currentLocationId.subscribe((value) => {
    locationId = value;
  });

  latestBusiness.subscribe(async (business) => {
    if (business) {
      businesses.push(business);
      businesses = [...businesses];
    }
  });

  onMount(async () => {
    if (locationId) {
      location = await placemarkService.getLocation(locationId, get(currentSession));
      businesses = await placemarkService.getLocationBusinesses(locationId, get(currentSession));

      // Set if location is not null
      if (location) {
        subTitle.set(location.title);
      }

      if (businesses.length === 0) {
        message = "No businesses added yet";
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
    <div class="column">
      <Card title="Images of {location.title}">
        <button class="button" on:click={() => navigateToImages(location._id)}>
          <i class="fas fa-search-location"></i>
        </button>
        <ImageDisplay {location} />
      </Card>
    </div>
  </div>
  {#if businesses}
    <div class="columns">
      <div class="column">
        <Card title="{location.title}'s Businesses">
          <BusinessList {businesses} />
        </Card>
      </div>
      <div class="column">
        <Card title="Add a Business">
          <BusinessForm />
        </Card>
      </div>
    </div>
  {:else}
    <Message {message} />
  {/if}
{:else}
  <h1>Error loading location details</h1>
  <h1>Please return to dashboard and try again</h1>
  <button class="button" on:click={() => navigateToDashboard()}>
    <i>Return to Dashboard</i>
  </button>
  <!-- // might add a reload here -->
{/if}
