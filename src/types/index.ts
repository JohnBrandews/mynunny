export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  profilePicture?: string;
  idNumber: string;
  idImage?: string;
  region: string;
  county: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Nunny extends User {
  type: 'nunny';
  phoneNumber: string;
  services: string[];
  ageRange: string;
  rating?: number;
  reviewCount?: number;
}

export interface Client extends User {
  type: 'client';
  serviceDescription: string;
  dailyRate: number;
  rating?: number;
  reviewCount?: number;
}

export interface ServiceOffer {
  id: string;
  clientId: string;
  client: Client;
  description: string;
  dailyRate: number;
  region: string;
  county: string;
  postedAt: Date;
  isActive: boolean;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export const KENYAN_REGIONS = {
  'Western': ['Kakamega', 'Vihiga', 'Bungoma', 'Busia'],
  'Nyanza': ['Kisumu', 'Siaya', 'Kisii', 'Nyamira', 'Homa Bay', 'Migori'],
  'Rift Valley': ['Nakuru', 'Uasin Gishu', 'Trans Nzoia', 'Turkana', 'West Pokot', 'Samburu', 'Baringo', 'Laikipia', 'Nandi', 'Kericho', 'Bomet', 'Kajiado', 'Narok'],
  'Nairobi': ['Nairobi'],
  'Central': ['Kiambu', 'Murang\'a', 'Nyeri', 'Kirinyaga', 'Nyandarua'],
  'Coastal': ['Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta'],
  'North Eastern': ['Garissa', 'Wajir', 'Mandera']
};

export const SERVICES = [
  'Babysitter',
  'House Cleaning', 
  'Laundry',
  'Cooking',
  'General Cleaning',
  'Elderly Care',
  'Pet Care',
  'Gardening'
];

export const AGE_RANGES = [
  '18-25',
  '26-35', 
  '36-45',
  '46-55',
  '55+'
];