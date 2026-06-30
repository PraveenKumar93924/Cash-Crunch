import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import { NavBar } from "./components";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PasskeyGenerator from "./components/PasskeyGenerator";
import Payments from "./components/Payments";
import Profile from "./pages/Profile";
import OnlinePayment from "./components/OnlinePayment";
import TransactionsPage from './pages/TransactionsPage';

const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3500}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
        toastClassName="max-[480px]:w-[250px] sm:w-[22rem] rounded-lg text-sm sm:text-base font-outfit max-[480px]:top-0 max-[480px]:left-[calc(50%-125px)]"
      />
      <div className="h-full w-full px-8 lg:px-20 bg-gradient-to-tr from-green-200 to-white">
        <NavBar />
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/passkey" element={<PasskeyGenerator />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/online-payment" element={<OnlinePayment />} />
            <Route path="/transactions" element={<TransactionsPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
