<script lang="ts">
  import { placemarkService } from "$lib/services/placemark-service";
  import type { User, Location, Business, BusinessCategories } from "$lib/types/placemark-types";
  import { currentSession, currentLocationId, latestBusiness } from "$lib/stores";
  import { get } from "svelte/store";

  let locationId: string;
  let title = "";
  let selectedCategory = "Accommodation";
  let address = "";
  let description = "";

  interface AddressInfo {
    displayName: string;
    lat: number;
    lon: number;
  }

  let message = "Please add your business";

  currentLocationId.subscribe((value) => {
    locationId = value;
  });

  async function addBusiness() {
    // Validation
    if (!isValidTitle(title)) {
      message = "Title can only be 30 letters or numbers";
      return;
    }
    if (!isValidCategory(selectedCategory)) {
      message = "Invalid category";
      return;
    }
    if (!isValidAddress(address)) {
      message = "Invalid address";
      return;
    }
    if (!isValidDescription(description)) {
      message = "Description can be up to 100 words";
      return;
    }

    // Call function to collect address and coordinates
    const addressInfo = await getDisplayNameForAddress(address);
    if (!addressInfo) {
      message = "Address not found";
      return;
    }
    const { displayName, lat, lon } = addressInfo;

    const business: Business = {
      title: title,
      category: selectedCategory,
      lat: lat,
      lng: lon,
      address: displayName,
      description: description,
      locationid: locationId
    };

    const success = await placemarkService.addBusiness(business, locationId, get(currentSession));
    if (!success) {
      message = "Business not completed - some error occurred";
      return;
    }

    latestBusiness.set(business);
    message = `You added ${title}`;
  }

  async function getDisplayNameForAddress(address: string): Promise<AddressInfo | null> {
    try {
      console.log("entering address");
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`);
      console.log(response);
      const data = await response.json();
      if (data.length > 0) {
        const displayName = data[0].display_name;
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        return { displayName, lat, lon };
      } else {
        // Address not found
        return null;
      }
    } catch (error) {
      console.error("Error validating address:", error);
      return null;
    }
  }

  // Validation functions
  function isValidTitle(title: string): boolean {
    const titleRegex = /^[a-zA-Z0-9\s]{1,30}$/;
    return titleRegex.test(title);
  }

  function isValidCategory(category: string): boolean {
    return BusinessCategories.some((cat) => cat.category === category);
  }

  async function isValidAddress(address: string): Promise<boolean> {
    if (!address.trim()) {
      return false; // Address is empty
    }
    try {
      console.log("entering address");
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`);
      console.log(response);
      const data = await response.json();
      if (data.length > 0) {
        // Address is valid
        return true;
      } else {
        // Address is invalid
        return false;
      }
    } catch (error) {
      console.error("Error validating address:", error);
      return false;
    }
  }

  function isValidDescription(description: string): boolean {
    if (!description.trim()) {
      return false;
    }
    const wordCount = description.split(/\s+/).length;
    return wordCount <= 100;
  }

  const BusinessCategories = [{ category: "Accommodation" }, { category: "Dining" }, { category: "Shopping" }, { category: "Nightlife" }, { category: "Activities" }];
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
    <input bind:value={description} class="input" id="description" name="description" type="string" />
  </div>
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
