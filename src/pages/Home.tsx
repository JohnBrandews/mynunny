import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, DollarSign, Star, ArrowRight } from 'lucide-react';
import { ServiceOffer } from '../types';
import StarRating from '../components/Common/StarRating';

const Home: React.FC = () => {
  const [serviceOffers, setServiceOffers] = useState<ServiceOffer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');

  // Mock service offers data - in real app, this would come from API
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
        description: 'Need a babysitter for my 2 toddlers (ages 2 and 4). Looking for someone experienced and patient.',
        dailyRate: 2000,
        region: 'Nairobi',
        county: 'Nairobi',
        postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
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
        description: 'Weekly house cleaning service needed for a 3-bedroom house. Includes general cleaning and laundry.',
        dailyRate: 1500,
        region: 'Central',
        county: 'Kiambu',
        postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
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
        description: 'Looking for someone to help with elderly care and cooking for my grandmother. Must be compassionate and experienced.',
        dailyRate: 2500,
        region: 'Coastal',
        county: 'Mombasa',
        postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        isActive: true
      }
    ];
    
    setServiceOffers(mockOffers);
  }, []);

  const filteredOffers = serviceOffers.filter(offer => {
    const matchesSearch = offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.county.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !filterRegion || offer.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

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
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat h-96 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/6195086/pexels-photo-6195086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Trusted Household Help
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Connect with reliable service providers across Kenya for babysitting, cleaning, cooking, and more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/nunny/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Become a Nunny
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/client/register"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center"
            >
              Hire a Nunny
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Service Offers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Current Service Requests
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse the latest requests from clients across Kenya. Join as a Nunny to connect with these opportunities.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by service or location..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        </div>

        {/* Service Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {offer.description}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{offer.county}, {offer.region}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{formatTimeAgo(offer.postedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600 mr-1" />
                    <span className="text-xl font-bold text-green-600">
                      KSh {offer.dailyRate.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-1">/day</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Client Rating:</span>
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

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Client:</strong> {offer.client.firstName} {offer.client.lastName}
                  </p>
                  <Link
                    to="/nunny/register"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center inline-block"
                  >
                    Join to Contact Client
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No service offers found matching your criteria.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-blue-600 rounded-lg text-white p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of Kenyans already using My Nunny to connect with reliable household services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/nunny/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Become a Service Provider
            </Link>
            <Link
              to="/client/register"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Find Help for Your Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;