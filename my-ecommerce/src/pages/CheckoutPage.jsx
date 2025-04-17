import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Optionally: Send to Firestore or another backend

    clearCart(); // Clear cart after order
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0 && !submitted) {
    return (
      <div className="checkout-page">
        <h2>Your cart is empty.</h2>
        <button onClick={() => navigate("/")}>Go Back to Shop</button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="checkout-page">
        <h2>✅ Thank you for your order!</h2>
        <p>
          We’ll send a confirmation to <strong>{form.email}</strong>.
        </p>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <h3>Order Summary</h3>
        <ul className="summary">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} × {item.quantity} = ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p className="total">Total: ${total.toFixed(2)}</p>

        <button type="submit" className="submit-btn">
          Place Order
        </button>
      </form>
    </div>
  );
}
