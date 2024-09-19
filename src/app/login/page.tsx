"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JwtAuthService } from "../utils/jwt-service";
import CircularIndeterminate from "@/Components/Loading";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/User";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Swal from "sweetalert2";
import BackButton from "@/Components/BackButton/BackButton";
import { useAuthCheck } from "../Auth/useAuthCheck";
import "./login.css";

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
    <div className="backgroundContainer h-lvh ">
      <BackButton>Go Back</BackButton>
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="absolute inset-1 p-12 rounded-lg z-20 flex flex-col">
              <h2 className="text-white font-bold text-3xl text-center tracking-wide">
                Sign In
              </h2>
              <div className="form-group">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  className="form-input relative w-[300px] mt-10 p-1 bg-transparent outline-none shadow-none text-base text-white tracking-wide transition-all duration-500 "
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  className="form-input relative w-[300px] mt-5 p-1 bg-transparent outline-none text-white text-base  tracking-wide transition-all duration-500 "
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="flex space-x-20 mt-5">
                <button className="forgot-password-button text-white link">
                  <Link href="/forgot-password" legacyBehavior>
                    <a> Forgot password ?</a>
                  </Link>
                </button>
                <button className=" text-white link ">
                  <Link href="/register" legacyBehavior>
                    <a className="register-link">Sign up</a>
                  </Link>
                </button>
              </div>

              <button
                type="submit"
                className="submit-button mt-5  text-xl bg-white p-1"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
