import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const ProductSection = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      setError("You are offline. Please check your internet connection.");
      setLoading(false);
      return;
    }

    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load products. Try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return (
      <div>
        <h3>Products</h3>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Products</h3>

      {user.isAnonymous && (
        <p style={{ color: "orange" }}>
          Login to unlock full product features
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <img src={product.image} alt={product.title} width="80" />
            <h4>{product.title}</h4>
            <p>₹ {product.price}</p>

            {!user.isAnonymous && <button>Add to Wishlist</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
