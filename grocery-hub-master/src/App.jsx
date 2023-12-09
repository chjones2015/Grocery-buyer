import { useEffect } from "react";
import Navbar from "./components/Shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "./features/authSlice";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // fetch the user data from the local storage and set it in the redux store
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    if (user && token) {
      // dispatch the action to set the user and token in the redux store
      dispatch(onLogin({ user, token }));
    } else {
      // dispatch the action to remove the user and token from the redux store
      dispatch(onLogout());
    }
  }, [dispatch]);
  return (
    <main>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isLoggedIn && (
          <Route path="/create-product" element={<CreateProductPage />} />
        )}
      </Routes>
    </main>
  );
}

export default App;
