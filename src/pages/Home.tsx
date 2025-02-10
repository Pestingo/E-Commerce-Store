import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../App';

interface HomeProps {
  addToCart: (productId: number) => void;
}

const Home: React.FC<HomeProps> = ({ addToCart }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    if (!isAuthenticated) {
      navigate('/signup');
    } else {
      navigate('/shop');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Hero"
          className="w-full h-[500px] object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Pestingo Store</h1>
            <p className="text-xl mb-8">Discover our curated collection of premium products</p>
            <button
              onClick={handleShopNowClick}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;