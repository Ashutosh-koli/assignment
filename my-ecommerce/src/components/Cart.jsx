import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart">
      <h3>Your Cart</h3>
      {cartItems.length === 0 && <p>No items yet.</p>}
      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.images[0]} alt={item.title} />
          <div>
            <p>{item.title}</p>
            <p>${item.price} x {item.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
