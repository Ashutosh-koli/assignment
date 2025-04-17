import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="product-card">
        <img src={product.images[0]} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </Link>
  );
}
