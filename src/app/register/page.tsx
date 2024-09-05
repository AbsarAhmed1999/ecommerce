"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "@/app/globals.css";
import Navbar from "@/Components/Navbar/navbar";
import CircularIndeterminate from "@/Components/Loading";
import Link from "next/link";
import BackButton from "@/Components/BackButton/BackButton";
// import Navbar from "@/Components/Navbar/navbar";
// Define Yup schema for validation
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
    .matches(/[0-9]/, "Password must contain at least one number") // At least one number
    .required("Password is required"),
});

interface Values {
  fullName: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(false);
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
      console.log("RESULT HAI YEH", result);
      if (!result.ok) {
        const response = await result.json();
        console.log("Absar response", response);
        Swal.fire({
          title: response.title,
          text: response.text,
          icon: "error",
        });
      } else {
        const data = await result.json();
        localStorage.setItem("token", data.token);
        setInitialLoading(true);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered Successfully!",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          setTimeout(() => {
            router.push("/login");
            setInitialLoading(false);
          }, 3000);
        });

        // Adjust the path as needed
        console.log("User registered successfully");
      }
    } catch (error) {
      console.error("An error occurred during registration", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#262054" }}
    >
      <BackButton className="mb-4 absolute top-10 left-10">Go Back</BackButton>

      <div className="absolute right-54 w-96 h-auto p-4 rounded-lg ">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-1 ml-16 text-white">
            REGISTER NOW
          </h1>
          <img src="./login-logo.png" className="w-32 ml-28" />
          {/* Registration Form */}
          <Formik
            initialValues={intialValue} // Set initial values
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex flex-col gap-1 mb-4">
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Full Name"
                    className="p-2 border border-gray-300 rounded-full placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 font-bold text-base"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded-full placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 font-bold text-base"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="p-2 border border-gray-300 rounded-full placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 font-bold text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full  p-2 px-4 bg-pink-500 border border-gray-300 rounded-full text-white font-semibold text-lg hover:bg-pink-400 transition duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-1 text-center">
            <button
              // onClick={handleRegister}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Continue with Google
            </button>
          </div>

          <Link href="/login" legacyBehavior>
            <a className="text-white underline hover:text-blue-700 block text-center">
              Already have an account? Log in
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
