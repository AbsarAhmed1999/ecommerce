"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../globals.css";
import { useRouter } from "next/navigation";
import { JwtAuthService } from "../utils/jwt-service";
import CircularIndeterminate from "@/Components/Loading";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/User";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Swal from "sweetalert2";
import "./login.css";
import BackButton from "@/Components/BackButton/BackButton";
import { useAuthCheck } from "../Auth/useAuthCheck";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}
interface LoginValues {
  email: string;
  password: string;
}

export default function Login() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, authenticated } = useAuthCheck(false); // No redirect if token is missing

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const showLoginFailureAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password. Please try again.",
      toast: true, // Use toast-style alert for non-blocking notifications
      position: "top-end", // Position of the toast
      timer: 3000, // Auto-close after 3 seconds
      showConfirmButton: false, // Hide confirm button for toast
      customClass: {
        container: "custom-swal-container-error", // Custom class for container
        popup: "custom-swal-popup-error", // Custom class for popup
        title: "custom-swal-title-error", // Custom class for title
      },
    });
  };

  const showLoginSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: "You have been successfully logged in.",
      toast: true, // Use toast-style alert for non-blocking notifications
      position: "top-end", // Position of the toast
      timer: 3500, // Auto-close after 3 seconds
      showConfirmButton: false, // Hide confirm button for toast
      customClass: {
        container: "custom-swal-container", // Custom container class
        title: "custom-swal-title", // Custom title class
        popup: "custom-swal-popup", // Custom popup class for overall styling
        closeButton: "custom-swal-close-button", // Custom close button class
      },
    }).then(() => {
      setInitialLoading(true); // Show loader before redirect
      setRedirecting(true); // Start redirect process
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000); // Short delay to show loader
    });
  };
  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    const { email, password } = values;
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("After login Am I getting ID? ", result);
      if (response.ok) {
        showLoginSuccessAlert();
        console.log("RESULT > ", result);
        dispatch(setUser(result));
      } else {
        console.log("Login failed");
        showLoginFailureAlert();
      }
    } catch (e) {
      console.log("An Error Occurred during login ", e);
    } finally {
      setSubmitting(false);
    }
  };
  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularIndeterminate />
      </div>
    );
  }
  if (authenticated) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div
      className="min-h-screen flex items-center  "
      style={{ backgroundColor: "#262054 " }}
    >
      <BackButton className="mb-4 absolute top-10 left-10" push="/">
        Go Back
      </BackButton>
      {/* Circles positioned absolutely */}
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 flex flex-col items-center space-y-8">
        {/* Circle with gradient 1 */}
        <div
          className="absolute bottom-[100px] w-32 h-32 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Gradient from coral to light peach
            boxShadow: `
            0 0 15px rgba(255, 165, 0, 0.6), 
            0 0 30px rgba(255, 165, 0, 0.4), 
            0 0 60px rgba(255, 165, 0, 0.2)
          `,
          }}
        ></div>

        {/* Circle with gradient 2 */}
        <div
          className="absolute  top-0 w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #00aaff, #004e92)", // Gradient from light blue to dark blue
            boxShadow: `
            0 0 15px rgba(0, 170, 255, 0.6), 
            0 0 30px rgba(0, 170, 255, 0.4), 
            0 0 60px rgba(0, 170, 255, 0.2)
          `,
          }}
        ></div>

        {/* Circle with gradient 3 */}
        <div
          className="absolute left-28 bottom-[-60px] w-40 h-40 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #7F00FF, #E100FF)",
          }}
        ></div>
      </div>
      <div>
        <img src="./line.png" className="ml-[620px]" />
      </div>

      <div
        className="absolute right-72 w-96 h-auto p-5 rounded-lg "
        style={{ backgroundColor: "#262054" }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold mb-4 ml-16 text-white">LOGIN</h1>
          <img src="./login-logo.png" className="w-40 ml-10" />
          {/* Login Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex flex-col gap-1 mb-4">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    className="p-2 border border-white rounded-full placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 font-bold text-base"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    className="p-2 border border-white rounded-full placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 font-bold text-base "
                  />
                </div>
                <button className=" text-white hover:underline focus:outline-none hover:text-blue-700 mt-3">
                  <Link href={"/forgot-password"} legacyBehavior>
                    <a> Forgot password ?</a>
                  </Link>
                </button>
                <button
                  type="submit"
                  className="w-80 mt-4 p-2 px-4 bg-pink-500 border border-white rounded-full text-white font-semibold text-lg hover:bg-pink-400 "
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          <Link href="/register" passHref>
            {" "}
            <a className="text-white underline hover:text-blue-700 ml-10">
              Don't Have Account ? Register Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
