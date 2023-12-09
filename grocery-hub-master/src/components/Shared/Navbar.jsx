import { useState } from "react";
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../features/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(onLogout());
  };

  return (
    <>
      <div className="navbar bg-success text-white px-4 py-4 lg:px-14">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl xs:text-2xl">
            Grocery Hub
          </Link>
        </div>
        <div className="navbar-end">
          {!isLoggedIn && (
            <button
              className="btn w-28"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </button>
          )}
          {!isLoggedIn && (
            <button
              className="ml-3 btn btn-neutral w-28"
              onClick={() => setIsSignupModalOpen(true)}
            >
              Signup
            </button>
          )}
          {isLoggedIn && (
            <Link to="/create-product" className="btn btn-ghost">
              Create Product
            </Link>
          )}
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <div
                className="avatar placeholder m-1"
                tabIndex={0}
                role="button"
              >
                <div className="bg-neutral text-neutral-content rounded-full w-10 xs:w-12">
                  <span>
                    {user?.firstName?.charAt(0).toUpperCase() +
                      user?.lastName?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <ul className="dropdown-content z-[1] menu px-6 py-6 shadow bg-base-100 rounded-box min-w-max flex flex-col gap-3 text-black">
                <button className="border-b border-gray-300 pb-2 focus:outline-none">
                  Profile ({user?.firstName} {user?.lastName})
                </button>
                <Link
                  to="/create-product"
                  className="border-b border-gray-300 pb-2 focus:outline-none"
                >
                  Create Product
                </Link>
                <button
                  className="btn btn-neutral mr-2"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignupClick={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onLoginClick={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;
