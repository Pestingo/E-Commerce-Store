import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { products } from '../data/products';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const PaymentMethods = {
  CREDIT_CARD: 'credit_card',
  EFT: 'eft',
  PAYPAL: 'paypal',
  OZOW: 'ozow'
} as const;

type PaymentMethod = typeof PaymentMethods[keyof typeof PaymentMethods];

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart, setCart }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PaymentMethods.CREDIT_CARD);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });

  if (!isOpen) return null;

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      alert('Payment processed successfully! Order will be shipped soon.');
      setCart([]); // Clear cart after successful payment
      onClose();
      setIsCheckingOut(false);
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
              <button
                className="p-2 text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">Your cart is empty</p>
              ) : isCheckingOut ? (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={selectedPayment}
                      onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
                    >
                      <option value={PaymentMethods.CREDIT_CARD}>Credit Card</option>
                      <option value={PaymentMethods.EFT}>EFT</option>
                      <option value={PaymentMethods.PAYPAL}>PayPal</option>
                      <option value={PaymentMethods.OZOW}>Ozow</option>
                    </select>
                  </div>

                  {selectedPayment === PaymentMethods.CREDIT_CARD && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          value={paymentDetails.cardNumber}
                          onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={paymentDetails.expiryDate}
                            onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">CVV</label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={paymentDetails.name}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={paymentDetails.email}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
                  >
                    <CreditCard className="mr-2" size={20} />
                    Pay {formatPrice(total)}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => {
                    const product = products.find(p => p.id === item.id);
                    if (!product) return null;

                    return (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 text-gray-400 hover:text-gray-500"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="text-gray-600">{item.quantity}</span>
                          <button
                            className="p-1 text-gray-400 hover:text-gray-500"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                          <button
                            className="p-1 text-red-400 hover:text-red-500"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>{formatPrice(total)}</p>
              </div>
              {!isCheckingOut && cart.length > 0 && (
                <button
                  className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition"
                  onClick={() => setIsCheckingOut(true)}
                >
                  Proceed to Checkout
                </button>
              )}
              {isCheckingOut && (
                <button
                  className="w-full mt-2 bg-gray-200 text-gray-600 px-4 py-3 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => setIsCheckingOut(false)}
                >
                  Back to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;