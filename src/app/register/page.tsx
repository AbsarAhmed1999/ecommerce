"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import "@/app/globals.css";
import Navbar from "@/Components/Navbar/navbar";
// import Navbar from "@/Components/Navbar/navbar";
// Define Yup schema for validation
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface Values {
  fullName: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const router = useRouter();
  const intialValue: Values = {
    fullName: "",
    email: "",
    password: "",
  };
  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      console.log("Form values:", values);
      const result = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!result.ok) {
        console.error("Registration failed");
      } else {
        const data = await result.json();
        localStorage.setItem("token", data.token);
        router.push("api/users/dashboard"); // Adjust the path as needed
        console.log("User registered successfully");
      }
    } catch (error) {
      console.error("An error occurred during registration", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleHomeClick = () => {
    router.push("/"); // Redirect to home page
  };
  const handleRegiser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-blue-100 ">
      <Navbar loggedIn={false} />
      <div className="mt-20 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold text-center">Register</h2>
            <div></div>
          </div>
          <Formik
            initialValues={intialValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

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

                <div className="mb-6">
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-6 text-center">
            <button
              onClick={handleRegiser}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
