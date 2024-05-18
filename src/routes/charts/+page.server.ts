import { placemarkService } from "$lib/services/placemark-service";
import { generateByLocationTemp, generateBusinessesPerLocation,  } from "$lib/services/placemark-utils";
import type { Session } from "$lib/types/placemark-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const { session } = await parent();
    if (session) {
    const locations = await placemarkService.getLocations(session);
    const businesses = await placemarkService.getBusinesses(session);
    return {
      topTemps: generateByLocationTemp(locations),
      totalBusinessPerLocation: generateBusinessesPerLocation(locations, businesses)
    };
  }
};