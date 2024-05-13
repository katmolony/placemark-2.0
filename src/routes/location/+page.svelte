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

  let locationId: string; //get location id
  let location: Location | null = null;
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
        <!-- <LocationImage /> -->
      </Card>
    </div>
  </div>
  {#if businesses}
  <div class="columns">
    <div class="column">
      <Card title="{location.title}'s Businesses">
        <BusinessList {businesses}/>
      </Card>
    </div>
    <div class="column">
      <Card title="Add a Business">
        <BusinessForm />
      </Card>
    </div>
  </div>
  {:else }
    <Message {message} />
  {/if}
  
{:else}
  <p>Loading location details...</p>
{/if}
