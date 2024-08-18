"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@/app/globals.css";
import Navbar from "@/Components/Navbar/navbar";
import { useRouter } from "next/navigation";
import { JwtAuthService } from "../utils/jwt-service";
import CircularIndeterminate from "@/Components/Loading";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/User";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Swal from "sweetalert2";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}
interface LoginValues {
  email: string;
  password: string;
}

export default function Login() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/check-token", {
          credentials: "include",
        });
        console.log("RESPONSE", response.ok);
        if (response.ok) {
          router.push("/dashboard");
          setTimeout(() => {
            setInitialLoading(false);
          }, 2000);
        } else {
          router.push("/login");

          setInitialLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        router.push("/login");
      }
    })();
  }, []);

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularIndeterminate />
      </div>
    );
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
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
      console.log("YEH MERA RESULT0", result);
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          setInitialLoading(true);
          setTimeout(() => {
            router.push("/dashboard");
            setInitialLoading(false);
          }, 1000);
        });
        dispatch(setUser(result.user));
      } else {
        console.log("Login failed");
        Swal.fire({
          title: "Login Failed!",
          text: "Please try again.",
          icon: "error",
        });
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

  return (
    <div>
      {/* <Navbar loggedIn={false} /> */}
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Forgot Password Link */}
                <div className="mb-6 text-right">
                  <a
                    href="/forgot-password" // Adjust this path as needed
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
                <p className="text-center text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </Form>
            )}
          </Formik>{" "}
        </div>
      </div>
    </div>
  );
}
