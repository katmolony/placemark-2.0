<script lang="ts">

// title: String,
//   imageURL: String,
//   lat: Number,
//   lng: Number,
//   temp: Number,
//   weather: String,
//   userid: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },

import Coordinates from "$lib/ui/Coordinates.svelte";
  //...
  let lat = 52.160858;
  let lng = -7.15242;

let title = "Galway";
let imageURL = "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTwn4EZh1ZftOnaus7nT7Qoujoyn00W7smzMBxvz7kcVBYHfj8R8oLtQAD1NAJZSMvPb89oXO-VY9Vl3jpjwV1g4KaVd54OfHzGw38fUPM";

async function addLocation() {
    console.log(`Just added: ${title} with image ${imageURL}`);
    console.log(`lat: ${lat}, lng: ${lng}`);
  }

</script>

<form on:submit|preventDefault={addLocation}>
  <div class="field">
    <label class="label" for="title">Enter City Name:</label>
    <input class="input" id="title" name="title" type="string" />
  </div>
  <div class="field">
    <label class="label" for="imageURL">Enter Image URL:</label>
    <input class="input" id="imageURL" name="imageURL" type="string" />
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Add Location</button>
    </div>
  </div>
</form>