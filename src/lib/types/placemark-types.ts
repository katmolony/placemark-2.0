export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  //_id?: string;
}

export interface Location {
  title: string;
  imageURL: string;
  lat: number;
  lng: number;
  temp: number;
  weather: string;
  userid: User | string; // how to get this
 // _id: string;
}

export type BusinessCategories = "Accommodation" | "Dining" | "Shopping" | "Nightlife" | "Activities";

export interface Business {
  title: string;
  address: string;
  description: string;
  lat: number;
  lng: number;
  category: BusinessCategories[];
  locationid: Location | string;
  reviews: Review[];
 // _id: string;
}

export interface Review extends Document {
  content: string;
  rating: number;
  businessid: Business| string;
  userid: User| string;
  createdAt: Date;
  updatedAt: Date;
  timestamp: string;
}
