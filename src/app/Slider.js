import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Slider = ({ cartItems, removeFromCart, isOpen, toggleSlider }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  const [paid, setPaid] = useState(false);

  const handleApprove = (orderID) => {
    setPaid(true);
    alert("Payment successful! Order ID: " + orderID);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[350px] md:w-[400px] h-full bg-white shadow-2xl p-6 transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={toggleSlider} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
        ✖
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <img src={item.image} width={50} height={50} alt={item.name} className="rounded-md" />
              <div className="flex-1 ml-3">
                <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="absolute bottom-6 left-0 w-full px-6">
          <hr className="mb-3 border-gray-300" />
          <div className="flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>

          <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPrice,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handleApprove(details.id);
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </div>
  );
};

export default Slider;
