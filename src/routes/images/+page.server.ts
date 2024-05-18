import { placemarkService } from "$lib/services/placemark-service";
import type { PageServerLoad } from "./$types";
import type { Session } from "$lib/types/placemark-types";
import { v4 as uuidv4 } from "uuid";
import type { Actions } from "@sveltejs/kit";
import { v2 as cloudinary } from "cloudinary";

// const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const cloudinaryApiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
const cloudinaryCloudName = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME;

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret
});

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
      allImages: await placemarkService.getAllImages(session!),
      locationImages: await placemarkService.getLocationImages(locationId, session!)
    };
  }
};

export const actions: Actions = {
  deleteImage: async ({ request, cookies, url }) => {
    const placemarkUser = cookies.get("placemark-user") as string;
    // console.log("Full URL:", url.href);

    const imageId = url.searchParams.get("imageId");
    // console.log("This is the image id: ", imageId);

    if (!imageId) {
      console.error("Location ID not found in URL");
      return;
    }

    if (placemarkUser) {
      const user = JSON.parse(placemarkUser) as Session;
      placemarkService.deleteImage(imageId, user);
    }
  },

  addImage: async ({ request, cookies, url }) => {
    const placemarkUser = cookies.get("placemark-user") as string;
    const locationId = url.searchParams.get("locationId");
    if (!locationId) {
      console.error("Location ID not found in URL");
      return;
    }
    if (placemarkUser) {
      const user = JSON.parse(placemarkUser) as Session;
      const form = await request.formData();

      const imageUrl = form.get("imageUrl") as string;
      console.log("Retrieved imageUrl:", imageUrl);
      if (!imageUrl) {
        console.error("Image URL not uploaded");
        return;
      }
      const location = await placemarkService.getLocation(locationId, user);
      if (location) {
        const imageDeatils = {
          url: imageUrl,
          title: location.title,
          locationid: locationId
        };
        console.log(imageDeatils);
        await placemarkService.uploadImageToDatabase(imageDeatils, locationId, user);
        console.log(`You added an image to database titled ${imageDeatils.title} on URL : ${imageDeatils.url}`);
      }
    }
  }
};
