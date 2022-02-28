import { FBauth } from "./firebase";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Matches from "./routes/Matches";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import Loader from "./components/Loader";

function AppRouter() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(FBauth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      {isLoading ? (
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
