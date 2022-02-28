import { auth } from "./firebase";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Matches from "./routes/Matches";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import Loader from "./components/Loader";

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
      {!isLoaded ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            {isLogin ? (
              <>
                <Route path="/matches/*" element={<Matches />} />
                <Route path="/" element={<Home />} />
              </>
            ) : (
              <Route path="/" element={<Auth />} />
            )}
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default AppRouter;
