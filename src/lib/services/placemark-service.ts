import axios from "axios";
import type { Session, User } from "$lib/types/placemark-types";
import type { Location, Business, Review, Image } from "$lib/types/placemark-types";

export const placemarkService = {
  baseUrl: "http://kates-macbook-air-2.local:4000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      if (response.status == 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      console.log(response);
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        console.log(response);
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data.id
        };
        console.log(session._id);
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // async getUserId(session: Session): Promise<User | null> {
  //   try {
  //     axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
  //     const response = await axios.get(this.baseUrl + "/api/users/" + user);
  //     return response.data;
  //   } catch (error) {
  //     return null;
  //   }
  // },

  async addLocation(location: Location, session: Session) {
    try {
      console.log("adding location");
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(this.baseUrl + "/api/locations", location);
      // console.log(response);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  },

  async addBusiness(business: Business, locationId: string, session: Session) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(this.baseUrl + "/api/locations/" + locationId + "/businesss", business);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  },

  // Find all for listing locations
  async getLocations(session: Session): Promise<Location[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/locations");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  // Find one location for individual location page
  async getLocation(id: string, session: Session): Promise<Location | null> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/locations/" + id);
      // console.log(response);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  // To get all businesses
  async getBusinesses(session: Session): Promise<Business[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/businesss");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getLocationBusinesses(id: string, session: Session): Promise<Business[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/locations/" + id + "/businesss");
      console.log(response);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getLocationImages(id: string, session: Session): Promise<Image[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/locations/" + id + "/images");
      console.log(response);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  // To get all images
  async getAllImages(session: Session): Promise<Image[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/images");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async deleteImage(id: string, session: Session) {
    try {
      console.log("deleting image");
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.delete(this.baseUrl + "/api/images/" + id);
      // console.log(response);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  }
};
