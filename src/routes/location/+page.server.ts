import { placemarkService } from "$lib/services/placemark-service";
import type { PageServerLoad } from "./$types";
import type { Session, BusinessCategories, AddressInfo } from "$lib/types/placemark-types";
import { generateApacheDailyLocationTemp } from "$lib/services/placemark-utils";
import { checkTemperatureTrend } from "$lib/services/placemark-analytics";

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
    const location = await placemarkService.getLocation(locationId, session!);
    const tempData = await placemarkService.getTemperaturesByCountry(location!);
    return {
      locationId,
      location,
      dailyTemp: generateApacheDailyLocationTemp(tempData),
      tempTrend: checkTemperatureTrend(tempData),
      businesses: await placemarkService.getLocationBusinesses(locationId, session!)
    };
  }
};

export const actions = {
  addBusiness: async ({ request, cookies, url }) => {
    const placemarkUser = cookies.get("placemark-user") as string;

    // Log the full URL for debugging
    console.log("Full URL:", url.href);

    // Extract the locationId parameter
    const locationId = url.searchParams.get("locationId");

    // Log the locationId for debugging
    console.log("This is the location id for business:", locationId);

    if (!locationId) {
      console.error("Location ID not found in URL");
      return;
    }
    if (placemarkUser) {
      const user = JSON.parse(placemarkUser) as Session;
      const form = await request.formData();

      // Validation
      if (!isValidTitle(form.get("title") as unknown as string)) {
        //   message = "Title can only be 30 letters or numbers";
        return;
      }
      if (!isValidCategory(form.get("category") as string)) {
        //   message = "Invalid category";
        return;
      }
      if (!isValidAddress(form.get("address") as string)) {
        //   message = "Invalid address";
        return;
      }
      if (!isValidDescription(form.get("description") as string)) {
        //   message = "Description can be up to 100 words";
        return;
      }

      //  Call function to collect address and coordinates
      const addressInfo = await getDisplayNameForAddress(form.get("address") as string);
      if (!addressInfo) {
        //   message = "Address not found";
        return;
      }
      const { displayName, lat, lon } = addressInfo;

      const business = {
        title: form.get("title") as unknown as string,
        category: form.get("category") as unknown as string,
        lat: lat,
        lng: lon,
        address: displayName,
        description: form.get("description") as unknown as string,
        locationid: locationId
      };
      //   console.log(business);
      placemarkService.addBusiness(business, locationId, user);
      console.log(`You added ${business.title}`);
    }
  }
};

async function getDisplayNameForAddress(address: string): Promise<AddressInfo | null> {
  try {
    // console.log("entering address");
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`);
    // console.log(response);
    const data = await response.json();
    if (data.length > 0) {
      const displayName = data[0].display_name;
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      return { displayName, lat, lon };
    } else {
      // Address not found
      return null;
    }
  } catch (error) {
    console.error("Error validating address:", error);
    return null;
  }
}

// Validation functions
function isValidTitle(title: string): boolean {
  const titleRegex = /^[a-zA-Z0-9\s]{1,30}$/;
  return titleRegex.test(title);
}

const BusinessCategories = [{ category: "Accommodation" }, { category: "Dining" }, { category: "Shopping" }, { category: "Nightlife" }, { category: "Activities" }];

function isValidCategory(category: string): boolean {
  return BusinessCategories.some((cat) => cat.category === category);
}

async function isValidAddress(address: string): Promise<boolean> {
  if (!address.trim()) {
    return false; // Address is empty
  }
  try {
    console.log("entering address");
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`);
    // console.log(response);
    const data = await response.json();
    if (data.length > 0) {
      // Address is valid
      return true;
    } else {
      // Address is invalid
      return false;
    }
  } catch (error) {
    console.error("Error validating address:", error);
    return false;
  }
}

function isValidDescription(description: string): boolean {
  if (!description.trim()) {
    return false;
  }
  const wordCount = description.split(/\s+/).length;
  return wordCount <= 100;
}
