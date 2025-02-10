import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, ShoppingBag, User } from 'lucide-react';

// Import pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CartModal from './components/CartModal';
import ChatWidget from './components/ChatWidget';

// Create a context for authentication
export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<Array<{ id: number; quantity: number }>>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUser({ email });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCart([]); // Clear cart on logout
  };

  const addToCart = (productId: number) => {
    if (!isAuthenticated) {
      alert('Please sign in to add items to your cart');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <button
                    className="sm:hidden -ml-2 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                  <Link to="/" className="flex items-center">
                    <ShoppingBag className="h-8 w-8 text-indigo-600" />
                    <span className="ml-2 text-2xl font-bold text-gray-900">Pestingo Store</span>
                  </Link>
                </div>

                <nav className="hidden sm:flex space-x-8">
                  <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                  <Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link>
                  <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                  <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
                </nav>

                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Search size={20} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Heart size={20} />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-gray-900 relative"
                    onClick={() => isAuthenticated ? setIsCartOpen(true) : alert('Please sign in to view your cart')}
                  >
                    <ShoppingCart size={20} />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                  {isAuthenticated ? (
                    <div className="relative group">
                      <button className="p-2 text-gray-600 hover:text-gray-900 flex items-center">
                        <User size={20} />
                        <span className="ml-2">{user?.email}</span>
                      </button>
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                        <button
                          onClick={logout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Link to="/login" className="p-2 text-gray-600 hover:text-gray-900">
                      <User size={20} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden bg-white border-b">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/shop" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Shop</Link>
                <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">About</Link>
                <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Contact</Link>
                {!isAuthenticated && (
                  <Link to="/login" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Login</Link>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>

          {/* Cart Modal */}
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            setCart={setCart}
          />

          {/* Chat Widget */}
          <ChatWidget />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;