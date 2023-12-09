import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/products/all`);
      const { products } = response.data;
      setProducts(products);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="px-4 py-14 lg:px-14">
      {!isLoading && (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.length > 0 &&
            products.map((product) => (
              <ProductCard
                key={product._id}
                title={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            ))}
        </div>
      )}
      {!isLoading && products?.length === 0 && (
        <div className="h-[70vh] flex items-center justify-center">
          <p className="text-gray-400 font-medium text-3xl italic text-center">
            No products found
          </p>
        </div>
      )}
      {isLoading && (
        <div className="h-[70vh] flex items-center justify-center">
          <span className="loading loading-infinity text-success loading-lg"></span>
        </div>
      )}
    </section>
  );
};

export default HomePage;
