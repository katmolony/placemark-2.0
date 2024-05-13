<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import type { User, Location, Business, BusinessCategories} from "$lib/types/placemark-types";
    import { currentSession, currentLocationId, latestBusiness } from "$lib/stores";
    import Coordinates from "$lib/ui/Coordinates.svelte";
    import { get } from "svelte/store";

    let locationId: string; //get location id
    let title = "";
    let selectedCategory = "Accommodation";
    let lat = 0;
    let lng = 0;
    let address = "";
    let description = "";
  
    let message = "Please add business";

    currentLocationId.subscribe((value) => {
    locationId = value;
  });
  
    // export let userList: User[] = [];
  
    async function addBusiness() {
      console.log(`Just added: ${title} with category ${selectedCategory}`);
      console.log(`lat: ${lat}, lng: ${lng}`);
      console.log(`description: ${description}, address: ${address}, locationid: ${locationId}`);
      if (title && selectedCategory && lat && lng && description && address && locationId) {
        const business: Business = {
         // _id: "",
          title: title,
          category: selectedCategory,
          lat: lat,
          lng: lng,
          address: address,
          description: description,
          locationid: locationId,
        };
        const success = await placemarkService.addBusiness(business, locationId, get(currentSession));
        if (!success) {
          message = "Business not completed - some error occurred";
          return;
        }
        latestBusiness.set(business);
        message = `You added ${title} to ${locationId}`;
      } else {
        message = "Please enter all business fields";
      }
    }
    const BusinessCategories = [ {category:"Accommodation"}, {category:"Dining"}, { category:"Shopping"}, { category:"Nightlife"}, { category:"Activities"} ]

  </script>
  
  <form on:submit|preventDefault={addBusiness}>
    <div class="field">
      <label class="label" for="title">Enter Business Name:</label>
      <input bind:value={title} class="input" id="title" name="title" type="string" />
    </div>
      <div class="field">
        <label class="label" for="amount">Select Category:</label>
        <div class="select">
          <select bind:value={selectedCategory}>
            {#each BusinessCategories as business}
              <option>{business.category}</option>
            {/each}
          </select>
        </div>
      </div>
    <div class="field">
      <label class="label" for="temp">Enter Address:</label>
      <input bind:value={address} class="input" id="address" name="address" type="string" />
    </div>
    <div class="field">
      <label class="label" for="weather">Enter Description:</label>
      <input bind:value={description}  class="input" id="description" name="description" type="string" />
    </div>
    <Coordinates bind:lat bind:lng />
    <div class="field">
      <div class="control">
        <button class="button is-success is-fullwidth">Add Business</button>
      </div>
    </div>
  </form>
  <div class="box mt-4">
    <div class="content has-text-centered">
      {message}
    </div>
  </div>