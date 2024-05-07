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
</script>

<form>
  <div class="field">
    <label class="label" for="title">Enter City Name:</label>
    <input class="input" id="title" name="amount" type="string" />
  </div>
  <div class="field">
    <label class="label" for="title">Enter Image URL:</label>
    <input class="input" id="imageURL" name="amount" type="string" />
  </div>

  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Add Location</button>
    </div>
  </div>
</form>