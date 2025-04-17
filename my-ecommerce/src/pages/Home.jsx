import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <main className="home-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}
