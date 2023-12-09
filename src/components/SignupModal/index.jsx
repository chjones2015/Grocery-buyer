import toast from "react-hot-toast";
import CustomInput from "../Shared/CustomInput";
import CustomModal from "../Shared/CustomModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { onLogin } from "../../features/authSlice";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SignupModal = ({ isOpen, onClose, onLoginClick }) => {
  const dsipatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signupHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/users/signup`,
        userData
      );
      const { user, token } = response.data;
      dsipatch(onLogin({ user, token }));
      toast.success("Signup successful");
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
          Create an account to get started
        </h1>
        <form onSubmit={signupHandler} className="flex flex-col gap-3 my-6">
          <CustomInput
            type="email"
            id="email"
            label="Email address"
            className="w-full"
            placeholder="example@gmail.com"
          />
          <div className="grid grid-cols-2 gap-3">
            <CustomInput
              type="text"
              id="firstName"
              label="First name"
              className="w-full"
              placeholder="John"
            />
            <CustomInput
              type="text"
              id="lastName"
              label="Last Name"
              className="w-full"
              placeholder="Doe"
            />
          </div>
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
            Signup
          </button>
        </form>
        <div className="mt-6 text-center flex flex-col gap-3">
          <p>
            Already have an account?{" "}
            <button
              className="text-blue-600 underline underline-offset-2 font-medium hover:text-blue-700"
              onClick={onLoginClick}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </CustomModal>
  );
};

export default SignupModal;
