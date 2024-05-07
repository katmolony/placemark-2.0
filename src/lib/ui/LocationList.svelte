<script lang="ts">
  export let locations = [
    {
      title: "Greece",
      imageURL: "https://cdn.britannica.com/82/195482-050-2373E635/Amalfi-Italy.jpg",
      lat: 100,
      lng: 200,
      weather: "Sunny",
      temp: 23.5
    },
    {
      title: "Italy",
      imageURL: "https://cdn.britannica.com/82/195482-050-2373E635/Amalfi-Italy.jpg",
      lat: 100,
      lng: 200,
      weather: "Sunny",
      temp: 23.5
    },
    {
      title: "Spain",
      imageURL: "https://lh5.googleusercontent.com/p/AF1QipPwWQvGO_HOnmjoMvNAeLcyrAK5uPjTlNFvxTws=w540-h312-n-k-no",
      lat: 100,
      lng: 200,
      weather: "Sunny",
      temp: 23.5
    }
  ];
</script>

<table class="table is-fullwidth">
  <thead>
    <th>City</th>
    <th>ImageURL</th>
    <th>Cordinates</th>
    <th>Weather</th>
    <th>Temperature</th>
  </thead>
  <tbody>
    {#each locations as location}
      <tr>
        <td>
          {location.title}
        </td>
        <td>
          {location.imageURL}
        </td><td>
          {location.lat}, {location.lng}
        </td>
        <td>
          {location.weather}
        </td>
        <td>
          {location.temp}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
