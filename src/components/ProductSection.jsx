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
    return (
      <p className="text-sm text-gray-400">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-100">
          Products
        </h3>
        <p className="text-red-400 text-sm">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-100">
          Products
        </h3>

        {user.isAnonymous && (
          <p className="text-orange-400 text-sm">
            Login to unlock full product features
          </p>
        )}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="
              rounded-xl
              bg-slate-800
              border border-slate-700
              p-5
              transition
              hover:border-slate-600
              hover:shadow-md
            "
          >
            {/* IMAGE */}
            <div className="flex justify-center mb-4 bg-slate-900 rounded-lg p-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-28 object-contain"
              />
            </div>

            {/* TITLE */}
            <h4 className="text-sm font-medium text-gray-200 mb-1 line-clamp-2">
              {product.title}
            </h4>

            {/* PRICE */}
            <p className="text-sm font-semibold text-gray-300 mb-4">
              ₹ {product.price}
            </p>

            {/* ACTION */}
            {!user.isAnonymous && (
              <button
                className="
                  w-full
                  py-2
                  rounded-md
                  bg-blue-600
                  text-white
                  hover:bg-blue-500
                  active:scale-95
                  transition
                "
              >
                Add to Wishlist
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
