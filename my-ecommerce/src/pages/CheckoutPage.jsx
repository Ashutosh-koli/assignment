import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderData = {
      userId: user ? user.uid : null,
      customer: form,
      items: cartItems,
      total,
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      clearCart();
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (submitted) {
    return (
      <div className="checkout-page">
        <h2>✅ Thank you for your order!</h2>
        <p>We’ll send confirmation to <strong>{form.email}</strong>.</p>
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
          {cartItems.map(item => (
            <li key={item.id}>
              {item.title} × {item.quantity} = ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p className="total">Total: ${total.toFixed(2)}</p>

        <button type="submit" className="submit-btn">Place Order</button>
      </form>
    </div>
  );
}
