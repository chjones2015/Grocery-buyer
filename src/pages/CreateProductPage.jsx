import { useState } from "react";
import CustomInput from "../components/Shared/CustomInput";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateProductPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const verifyInputs = (title, price, description, image) => {
    if (!title || !price || !description || !image) {
      toast.error("Please fill all the fields");
      return false;
    }
    if (price <= 0) {
      toast.error("Price should be greater than 0");
      return false;
    }
    return true;
  };

  const createProductHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const title = e.target.title.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const image = e.target.image.files[0];
    if (!verifyInputs(title, price, description, image)) {
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/products/new`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      // reset the form
      e.target.reset();

      setIsLoading(false);
    } catch (err) {
      toast.error(err.response.data.error);
      setIsLoading(false);
    }
  };
  return (
    <section className="px-4 py-14 lg:px-14 max-w-[70vw] mx-auto">
      <h1 className="text-3xl font-bold">Create a new Product</h1>
      <form
        onSubmit={createProductHandler}
        className="flex flex-col gap-3 my-6"
      >
        <CustomInput
          type="text"
          id="title"
          label="Product Title"
          className="w-full"
          placeholder="Enter the title of the product"
        />
        <CustomInput
          type="number"
          id="price"
          label="Product Price"
          className="w-full"
          placeholder="Enter the price of the product"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Product Description
          </label>
          <textarea
            name="description"
            id="description"
            className="border border-gray-300 bg-transparent rounded-md py-2 px-4 outline-none focus:ring-2 focus:ring-success focus:border-transparent h-36"
            placeholder="Enter the description of the product"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="image" className="font-medium">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="file-input file-input-bordered w-full"
          />
        </div>
        <button
          type="submit"
          className="btn btn-neutral w-full mt-2"
          disabled={isLoading}
        >
          Add Product
        </button>
      </form>
    </section>
  );
};

export default CreateProductPage;
