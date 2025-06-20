import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Star, Award, Calendar } from 'lucide-react';
import { Nunny } from '../../types';
import StarRating from '../Common/StarRating';

const ClientDashboard: React.FC = () => {
  const [nunnies, setNunnies] = useState<Nunny[]>([]);
  const [filteredNunnies, setFilteredNunnies] = useState<Nunny[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterService, setFilterService] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'name'>('rating');

  // Mock nunnies data
  useEffect(() => {
    const mockNunnies: Nunny[] = [
      {
        id: '1',
        type: 'nunny',
        email: 'grace@example.com',
        firstName: 'Grace',
        lastName: 'Wanjiku',
        gender: 'female',
        idNumber: '12345678',
        region: 'Nairobi',
        county: 'Nairobi',
        isVerified: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        phoneNumber: '+254712345678',
        services: ['Babysitter', 'House Cleaning', 'Cooking'],
        ageRange: '26-35',
        rating: 4.8,
        reviewCount: 24,
        profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
      },
      {
        id: '2',
        type: 'nunny',
        email: 'mary@example.com',
        firstName: 'Mary',
        lastName: 'Akinyi',
        gender: 'female',
        idNumber: '87654321',
        region: 'Central',
        county: 'Kiambu',
        isVerified: true,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        phoneNumber: '+254723456789',
        services: ['House Cleaning', 'Laundry', 'General Cleaning'],
        ageRange: '36-45',
        rating: 4.9,
        reviewCount: 18,
        profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
      },
      {
        id: '3',
        type: 'nunny',
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Muthoni',
        gender: 'female',
        idNumber: '11223344',
        region: 'Nairobi',
        county: 'Nairobi',
        isVerified: true,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        phoneNumber: '+254734567890',
        services: ['Babysitter', 'Elderly Care', 'Cooking'],
        ageRange: '26-35',
        rating: 4.7,
        reviewCount: 31,
        profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
      },
      {
        id: '4',
        type: 'nunny',
        email: 'esther@example.com',
        firstName: 'Esther',
        lastName: 'Njeri',
        gender: 'female',
        idNumber: '22334455',
        region: 'Coastal',
        county: 'Mombasa',
        isVerified: true,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        phoneNumber: '+254745678901',
        services: ['House Cleaning', 'Cooking', 'Pet Care'],
        ageRange: '18-25',
        rating: 4.6,
        reviewCount: 14,
        profilePicture: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
      },
      {
        id: '5',
        type: 'nunny',
        email: 'faith@example.com',
        firstName: 'Faith',
        lastName: 'Wanjiru',
        gender: 'female',
        idNumber: '33445566',
        region: 'Western',
        county: 'Kakamega',
        isVerified: true,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        phoneNumber: '+254756789012',
        services: ['Babysitter', 'House Cleaning', 'Laundry', 'Gardening'],
        ageRange: '26-35',
        rating: 4.5,
        reviewCount: 9,
        profilePicture: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
      },
      {
        id: '6',
        type: 'nunny',
        email: 'susan@example.com',
        firstName: 'Susan',
        lastName: 'Kamau',
        gender: 'female',
        idNumber: '44556677',
        region: 'Central',
        county: 'Nyeri',
        isVerified: true,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        phoneNumber: '+254767890123',
        services: ['Elderly Care', 'Cooking', 'General Cleaning'],
        ageRange: '46-55',
        rating: 4.9,
        reviewCount: 22,
        profilePicture: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
      }
    ];
    
    setNunnies(mockNunnies);
    setFilteredNunnies(mockNunnies);
  }, []);

  // Filter and sort nunnies
  useEffect(() => {
    let filtered = nunnies.filter(nunny => {
      const matchesSearch = nunny.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nunny.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nunny.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           nunny.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nunny.county.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = !filterRegion || nunny.region === filterRegion;
      const matchesService = !filterService || nunny.services.includes(filterService);
      return matchesSearch && matchesRegion && matchesService;
    });

    // Sort nunnies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'name':
          return a.firstName.localeCompare(b.firstName);
        default:
          return 0;
      }
    });

    setFilteredNunnies(filtered);
  }, [nunnies, searchTerm, filterRegion, filterService, sortBy]);

  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const services = ['Babysitter', 'House Cleaning', 'Laundry', 'Cooking', 'General Cleaning', 'Elderly Care', 'Pet Care', 'Gardening'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Nunny</h1>
          <p className="text-gray-600">Browse verified service providers in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by name, service, or location..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                id="region"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
              >
                <option value="">All Regions</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Central">Central</option>
                <option value="Coastal">Coastal</option>
                <option value="Western">Western</option>
                <option value="Nyanza">Nyanza</option>
                <option value="Rift Valley">Rift Valley</option>
                <option value="North Eastern">North Eastern</option>
              </select>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                id="service"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
              >
                <option value="">All Services</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'newest' | 'name')}
              >
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Members</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{filteredNunnies.length}</p>
                <p className="text-gray-600">Available Nunnies</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {(nunnies.reduce((sum, nunny) => sum + (nunny.rating || 0), 0) / nunnies.length || 0).toFixed(1)}
                </p>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {nunnies.filter(nunny => nunny.isVerified).length}
                </p>
                <p className="text-gray-600">Verified Profiles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nunnies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNunnies.map((nunny) => (
            <div key={nunny.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      src={nunny.profilePicture || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'}
                      alt={`${nunny.firstName} ${nunny.lastName}`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {nunny.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <Award className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {nunny.firstName} {nunny.lastName}
                    </h3>
                    <div className="flex items-center mt-1">
                      <StarRating 
                        rating={nunny.rating || 0} 
                        size="sm" 
                        showNumber={false}
                      />
                      <span className="text-sm text-gray-500 ml-2">
                        ({nunny.reviewCount || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{nunny.county}, {nunny.region}</span>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Services Offered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {nunny.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <p><strong>Age Range:</strong> {nunny.ageRange}</p>
                  <p><strong>Member Since:</strong> {formatJoinDate(nunny.createdAt)}</p>
                </div>

                {/* Contact Info */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{nunny.phoneNumber}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{nunny.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Contact Nunny
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    View Full Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNunnies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Award className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No nunnies found</h3>
            <p className="text-gray-500">
              {searchTerm || filterRegion || filterService
                ? 'Try adjusting your search criteria or filters'
                : 'Check back later for new service providers'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;