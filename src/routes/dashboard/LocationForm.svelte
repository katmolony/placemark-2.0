<script lang="ts">
  import type { User, Location } from "$lib/types/placemark-types";
  import { enhance } from "$app/forms";

  let message = "Please add location";
  const allowedWeather = ["Sunny", "Cloudy", "Rainy", "Snowy", "Foggy", "Windy", "Stormy", "Partly Cloudy", "Overcast", "Showers", "Thunderstorms", "Hazy"];

</script>

<form method="POST" action="?/addLocation" use:enhance>
  <div class="field">
    <label class="label" for="title">Enter Country Name:</label>
    <input class="input" id="title" name="title" type="string" />
  </div>
  <div class="columns">
    <div class="column">
      <div class="field">
        <label class="label" for="temp">Enter temp:</label>
        <input class="input" id="temp" name="temp" type="string" />
      </div>
    </div>
    <div class="column">
      <div class="field">
        <label class="label" for="weather">Select Weather:</label>
        <div class="select">
          <select name="weather">
            <option value="" disabled>Select weather</option>
            {#each allowedWeather as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Add Location</button>
    </div>
  </div>
</form>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
