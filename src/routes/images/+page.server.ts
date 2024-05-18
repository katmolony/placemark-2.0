import { placemarkService } from "$lib/services/placemark-service";
import type { PageServerLoad } from "./$types";
import type { Session } from "$lib/types/placemark-types";
import { v4 as uuidv4 } from 'uuid';

export const load: PageServerLoad = async ({ parent, url }) => {
  const { session } = await parent();
  const locationId = url.searchParams.get("locationId");
  if (!locationId) {
    return {
      status: 400,
      error: new Error("Missing location ID")
    };
  }
  if (session) {
    return {
      locationId,
      location: await placemarkService.getLocation(locationId, session!),
      businesses: await placemarkService.getLocationBusinesses(locationId, session!),
      // locationImages: await placemarkService.getLocationImages(locationId, session!),
      allImages: await placemarkService.getAllImages(session!)
    };
  }
};

export const actions = {
  deleteImage: async ({ request, cookies, url }) => {
    const placemarkUser = cookies.get("placemark-user") as string;
    console.log("Full URL:", url.href);

    const imageId = url.searchParams.get("imageId");
    console.log("This is the image id: ", imageId);

    if (!imageId) {
      console.error("Location ID not found in URL");
      return;
    }

    if (placemarkUser) {
      const user = JSON.parse(placemarkUser) as Session;
      placemarkService.deleteImage(imageId, user);
    }
  }

  addImage:async (request, cookies, url) => {
    const placemarkUser = cookies.get("placemark-user") as string;

      console.log("Full URL:", url.href);

      const locationId = url.searchParams.get("locationId");
  
      console.log("This is the location id for image:", locationId);
  
      if (!locationId) {
        console.error("Location ID not found in URL");
        return;
      }
      if (placemarkUser) {
        const user = JSON.parse(placemarkUser) as Session;
        const form = await request.formData();

        const file = form.get("file") as unknown as File;
        const location = await placemarkService.getLocation(locationId, user);
        const uniqueId = uuidv4(); // Generate a unique ID
        const imageUrl = `placemark/${location.title}-${uniqueId}`;
  
        const image = {
          url: imageUrl,
          title: location.title,
          locationid: locationId,
        };
        
        console.log(image);
        await placemarkService.addImage(image, locationId, file); // Assuming this method uploads the file to Cloudinary and associates it with the location
        console.log(`You added an image titled ${image.title}`);
      }
    }
  };
