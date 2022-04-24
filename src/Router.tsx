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
import { RootState } from "./redux-store/store";
import { authStateToggle } from "./redux-store/slices/loginSlice";
import Test from "./routes/Test";

function AppRouter() {
  const isLogedIn = useSelector((state: RootState) => state.loginStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    //auth를 통해 auth 상태 확인, user 가 있냐 없냐에 따라 전역 state 변경.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authStateToggle(true));
      } else {
        dispatch(authStateToggle(false));
      }
    });
  }, []);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        {isLogedIn ? (
          <>
            <Route path="/test" element={<Test />} />
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
