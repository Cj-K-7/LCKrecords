import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Admin from "./routes/Admin";
import Matches from "./routes/Matches";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/Layouts/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState, toggle } from "./store";

function AppRouter() {
  const isLogedIn = useSelector((state: RootState) => state.loginStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(toggle(true));
      } else {
        dispatch(toggle(false));
      }
    });
  }, []);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        {isLogedIn ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/matches/*" element={<Matches />} />
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
