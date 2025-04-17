import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🛍️ Shop</Link>

      <div className="nav-links">
        <Link to="/cart" className="cart-link">
        🛒<span className="cart-count">({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>

        </Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <span className="welcome">Hi, {user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
