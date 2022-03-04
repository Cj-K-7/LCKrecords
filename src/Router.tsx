import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Admin from "./routes/Admin";
import Matches from "./routes/Matches";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./components/Loader";
import Header from "./components/Header";

function AppRouter() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setIsLoaded(true);
    });
  }, []);
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
      </Routes>
      </BrowserRouter>
      {/* {!isLoaded ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            {isLogin ? (
              <>
                <Route path="/admin" element={<Admin />} />
                <Route path="/matches/*" element={<Matches />} />
                <Route path="/" element={<Home />} />
              </>
            ) : (
              <Route path="/" element={<Auth />} />
            )}
          </Routes>
        </BrowserRouter>
      )} */}
    </>
  );
}

export default AppRouter;
