import CustomModal from "../Shared/CustomModal";
import CustomInput from "../Shared/CustomInput";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { onLogin } from "../../features/authSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginModal = ({ isOpen, onClose, onSignupClick }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/users/login`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      const { user, token } = response.data;
      dispatch(onLogin({ user, token }));
      toast.success("Login successful");
      onClose();
      setIsLoading(false);
    } catch (err) {
      toast.error(err.response.data.error);
      setIsLoading(false);
    }
  };
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="mt-8 min-w-[30vw]">
        <h1 className="text-2xl font-semibold">
          To login, enter your email address
        </h1>
        <form onSubmit={loginHandler} className="flex flex-col gap-3 my-6">
          <CustomInput
            type="email"
            id="email"
            label="Email address"
            className="w-full"
            placeholder="example@gmail.com"
          />
          <CustomInput
            type="password"
            id="password"
            label="Password"
            className="w-full"
            placeholder="John!@#123"
          />
          <button
            type="submit"
            className="btn btn-neutral w-full mt-2"
            disabled={isLoading}
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center flex flex-col gap-3">
          <p>
            New to AskDoc?{" "}
            <button
              className="text-blue-600 underline underline-offset-2 font-medium hover:text-blue-700"
              onClick={onSignupClick}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </CustomModal>
  );
};

export default LoginModal;
