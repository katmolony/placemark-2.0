<script lang="ts">
  import type { Image } from "$lib/types/placemark-types";
  import { currentLocationId } from "$lib/stores";
  import { enhance } from "$app/forms";
  let file: any;

  let locationId: string;

  currentLocationId.subscribe((value) => {
    locationId = value;
  });
  const handleFileChange = (event) => {
    file = event.target.files[0];
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      console.log("File uploaded successfully:", data);
    } else {
      console.error("File upload failed");
    }
  };
</script>

<form method="POST" action="?/addImage&locationId={locationId}" use:enhance>
  <input type="file" name="image" />
  <button type="submit">Upload</button>
</form>
