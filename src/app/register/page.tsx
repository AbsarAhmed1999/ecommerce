"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import CircularIndeterminate from "@/Components/Loading";
import Link from "next/link";
import BackButton from "@/Components/BackButton/BackButton";
import { useGoogleLogin } from "@react-oauth/google";
import { setUser } from "../redux/slices/User";
import { useDispatch } from "react-redux";
import "./register.css";
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
  const dispatch = useDispatch();
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
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularIndeterminate />
      </div>
    );
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      // You can now use the access token or ID token for backend validation or user login
      console.log("Google token response", tokenResponse);
      // Fetch user info from Google
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
      );

      const userInfo = await userInfoResponse.json();
      console.log("THIS IS USER INFORMATION", userInfo);
      const response = await fetch("/api/protected", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userInfo }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setUser(data.user));
        // Save your own JWT or handle authentication state
        // localStorage.setItem("token", data.token);
        router.push("/dashboard");
      }
    },
    onError: (errorResponse) => {
      console.error("Google login error", errorResponse);
    },
  });

  // Event handler for the button click
  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior if needed
    handleGoogleLogin(); // Call the login function
  };
  return (
    <div className="backgroundContainer h-lvh ">
      <BackButton>Go Back</BackButton>

      <div className="form-container">
        <Formik
          initialValues={intialValue} // Set initial values
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-white font-bold text-3xl text-center tracking-wide mt-5">
                Sign Up
              </h2>
              <div className="ml-10">
                <div className="flex flex-col gap-1">
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Full Name"
                    className="form-input relative w-[300px] mt-10 p-1 bg-transparent outline-none shadow-none text-base text-white tracking-wide transition-all duration-500 "
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 font-bold text-base"
                  />
                </div>
                <div className="flex flex-col ">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="form-input relative w-[300px] mt-5 p-1 bg-transparent outline-none shadow-none text-base text-white tracking-wide transition-all duration-500 "
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
                    placeholder="Password"
                    className="form-input relative w-[300px] mt-5 p-1 bg-transparent outline-none shadow-none text-base text-white tracking-wide transition-all duration-500 "
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 font-bold text-base"
                  />
                </div>
              </div>
              <div className="mt-5">
                <Link href={"/login"} className="link ml-10">
                  Already have an Account ? Sign In
                </Link>
              </div>
              <button
                type="submit"
                className="w-52 ml-20 mt-10  bg-white border border-white rounded-full  font-semibold text-lg hover:bg-gray-400 transition duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
              <button
                onClick={handleClick}
                className="w-52 ml-20 bg-red-500 text-white py-2 px-2 rounded-lg hover:bg-red-700 transition duration-200 mt-5"
              >
                Continue with Google
              </button>
            </Form>
          )}
        </Formik>

        {/* <Link href="/login" legacyBehavior>
            <a className="text-white underline hover:text-blue-700 block text-center">
              Already have an account? Log in
            </a>
          </Link> */}
      </div>
    </div>
  );
};

export default RegistrationForm;
