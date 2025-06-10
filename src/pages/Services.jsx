import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import FeatureCard from '../components/FeatureCard';
import servicesData from '../data/services.json';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all services from all categories
  const allServices = useMemo(() => {
    return servicesData.categories.flatMap(category => 
      category.services.map(service => ({
        ...service,
        categoryName: category.name
      }))
    );
  }, []);

  // Filter services based on category and search term
  const filteredServices = useMemo(() => {
    let services = allServices;

    // Filter by category
    if (activeCategory !== null) {
      const selectedCategory = servicesData.categories.find(cat => cat.id === activeCategory);
      if (selectedCategory) {
        services = selectedCategory.services.map(service => ({
          ...service,
          categoryName: selectedCategory.name
        }));
      }
    }

    // Filter by search term
    if (searchTerm) {
      services = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return services;
  }, [allServices, activeCategory, searchTerm]);

  const handleOrder = (service) => {
    // Handle order logic here
    console.log('Ordering service:', service);
    alert(`Ordering ${service.name} - $${service.price} per 1000`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium SMM Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Boost your social media presence with our high-quality services
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ High Quality</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Fast Delivery</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ 24/7 Support</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Secure Payment</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg">
              Choose from our wide range of social media marketing services
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          {/* Category Filter */}
          <CategoryFilter
            categories={servicesData.categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onOrder={handleOrder}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No services found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Results Count */}
          {filteredServices.length > 0 && (
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                {activeCategory && (
                  <span> in {servicesData.categories.find(cat => cat.id === activeCategory)?.name}</span>
                )}
                {searchTerm && (
                  <span> matching "{searchTerm}"</span>
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;