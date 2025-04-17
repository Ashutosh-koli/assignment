import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CategoryProducts.css";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [categoryId]);

  return (
    <div className="category-products">
      <h2>Category Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.images[0]} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
            <a href={`/product/${product.id}`} className="details-link">
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
