import { placemarkService } from "$lib/services/placemark-service";
import type { Session, LocationInfo } from "$lib/types/placemark-types";
import type { PageServerLoad } from "./$types";
import { generateByLocationTemp, generateBusinessesPerLocation,  } from "$lib/services/placemark-utils";
import { browser } from '$app/environment';

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    const locations = await placemarkService.getLocations(session);
    const businesses = await placemarkService.getBusinesses(session);
    return {
      locations: await placemarkService.getLocations(session!),
      businesses: await placemarkService.getBusinesses(session!),
      // Graphs
      topTemps: generateByLocationTemp(locations),
      totalBusinessPerLocation: generateBusinessesPerLocation(locations, businesses)
    };
  }
};

async function getLocationInfo(title: string): Promise<LocationInfo | null> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(title)}&format=json&addressdetails=1&limit=1`, {
      headers: {
        'accept-language': 'en-US,en;q=0.9' // Get in english
      }
    });
    const data = await response.json();

    if (data && data.length > 0) {
      const address = data[0].address;
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      if (address && address.country) {
        return { country: address.country, lat: lat, lon: lon };
      }
    }
  } catch (error) {
    console.error("Error retrieving location information:", error);
  }
  return null;
}

export const actions = {
  addLocation: async ({ request, cookies }) => {
    const placemarkUser = cookies.get("placemark-user") as string;
    if (placemarkUser) {
      const user = JSON.parse(placemarkUser) as Session;
      const form = await request.formData();

      const LocationInfo = await getLocationInfo(form.get("title") as unknown as string);
      if (LocationInfo == null) {
        //  message = "Country not found";
        return;
      }
      const { country, lat, lon } = LocationInfo;

      const location = {
        title: country,
        imageURL: "https://", //could run a bug
        lat: lat,
        lng: lon,
        temp: form.get("temp") as unknown as number,
        weather: form.get("weather") as string,
        userid: user._id
        //   _id: ""
      };
      placemarkService.addLocation(location, user);
    }
  }
};

