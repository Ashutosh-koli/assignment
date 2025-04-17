import { useCart } from "../context/CartContext";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.images[0]} alt={item.title} />
            <div className="item-info">
              <h4>{item.title}</h4>
              <p>
                ${item.price} × {item.quantity}
              </p>
              <p>
                <strong>Total:</strong> ${item.price * item.quantity}
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Grand Total: ${total.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
