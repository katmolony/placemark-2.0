<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { placemarkService } from '$lib/services/placemark-service';
  import { currentSession } from '$lib/stores';
import { get } from 'svelte/store';

  const apiUrl = 'https://api.cloudinary.com/v1_1/dgaza06yf/resources/image';
  const apiKey = '439194135674217';
  const apiSecret = 't-aLwd-c-DcAQasUej8ISU6Vz3A';

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(apiUrl, {
  //       auth: {
  //         username: apiKey,
  //         password: apiSecret
  //       }
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };



  const images =  placemarkService.getImages(get(currentSession));

  onMount(() => {
     console.log(images);
  });
</script>
