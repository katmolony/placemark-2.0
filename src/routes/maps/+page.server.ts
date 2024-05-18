import { placemarkService } from "$lib/services/placemark-service";
import type { Session } from "$lib/types/placemark-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      locations: await placemarkService.getLocations(session!),
      businesses: await placemarkService.getBusinesses(session!)
    };
  }
};
