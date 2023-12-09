import { useSelector } from "react-redux";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProductCard = ({ title, price, description, image }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="card bg-base-100 shadow-lg">
      <figure>
        <img
          src={`${BACKEND_URL}${image}`}
          alt={title}
          className="w-full h-56 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions">
          <button className="btn btn-neutral w-full" disabled={!isLoggedIn}>
            Buy Now - ${price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
