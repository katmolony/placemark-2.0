<script lang="ts">
  import { currentSession, subTitle, latestBusiness, currentLocationId } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import LocationDetails from "$lib/ui/LocationDetails.svelte";
  import BusinessList from "$lib/ui/BusinessList.svelte";
  import Message from "$lib/ui/Message.svelte";
  import BusinessForm from "./BusinessForm.svelte";
  import { goto } from "$app/navigation";
  import ImageDisplay from "$lib/ui/ImageDisplay.svelte";

  export let data: any;

  let location = data.location;

  function navigateToImages(locationId: string) {
    currentLocationId.set(locationId);
    goto(`/images?locationId=${locationId}`);
  }

  function navigateToDashboard() {
    goto("/dashboard");
  }

  subTitle.set(`${location.title} Page`);
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
    <div class="columns">
      <div class="column">
        <Card title="{location.title}'s Businesses">
          <BusinessList businesses={data.businesses} />
        </Card>
      </div>
      <div class="column">
        <Card title="Add a Business">
          <BusinessForm />
        </Card>
      </div>
    </div>
{:else}
  <h1>Error loading location details</h1>
  <h1>Please return to dashboard and try again</h1>
  <button class="button" on:click={() => navigateToDashboard()}>
    <i>Return to Dashboard</i>
  </button>
  <!-- // might add a reload here -->
{/if}
