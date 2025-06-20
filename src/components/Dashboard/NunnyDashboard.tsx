import React, { useState, useEffect } from 'react';
import { MapPin, DollarSign, Clock, Phone, Mail, Star } from 'lucide-react';
import { ServiceOffer } from '../../types';
import StarRating from '../Common/StarRating';

const NunnyDashboard: React.FC = () => {
  const [serviceOffers, setServiceOffers] = useState<ServiceOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<ServiceOffer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'highest_pay' | 'rating'>('newest');

  // Mock service offers data
  useEffect(() => {
    const mockOffers: ServiceOffer[] = [
      {
        id: '1',
        clientId: 'client1',
        client: {
          id: 'client1',
          type: 'client',
          email: 'jane@example.com',
          firstName: 'Jane',
          lastName: 'Doe',
          gender: 'female',
          idNumber: '12345678',
          region: 'Nairobi',
          county: 'Nairobi',
          isVerified: true,
          createdAt: new Date(),
          serviceDescription: 'Need a babysitter for my 2 toddlers',
          dailyRate: 2000,
          rating: 4.5,
          reviewCount: 12
        },
        description: 'Need a babysitter for my 2 toddlers (ages 2 and 4). Looking for someone experienced and patient. Must be available Monday to Friday, 8 AM to 6 PM.',
        dailyRate: 2000,
        region: 'Nairobi',
        county: 'Nairobi',
        postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isActive: true
      },
      {
        id: '2',
        clientId: 'client2',
        client: {
          id: 'client2',
          type: 'client',
          email: 'john@example.com',
          firstName: 'John',
          lastName: 'Smith',
          gender: 'male',
          idNumber: '87654321',
          region: 'Central',
          county: 'Kiambu',
          isVerified: true,
          createdAt: new Date(),
          serviceDescription: 'Weekly house cleaning service needed',
          dailyRate: 1500,
          rating: 4.8,
          reviewCount: 8
        },
        description: 'Weekly house cleaning service needed for a 3-bedroom house. Includes general cleaning, laundry, and organizing. Flexible schedule.',
        dailyRate: 1500,
        region: 'Central',
        county: 'Kiambu',
        postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        isActive: true
      },
      {
        id: '3',
        clientId: 'client3',
        client: {
          id: 'client3',
          type: 'client',
          email: 'mary@example.com',
          firstName: 'Mary',
          lastName: 'Johnson',
          gender: 'female',
          idNumber: '11223344',
          region: 'Coastal',
          county: 'Mombasa',
          isVerified: true,
          createdAt: new Date(),
          serviceDescription: 'Elderly care and cooking assistance',
          dailyRate: 2500,
          rating: 5.0,
          reviewCount: 5
        },
        description: 'Looking for someone to help with elderly care and cooking. Must be compassionate, patient, and experienced with elderly care.',
        dailyRate: 2500,
        region: 'Coastal',
        county: 'Mombasa',
        postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isActive: true
      },
      {
        id: '4',
        clientId: 'client4',
        client: {
          id: 'client4',
          type: 'client',
          email: 'peter@example.com',
          firstName: 'Peter',
          lastName: 'Kimani',
          gender: 'male',
          idNumber: '22334455',
          region: 'Nairobi',
          county: 'Nairobi',
          isVerified: true,
          createdAt: new Date(),
          serviceDescription: 'Daily cooking and light cleaning',
          dailyRate: 1800,
          rating: 4.2,
          reviewCount: 15
        },
        description: 'Need help with daily cooking and light cleaning. Must be skilled in Kenyan cuisine and available Monday to Saturday.',
        dailyRate: 1800,
        region: 'Nairobi',
        county: 'Nairobi',
        postedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        isActive: true
      }
    ];
    
    setServiceOffers(mockOffers);
    setFilteredOffers(mockOffers);
  }, []);

  // Filter and sort offers
  useEffect(() => {
    let filtered = serviceOffers.filter(offer => {
      const matchesSearch = offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           offer.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           offer.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           offer.client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           offer.client.lastName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = !filterRegion || offer.region === filterRegion;
      return matchesSearch && matchesRegion;
    });

    // Sort offers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'highest_pay':
          return b.dailyRate - a.dailyRate;
        case 'rating':
          return (b.client.rating || 0) - (a.client.rating || 0);
        case 'newest':
        default:
          return b.postedAt.getTime() - a.postedAt.getTime();
      }
    });

    setFilteredOffers(filtered);
  }, [serviceOffers, searchTerm, filterRegion, sortBy]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Opportunities</h1>
          <p className="text-gray-600">Browse client requests and find the perfect job for you</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by service, location, or client..."
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
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'highest_pay' | 'rating')}
              >
                <option value="newest">Newest First</option>
                <option value="highest_pay">Highest Pay</option>
                <option value="rating">Highest Client Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  KSh {Math.round(serviceOffers.reduce((sum, offer) => sum + offer.dailyRate, 0) / serviceOffers.length || 0).toLocaleString()}
                </p>
                <p className="text-gray-600">Average Daily Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{filteredOffers.length}</p>
                <p className="text-gray-600">Available Jobs</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {(serviceOffers.reduce((sum, offer) => sum + (offer.client.rating || 0), 0) / serviceOffers.length || 0).toFixed(1)}
                </p>
                <p className="text-gray-600">Avg Client Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Offer Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                      <span className="text-sm text-gray-500">{formatTimeAgo(offer.postedAt)}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {offer.description}
                    </h3>
                  </div>
                </div>

                {/* Location and Rate */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{offer.county}, {offer.region}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <DollarSign className="h-5 w-5 mr-1" />
                    <span className="text-xl font-bold">KSh {offer.dailyRate.toLocaleString()}</span>
                    <span className="text-gray-500 ml-1">/day</span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Client Information</h4>
                    <div className="flex items-center">
                      <StarRating 
                        rating={offer.client.rating || 0} 
                        size="sm" 
                        showNumber={false}
                      />
                      <span className="text-sm text-gray-500 ml-1">
                        ({offer.client.reviewCount || 0})
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Name:</strong> {offer.client.firstName} {offer.client.lastName}
                    </p>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{offer.client.email}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Contact Client
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Clock className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-500">
              {searchTerm || filterRegion 
                ? 'Try adjusting your search criteria or filters'
                : 'Check back later for new client requests'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NunnyDashboard;