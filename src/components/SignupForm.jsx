import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "", confirmPassword: "", general: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
      // Clear phone error when user starts typing
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: "" }));
      }
    }
  };

  const clearMessages = () => {
    setErrors({ phone: "", password: "", confirmPassword: "", general: "" });
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    let valid = true;
    const newErrors = { phone: "", password: "", confirmPassword: "", general: "" };

    // Validation checks
    if (!phone || phone.length !== 10) {
      newErrors.phone = "Enter valid 10-digit phone number";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("https://auth-worker.mssonukr.workers.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `+91${phone}`,
          password,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok && data.success) {
        // Success case
        localStorage.setItem("token", data.token);
        setSuccessMessage(data.message || "Registration successful!");
        
        // Navigate after a short delay to show success message
        setTimeout(() => {
          navigate("/user/dashboard");
        }, 1500);
      } else {
        // Error case - handle different types of errors
        if (response.status === 409) {
          setErrors(prev => ({ ...prev, phone: data.error || "Phone number already registered" }));
        } else if (response.status === 400) {
          // Handle validation errors from server
          if (data.error.includes("phone")) {
            setErrors(prev => ({ ...prev, phone: data.error }));
          } else if (data.error.includes("password")) {
            setErrors(prev => ({ ...prev, password: data.error }));
          } else {
            setErrors(prev => ({ ...prev, general: data.error }));
          }
        } else if (response.status === 429) {
          setErrors(prev => ({ ...prev, general: "Too many requests. Please try again later." }));
        } else {
          setErrors(prev => ({ ...prev, general: data.error || "Registration failed. Please try again." }));
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.name === "AbortError") {
        setErrors(prev => ({
          ...prev,
          general: "Request timed out. Please check your connection and try again.",
        }));
      } else if (error.name === "TypeError" && error.message.includes("fetch")) {
        setErrors(prev => ({
          ...prev,
          general: "Network error. Please check your internet connection.",
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: "Registration failed. Please try again.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden text-slate-800 shadow-orange-all rounded-3xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 w-full relative z-10 mx-auto"
      >
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <p className="text-sm font-medium">{successMessage}</p>
          </div>
        )}

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="text-sm font-medium">{errors.general}</p>
          </div>
        )}

        <h2 className="text-base font-semibold mb-2">Mobile Number</h2>
        <div className="relative">
          <span className="absolute left-3 top-2 text-black">+91</span>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            className={`w-full p-2 pl-12 rounded-md mb-1 bg-sky-100 text-black focus:outline-none ${
              errors.phone ? "border-2 border-red-400" : ""
            }`}
            placeholder="Enter your mobile number"
            maxLength={10}
            disabled={isLoading}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm mb-2 font-medium">{errors.phone}</p>
        )}

        <h2 className="text-base font-semibold mb-2 mt-4">Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            // Clear password error when user starts typing
            if (errors.password) {
              setErrors(prev => ({ ...prev, password: "" }));
            }
          }}
          className={`w-full p-2 px-4 rounded-md mb-1 bg-sky-100 text-black focus:outline-none ${
            errors.password ? "border-2 border-red-400" : ""
          }`}
          placeholder="Enter your password"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2 font-medium">{errors.password}</p>
        )}

        <h2 className="text-base font-semibold mb-2 mt-4">Confirm Password</h2>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            // Clear confirm password error when user starts typing
            if (errors.confirmPassword) {
              setErrors(prev => ({ ...prev, confirmPassword: "" }));
            }
          }}
          className={`w-full p-2 px-4 rounded-md mb-1 bg-sky-100 text-black focus:outline-none ${
            errors.confirmPassword ? "border-2 border-red-400" : ""
          }`}
          placeholder="Confirm your password"
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-4 font-medium">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className={`w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-md transition duration-200 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing up...
            </span>
          ) : (
            "Sign up"
          )}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}