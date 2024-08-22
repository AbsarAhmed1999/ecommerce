import React from "react";
import { useRouter } from "next/navigation"; // Assuming you are using Next.js
import "./backbutton.css"; // If you have additional custom styles

const BackButton = ({ className = "", children = "Back" }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center px-5 py-2.5 text-black rounded-lg shadow-md hover:opacity-90 transition-opacity duration-300 ${className}`}
      aria-label="Go back"
      style={{
        backgroundColor: "rgba(255, 221, 51, 1)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {children}
    </button>
  );
};

export default BackButton;
