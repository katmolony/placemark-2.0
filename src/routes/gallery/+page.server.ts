import { placemarkService } from "$lib/services/placemark-service";
import type { PageServerLoad } from "./$types";
import type { Session } from "$lib/types/placemark-types";
import type { Actions } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';

// // const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// const cloudinaryApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
// const cloudinaryApiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
// const cloudinaryCloudName = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME;


// cloudinary.config({
//     cloud_name: cloudinaryCloudName,
//     api_key: cloudinaryApiKey,
//     api_secret: cloudinaryApiSecret
//   });


export const load: PageServerLoad = async ({ parent, url }) => {
  const { session } = await parent();
  if (session) {
    return {
      allImages: await placemarkService.getAllImages(session!)
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
};
