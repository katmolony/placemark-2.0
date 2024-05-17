<script lang="ts">
  import { placemarkService } from "$lib/services/placemark-service";
  import type { User, Location } from "$lib/types/placemark-types";
  import { currentSession, latestLocation } from "$lib/stores";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import { get } from "svelte/store";
  // import { v4 as uuidv4 } from 'uuid';

  let title = "";
  let imageURL = "https://";
  let temp = 0;
  let weather = "";
  let userid = $currentSession._id;

  let message = "Please add location";

  interface LocationInfo {
    country: string;
    lat: number;
    lon: number;
  }
  const allowedWeather = ["Sunny", "Cloudy", "Rainy", "Snowy", "Foggy", "Windy", "Stormy", "Partly Cloudy", "Overcast", "Showers", "Thunderstorms", "Hazy"];

  async function getLocationInfo(title: string): Promise<LocationInfo | null> {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(title)}&format=json&addressdetails=1&limit=1`);
      const data = await response.json();

      if (data && data.length > 0) {
        const address = data[0].address;
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        if (address && address.country) {
          return { country: address.country, lat: lat, lon: lon };
        }
      }
    } catch (error) {
      console.error("Error retrieving location information:", error);
    }
    return null;
  }

  async function addLocation() {
    const user = get(currentSession);
    console.log(user._id);
    console.log(`temp: ${temp}, weather: ${weather}, userid: ${userid}`);

    if (title && temp && weather) {
      //    const user = userList.find((user) => user._id === selectedUser);
      //  if (user) {
      //locations = await placemarkService.getLocations(get(currentSession)

      const LocationInfo = await getLocationInfo(title);
      if (!LocationInfo) {
        message = "Country not found";
        return;
      }
      const { country, lat, lon } = LocationInfo;

      const location: Location = {
        // _id: "",
        title: country,
        imageURL: imageURL,
        lat: lat,
        lng: lon,
        temp: temp,
        weather: weather,
        //userid: userid,
        userid: userid // user._id
      };
      const success = await placemarkService.addLocation(location, get(currentSession));
      // if (!success) {
      //   message = "Location not completed - some error occurred";
      //   return;
      // }
      latestLocation.set(location);
      message = `You added ${title} to ${$currentSession.name}`;
    } else {
      message = "Please enter all location fields";
    }
  }
</script>

<form on:submit|preventDefault={addLocation}>
  <div class="field">
    <label class="label" for="title">Enter Country Name:</label>
    <input bind:value={title} class="input" id="title" name="title" type="string" />
  </div>
  <div class="columns">
    <div class="column">
      <div class="field">
        <label class="label" for="temp">Enter temp:</label>
        <input bind:value={temp} class="input" id="temp" name="temp" type="string" />
      </div>
    </div>
    <div class="column">
      <div class="field">
        <label class="label" for="weather">Select Weather:</label>
        <div class="select">
          <select bind:value={weather} id="weather">
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
