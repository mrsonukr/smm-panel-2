import React from "react";
import RegisterForm from "../components/SignupForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Signup = () => {
  return (
    <div>
      <Header />
      <section className="bg-sky-500 h-[90vh]  p-4">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Sign Up
        </h2>
        <RegisterForm />
      </section>
      <Footer />
    </div>
  );
};

export default Signup;
