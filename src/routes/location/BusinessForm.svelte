<script lang="ts">
  import type { User, Location, Business, BusinessCategories } from "$lib/types/placemark-types";
  import { currentLocationId } from "$lib/stores";
  import { enhance } from "$app/forms";

  let locationId: string;
  let message = "Please add your business";

  currentLocationId.subscribe((value) => {
    locationId = value;
  });

  const BusinessCategories = [{ category: "Accommodation" }, { category: "Dining" }, { category: "Shopping" }, { category: "Nightlife" }, { category: "Activities" }];
</script>

<form method="POST" action="?/addBusiness&locationId={locationId}" use:enhance>
  <div class="field">
    <label class="label" for="title">Enter Business Name:</label>
    <input class="input" id="title" name="title" type="string" />
  </div>
  <div class="field">
    <label class="label" for="category">Select Category:</label>
    <div class="select">
      <select name="category">
        <option value="" disabled>Select weather</option>
        {#each BusinessCategories as business}
          <option value={business.category}>{business.category}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="field">
    <label class="label" for="temp">Enter Address:</label>
    <input class="input" id="address" name="address" type="string" />
  </div>
  <div class="field">
    <label class="label" for="description">Enter Description:</label>
    <input class="input" id="description" name="description" type="string" />
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
