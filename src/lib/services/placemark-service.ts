import axios from "axios";
import type { Session, User } from "$lib/types/placemark-types";
import type { Location, Business, Review } from "$lib/types/placemark-types";

export const placemarkService = {
  baseUrl: "http://kates-macbook-air-2.local:4000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
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
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data.id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async addBusiness(business: Business, session: Session) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(this.baseUrl + "/api/locations/" + business.locationid + "/businesss", business);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  },

  async getLocations(session: Session): Promise<Location[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/locations");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getBusinesss(session: Session): Promise<Business[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/businesss");
      return response.data;
    } catch (error) {
      return [];
    }
  }  
};
