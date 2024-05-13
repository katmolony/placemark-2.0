import type { Location, Business, DataSet } from "$lib/types/placemark-types";

export function generateByLocationTemp(locationList: Location[]): DataSet {
  const topTemps: DataSet = {
    labels: ["", "", ""],
    datasets: [
      {
        values: [0, 0, 0]
      }
    ]
  };

  // Sort locations by temp in descending order
  const sortedLocations = locationList.sort((a, b) => b.temp - a.temp);
  sortedLocations.slice(0, 3).forEach((location, index) => {
    topTemps.datasets[0].values[index] = location.temp;
    topTemps.labels[index] = location.title;
  });

  return topTemps;
}

export function generateBusinessesPerLocation(locations: Location[], businessList: Business[]): DataSet {
  const totalBusinessPerLocation: DataSet = {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  };
  // for totalBusinessPerLocation
  totalBusinessPerLocation.labels = [];
  locations.forEach((location) => {
    totalBusinessPerLocation.labels.push(`${location.title}`);
    totalBusinessPerLocation.datasets[0].values.push(0);
  });
  locations.forEach((location, i) => {
    businessList.forEach((business) => {
      if (business.locationid == location._id) {
        totalBusinessPerLocation.datasets[0].values[i] += 1;
      }
    });
  });

  return totalBusinessPerLocation;
}
