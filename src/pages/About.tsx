import React from 'react';
import { ShoppingBag } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Pestingo Store
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Your premier destination for quality electronics and accessories
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Our Story</h3>
              <p className="mt-2 text-base text-gray-500">
                Founded in 2024, Pestingo Store has grown from a small local shop
                to a trusted online retailer. We're passionate about bringing you
                the latest technology at competitive prices.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Our Mission</h3>
              <p className="mt-2 text-base text-gray-500">
                We strive to provide our customers with high-quality products,
                exceptional service, and an enjoyable shopping experience. Your
                satisfaction is our top priority.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Our Promise</h3>
              <p className="mt-2 text-base text-gray-500">
                We guarantee authentic products, secure transactions, and reliable
                customer support. Shop with confidence knowing that we stand behind
                every product we sell.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-lg font-medium text-gray-900">Why Choose Us?</h3>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  ✓
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Quality Products
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  We carefully select each product to ensure it meets our high
                  standards of quality and performance.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  ✓
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Fast Shipping
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  We process orders quickly and partner with reliable courier
                  services for timely delivery.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  ✓
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Customer Support
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  Our dedicated support team is always ready to assist you with any
                  questions or concerns.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  ✓
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Secure Shopping
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  Shop with confidence knowing your personal and payment
                  information is protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;