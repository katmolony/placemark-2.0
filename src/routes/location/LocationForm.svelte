<script lang="ts">
  import { placemarkService } from "$lib/services/placemark-service";
  import type { User, Location } from "$lib/types/placemark-types";
  import { currentSession, latestLocation } from "$lib/stores";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import { get } from "svelte/store";

  let title = "";
  let imageURL = "https://";
  let lat = 0;
  let lng = 0;
  let temp = 0;
  let weather = "";
  let userid = "663cd415cadc3516bce4806b";

  let message = "Please add location";

  // export let userList: User[] = [];

  async function addLocation() {
    console.log(`Just added: ${title} with image ${imageURL}`);
    console.log(`lat: ${lat}, lng: ${lng}`);
    console.log(`temp: ${temp}, weather: ${weather}, userid: ${userid}`);
    if (title && imageURL && lat && lng && temp && weather && userid) {
      //    const user = userList.find((user) => user._id === selectedUser);
      //  if (user) {
        //locations = await placemarkService.getLocations(get(currentSession)
      // const user = await placemarkService.getUserId(get(currentSession));
      const location: Location = {
        title: title,
        imageURL: imageURL,
        lat: lat,
        lng: lng,
        temp: temp,
        weather: weather,
        userid: userid, // user._id
      };
      // const success = await placemarkService.addLocation(location, get(currentSession));
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
    <label class="label" for="title">Enter City Name:</label>
    <input bind:value={title} class="input" id="title" name="title" type="string" />
  </div>
  <div class="field">
    <label class="label" for="imageURL">Enter Image URL:</label>
    <input bind:value={imageURL} class="input" id="imageURL" name="imageURL" type="string" />
  </div>
  <div class="field">
    <label class="label" for="temp">Enter temp:</label>
    <input bind:value={temp} class="input" id="temp" name="temp" type="string" />
  </div>
  <div class="field">
    <label class="label" for="weather">Enter Weather:</label>
    <input bind:value={weather}  class="input" id="weather" name="weather" type="string" />
  </div>
  <div class="field">
    <label class="label" for="userid">Enter userid:</label>
    <input bind:value={userid} class="input" id="userid" name="userid" type="string" />
  </div>
  <Coordinates bind:lat bind:lng />
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
